/**
 * Integration Test Helpers
 * Phase 3.3 — Shared utilities for integration testing.
 *
 * Provides mock HTTP req/res objects, session cookie builders,
 * module stubs, and assertion helpers for end-to-end flow testing.
 *
 * @module tests/integration/helpers
 */

const creatAUTH = require('../../modules/utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../modules/utils/toolsFN/getDeviceInfo');
const { generateToken } = require('../../modules/setup/middelWare/csrfToken');
const routerUsers = require('../../modules/utils/router/routerUsers');

/**
 * Monotonic counter appended to session timestamps to guarantee
 * unique deviceIds even when multiple sessions are created in the
 * same millisecond. parseInt() in the middleware/isSession will
 * parse "1234567890-3" → 1234567890, so timeout checks are unaffected.
 */
let sessionCounter = 0;

// ============================================================
// Mock HTTP Request
// ============================================================

/**
 * Create a mock HTTP request object.
 *
 * @param {object} opts
 * @param {string} opts.method — 'GET' or 'POST'
 * @param {string} opts.url — Request URL path
 * @param {object} opts.headers — Additional headers
 * @param {string} opts.body — POST body string
 * @param {string} opts.remoteAddress — Client IP
 * @returns {object} Mock req compatible with i-app middleware
 */
const createMockReq = (opts = {}) => {
    const method = opts.method || 'GET';
    const url = opts.url || '/';
    const headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ...opts.headers
    };

    const req = {
        method,
        url,
        headers,
        connection: {
            remoteAddress: opts.remoteAddress || '127.0.0.1'
        },
        socket: {
            remoteAddress: opts.remoteAddress || '127.0.0.1'
        },
        user: opts.user || null,
        _body: opts.body || '',
        _dataCallbacks: [],
        _endCallbacks: [],
        on(event, cb) {
            if (event === 'data') {
                this._dataCallbacks.push(cb);
            } else if (event === 'end') {
                this._endCallbacks.push(cb);
            }
        },
        /** Trigger data/end events for POST body simulation */
        _emit() {
            for (const cb of this._dataCallbacks) {
                cb(Buffer.from(this._body));
            }
            for (const cb of this._endCallbacks) {
                cb();
            }
        }
    };

    return req;
};

// ============================================================
// Mock HTTP Response
// ============================================================

/**
 * Create a mock HTTP response object that captures output.
 *
 * @returns {object} Mock res with ._status, ._headers, ._body, ._cookies
 */
const createMockRes = () => {
    const res = {
        _status: 200,
        _headers: {},
        _body: null,
        _ended: false,
        _cookies: [],
        destroySession: false,

        writeHead(statusCode, headers) {
            res._status = statusCode;
            if (headers) {
                Object.assign(res._headers, headers);
            }
        },

        setHeader(name, value) {
            res._headers[name.toLowerCase()] = value;
        },

        getHeader(name) {
            return res._headers[name.toLowerCase()];
        },

        end(body) {
            res._body = body;
            res._ended = true;
            const setCookie = res._headers['set-cookie'];
            if (setCookie) {
                const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
                for (const c of cookies) {
                    if (c) res._cookies.push(c);
                }
            }
        },

        /** Parse the response body as JSON */
        json() {
            try {
                return JSON.parse(res._body);
            } catch {
                return null;
            }
        }
    };

    return res;
};

// ============================================================
// Session & Cookie Helpers
// ============================================================

/**
 * Generate a valid session cookie string for an authenticated user.
 * Replicates the actual login flow from logUser.js:
 *   fingerPrint = getDeviceInfo(req).fingerPrint
 *   timestamp = Date.now()
 *   deviceId = creatAUTH(`${fingerPrint}-${timestamp}`)
 *   scureToken = creatAUTH(`${fingerPrint}-${timestamp}-${storedHash}`)
 *
 * Appends a monotonic counter to timestamp (e.g., "1718000000000-1")
 * to ensure unique deviceIds across rapid calls. isSession and
 * middleware use parseInt(timestamp) which ignores the suffix.
 *
 * @param {object} opts
 * @param {string} opts.userAgent — User-Agent header
 * @param {string} opts.ip — Client IP
 * @param {number} opts.userId — User ID to cache
 * @param {string} [opts.username] — Username
 * @returns {{ cookieHeader: string, deviceId: string, userId: string, timestamp: string, userData: object, fingerPrint: string }}
 */
const createAuthenticatedSession = (opts = {}) => {
    const userAgent = opts.userAgent || 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const ip = opts.ip || '127.0.0.1';
    const userId = opts.userId || 1;
    const username = opts.username || 'testuser';

    // Replicate getDeviceInfo fingerprint: `${userAgent}-${os}-${browser}-${device}`
    const mockReq = {
        headers: { 'user-agent': userAgent },
        connection: { remoteAddress: ip },
        socket: { remoteAddress: ip }
    };
    const deviceInfo = getDeviceInfo(mockReq);
    const fingerPrint = deviceInfo.fingerPrint;

    // Counter suffix ensures unique deviceIds in the same millisecond
    sessionCounter++;
    const timestamp = `${Date.now()}-${sessionCounter}`;
    const authDeviceSt = `${fingerPrint}-${timestamp}`;
    const deviceId = creatAUTH(authDeviceSt);
    const authUserSt = `${fingerPrint}-${timestamp}-somehash`;
    const scureToken = creatAUTH(authUserSt);

    // Cache user in routerUsers (mimics what logUser does)
    const userData = {
        id: userId,
        username,
        scureToken,
        deviceToken: deviceId,
        email: `${username}@test.com`,
        userType: 1,
        permissions: []
    };
    routerUsers.set(userData);

    const cookieHeader = `deviceId=${deviceId}; userId=${scureToken}; timestamp=${timestamp}`;

    return {
        cookieHeader,
        deviceId,
        userId: scureToken,
        timestamp,
        userData,
        fingerPrint
    };
};

/**
 * Generate an expired session cookie string (>24h old).
 *
 * @returns {{ cookieHeader: string, deviceId: string, userId: string, timestamp: string, userData: object }}
 */
const createExpiredSession = () => {
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const ip = '127.0.0.1';

    const mockReq = {
        headers: { 'user-agent': userAgent },
        connection: { remoteAddress: ip },
        socket: { remoteAddress: ip }
    };
    const deviceInfo = getDeviceInfo(mockReq);
    const fingerPrint = deviceInfo.fingerPrint;

    // 25 hours ago — beyond 24h max age
    sessionCounter++;
    const timestamp = `${Date.now() - (25 * 60 * 60 * 1000)}-${sessionCounter}`;
    const authDeviceSt = `${fingerPrint}-${timestamp}`;
    const deviceId = creatAUTH(authDeviceSt);
    const scureToken = creatAUTH(`${fingerPrint}-${timestamp}-hash`);

    const userData = {
        id: 999,
        username: 'expired_user',
        scureToken,
        deviceToken: deviceId,
        email: 'expired@test.com',
        userType: 1,
        permissions: []
    };
    routerUsers.set(userData);

    const cookieHeader = `deviceId=${deviceId}; userId=${scureToken}; timestamp=${timestamp}`;
    return { cookieHeader, deviceId, userId: scureToken, timestamp, userData };
};

/**
 * Create a CSRF token for a session.
 *
 * @param {string} sessionId — The deviceId (session identifier)
 * @returns {string} CSRF token
 */
const createCsrfToken = (sessionId) => {
    return generateToken(sessionId);
};

// ============================================================
// App Configuration Helpers
// ============================================================

/**
 * Create a minimal i_app configuration object for testing.
 *
 * @param {object} overrides
 * @returns {object} i_app config
 */
const createAppConfig = (overrides = {}) => {
    return {
        appName: 'test-app',
        version: '1.0.0',
        port: 3000,
        users: true,
        auth: true,
        database: true,
        domain: 'localhost',
        mode: 'dev',
        ...overrides
    };
};

/**
 * Create the middleware data array [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path].
 *
 * @param {object} i_app — App config (defaults to createAppConfig())
 * @param {string} userDir — User project directory
 * @returns {Array}
 */
const createMiddlewareData = (i_app, userDir) => {
    const colorPR_D = '#333';
    const manifest = { name: 'test-app', short_name: 'test' };
    const tree = {};
    const swScript = '';
    const dir = userDir || '/tmp/test-app';
    const i_app_path = dir;

    return [i_app || createAppConfig(), colorPR_D, manifest, tree, dir, swScript, i_app_path];
};

/**
 * Clean up routerUsers cache after tests.
 */
const cleanupSessions = () => {
    routerUsers.usersData = [];
};

// ============================================================
// Assertion Helpers
// ============================================================

/**
 * Assert a JSON response with expected status and body fields.
 *
 * @param {object} res — Mock response
 * @param {number} status — Expected HTTP status
 * @param {object} [bodyFields] — Expected JSON fields
 * @returns {object} Parsed JSON body
 */
const expectJsonResponse = (res, status, bodyFields) => {
    expect(res._ended).toBe(true);
    expect(res._status).toBe(status);
    const json = res.json();
    expect(json).not.toBeNull();
    if (bodyFields) {
        for (const [key, value] of Object.entries(bodyFields)) {
            expect(json[key]).toEqual(value);
        }
    }
    return json;
};

/**
 * Assert an HTML error response.
 *
 * @param {object} res — Mock response
 * @param {number} status — Expected HTTP status
 */
const expectHtmlError = (res, status) => {
    expect(res._ended).toBe(true);
    expect(res._status).toBe(status);
    expect(res._body).toContain(`${status}`);
};

module.exports = {
    createMockReq,
    createMockRes,
    createAuthenticatedSession,
    createExpiredSession,
    createCsrfToken,
    createAppConfig,
    createMiddlewareData,
    cleanupSessions,
    expectJsonResponse,
    expectHtmlError
};
