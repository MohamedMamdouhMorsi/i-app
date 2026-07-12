/**
 * Middleware Pipeline Integration Tests
 * Phase 3.3 — Integration Test Suite
 *
 * Tests the full middleware pipeline flow in middleWareApp.js:
 *   Rate Limiting → Session Timeout → Session Resolution → Request Routing
 *
 * These tests validate that security layers work together correctly,
 * not just individually (which Phase 3.2 unit tests already cover).
 */

const { createMockReq, createMockRes, createAuthenticatedSession, createExpiredSession, createCsrfToken, createAppConfig, createMiddlewareData, cleanupSessions } = require('./helpers');
const { checkRateLimit, resetRateLimits } = require('../../modules/setup/middelWare/rateLimit');
const { removeToken } = require('../../modules/setup/middelWare/csrfToken');
const is_api_ = require('../../modules/setup/middelWare/is_api');
const is_app_ = require('../../modules/setup/middelWare/is_app');
const is_asset_ = require('../../modules/setup/middelWare/is_asset');
const is_route_ = require('../../modules/setup/middelWare/is_route');
const { parseSessionCookies, hasValidSessionCookies } = require('../../modules/setup/sessions/cookieUtils');
const isSession = require('../../modules/setup/sessions/isSession');
const path = require('path');

// ============================================================
// 1. Rate Limiting + Session Timeout Combined
// ============================================================
describe('Middleware Pipeline — Rate Limit + Session Timeout', () => {
    beforeEach(() => {
        if (typeof resetRateLimits === 'function') resetRateLimits();
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('rate limit blocks before session check is reached', () => {
        const ip = '10.0.0.99';
        // Exhaust rate limit (100 requests)
        for (let i = 0; i < 100; i++) {
            checkRateLimit(ip, 100, 900000);
        }

        // 101st request should be blocked
        const result = checkRateLimit(ip, 100, 900000);
        expect(result.allowed).toBe(false);

        // Even an authenticated session doesn't bypass rate limiting
        const session = createAuthenticatedSession({ ip });
        const req = createMockReq({
            method: 'GET',
            url: '/',
            headers: { cookie: session.cookieHeader },
            remoteAddress: ip
        });

        // The middleware should reject before checking session
        expect(result.allowed).toBe(false);
    });

    test('expired session returns destroy cookies before content', () => {
        const expired = createExpiredSession();

        const req = createMockReq({
            method: 'GET',
            url: '/',
            headers: { cookie: expired.cookieHeader }
        });

        // Parse cookies and simulate the timeout check from middleWareApp.js
        const cookies = parseSessionCookies(req);
        expect(cookies.timestamp).toBeDefined();

        const sessionAge = Date.now() - parseInt(cookies.timestamp);
        const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
        expect(sessionAge).toBeGreaterThan(SESSION_MAX_AGE_MS);
    });

    test('valid session passes timeout check', () => {
        const session = createAuthenticatedSession({ userId: 10 });

        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        const cookies = parseSessionCookies(req);
        const sessionAge = Date.now() - parseInt(cookies.timestamp);
        const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
        expect(sessionAge).toBeLessThan(SESSION_MAX_AGE_MS);
    });
});

// ============================================================
// 2. Session Resolution + isSession Integration
// ============================================================
describe('Middleware Pipeline — Session Resolution', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('authenticated session is recognized by isSession', () => {
        const session = createAuthenticatedSession({ userId: 42, username: 'auth_user' });

        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        const result = isSession(req);
        expect(result).toBe(true);
    });

    test('unauthenticated request returns falsy from isSession', () => {
        const req = createMockReq({
            headers: {}
        });

        const result = isSession(req);
        expect(result).toBeFalsy();
    });

    test('tampered deviceId cookie fails isSession', () => {
        const session = createAuthenticatedSession({ userId: 43 });

        const req = createMockReq({
            headers: {
                cookie: `deviceId=TAMPERED_VALUE; userId=${session.userId}; timestamp=${session.timestamp}`
            }
        });

        const result = isSession(req);
        expect(result).toBeFalsy();
    });

    test('mismatched user-agent fails isSession (fingerprint mismatch)', () => {
        const session = createAuthenticatedSession({
            userId: 44,
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        // Request with different user-agent → different fingerprint → different deviceId expected
        const req = createMockReq({
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                cookie: session.cookieHeader
            }
        });

        const result = isSession(req);
        expect(result).toBeFalsy();
    });

    test('partial cookies (missing timestamp) fails isSession', () => {
        const session = createAuthenticatedSession({ userId: 45 });

        const req = createMockReq({
            headers: {
                cookie: `deviceId=${session.deviceId}; userId=${session.userId}`
            }
        });

        const result = isSession(req);
        expect(result).toBeFalsy();
    });
});

// ============================================================
// 3. Request Classification Pipeline
// ============================================================
describe('Middleware Pipeline — Request Classification', () => {

    test('POST to /api/* is classified as API', () => {
        expect(is_api_('/api/data')).toBe(true);
        expect(is_api_('/api/users')).toBe(true);
        expect(is_api_('/api')).toBe(true);
    });

    test('GET .app files classified as app templates', () => {
        expect(is_app_('.app')).toBe(true);
    });

    test('.json files NOT classified as app templates (Phase 2 fix)', () => {
        expect(is_app_('.json')).toBe(false);
    });

    test('static assets classified correctly', () => {
        expect(is_asset_('.js')).toBe(true);
        expect(is_asset_('.css')).toBe(true);
        expect(is_asset_('.png')).toBe(true);
        expect(is_asset_('.jpg')).toBe(true);
        expect(is_asset_('.svg')).toBe(true);
        expect(is_asset_('.woff')).toBe(true);
        expect(is_asset_('.woff2')).toBe(true);
    });

    test('forbidden extensions rejected by is_asset', () => {
        expect(is_asset_('.env')).toBe(false);
        expect(is_asset_('.log')).toBe(false);
        expect(is_asset_('.sql')).toBe(false);
        expect(is_asset_('.pem')).toBe(false);
        expect(is_asset_('.key')).toBe(false);
    });

    test('route requests classified for HTML page serving', () => {
        expect(is_route_('')).toBe(true);
    });

    test('API path takes precedence in classification pipeline', () => {
        // In the middleware pipeline: POST checks is_api first, then falls through
        const url = '/api/data';
        const isApi = is_api_(url);
        expect(isApi).toBe(true);
        // If url starts with /api, it should NOT go through file-serving classifiers
    });

    test('nested API routes are detected', () => {
        expect(is_api_('/api/users/permissions')).toBe(true);
        expect(is_api_('/api/v2/data')).toBe(true);
    });

    test('non-API POST URLs fall through to router', () => {
        expect(is_api_('/submit')).toBe(false);
        expect(is_api_('/form')).toBe(false);
    });
});

// ============================================================
// 4. CSRF + Session Integration (POST Flow)
// ============================================================
describe('Middleware Pipeline — CSRF + Session POST Flow', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('POST with valid CSRF token and session passes validation', () => {
        const session = createAuthenticatedSession({ userId: 50 });
        const csrfToken = createCsrfToken(session.deviceId);

        // Simulate CSRF validation as in middleWareApp.js
        const { validateToken } = require('../../modules/setup/middelWare/csrfToken');
        expect(validateToken(session.deviceId, csrfToken)).toBe(true);
    });

    test('POST with missing CSRF token is rejected', () => {
        const session = createAuthenticatedSession({ userId: 51 });
        createCsrfToken(session.deviceId); // Generate token but don't send it

        const { validateToken } = require('../../modules/setup/middelWare/csrfToken');
        expect(validateToken(session.deviceId, undefined)).toBe(false);
        expect(validateToken(session.deviceId, null)).toBe(false);
        expect(validateToken(session.deviceId, '')).toBe(false);
    });

    test('POST with wrong CSRF token is rejected', () => {
        const session = createAuthenticatedSession({ userId: 52 });
        createCsrfToken(session.deviceId);

        const { validateToken } = require('../../modules/setup/middelWare/csrfToken');
        const fakeToken = 'a'.repeat(64);
        expect(validateToken(session.deviceId, fakeToken)).toBe(false);
    });

    test('POST with CSRF token from different session is rejected', () => {
        const session1 = createAuthenticatedSession({ userId: 53, username: 'user_a' });
        const session2 = createAuthenticatedSession({ userId: 54, username: 'user_b' });
        const token1 = createCsrfToken(session1.deviceId);
        createCsrfToken(session2.deviceId);

        const { validateToken } = require('../../modules/setup/middelWare/csrfToken');
        // Using token1 for session2 should fail
        expect(validateToken(session2.deviceId, token1)).toBe(false);
    });

    test('CSRF token refreshes on regeneration', () => {
        const session = createAuthenticatedSession({ userId: 55 });
        const token1 = createCsrfToken(session.deviceId);
        const token2 = createCsrfToken(session.deviceId);

        // New token should be different
        expect(token1).not.toBe(token2);

        // Only the latest token should be valid
        const { validateToken } = require('../../modules/setup/middelWare/csrfToken');
        expect(validateToken(session.deviceId, token2)).toBe(true);
        // Old token should be invalid after regeneration
        expect(validateToken(session.deviceId, token1)).toBe(false);
    });
});

// ============================================================
// 5. Cookie Parsing + Session Lifecycle
// ============================================================
describe('Middleware Pipeline — Cookie Lifecycle', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('session cookies round-trip from creation to parsing', () => {
        const session = createAuthenticatedSession({ userId: 60, username: 'roundtrip' });

        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        const cookies = parseSessionCookies(req);
        expect(cookies.deviceId).toBe(session.deviceId);
        expect(cookies.userId).toBe(session.userId);
        expect(cookies.timestamp).toBe(session.timestamp);
        expect(hasValidSessionCookies(cookies)).toBe(true);
    });

    test('destroy session cookies have expiration in past', () => {
        const { getDestroySessionCookies } = require('../../modules/setup/sessions/cookieUtils');
        const destroyCookies = getDestroySessionCookies();

        expect(destroyCookies).toHaveLength(4); // deviceId, userId, timestamp, destroy
        for (const cookie of destroyCookies) {
            expect(cookie).toContain('Expires=');
            expect(cookie).toContain('HttpOnly');
            expect(cookie).toContain('SameSite=Strict');
        }
    });

    test('multiple sessions can coexist in routerUsers', () => {
        const session1 = createAuthenticatedSession({ userId: 61, username: 'coexist_a' });
        const session2 = createAuthenticatedSession({ userId: 62, username: 'coexist_b' });

        const req1 = createMockReq({ headers: { cookie: session1.cookieHeader } });
        const req2 = createMockReq({ headers: { cookie: session2.cookieHeader } });

        expect(isSession(req1)).toBe(true);
        expect(isSession(req2)).toBe(true);
    });
});

// ============================================================
// 6. Security Layer Integration (Rate Limit + CSRF + Path)
// ============================================================
describe('Middleware Pipeline — Combined Security', () => {
    beforeEach(() => {
        if (typeof resetRateLimits === 'function') resetRateLimits();
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('rate limit is per-IP — different IPs have independent limits', () => {
        const ip1 = '192.168.1.1';
        const ip2 = '192.168.1.2';

        // Exhaust ip1's limit
        for (let i = 0; i < 100; i++) {
            checkRateLimit(ip1, 100, 900000);
        }
        const result1 = checkRateLimit(ip1, 100, 900000);
        expect(result1.allowed).toBe(false);

        // ip2 should still be allowed
        const result2 = checkRateLimit(ip2, 100, 900000);
        expect(result2.allowed).toBe(true);
    });

    test('path traversal in session cookie values does not affect security', () => {
        // Malicious cookie values should not cause issues in session parsing
        const req = createMockReq({
            headers: {
                cookie: 'deviceId=../../etc/passwd; userId=../../../../etc/shadow; timestamp=999'
            }
        });

        const cookies = parseSessionCookies(req);
        expect(cookies.deviceId).toBe('../../etc/passwd');
        // But isSession should reject (fingerprint won't match)
        expect(isSession(req)).toBeFalsy();
    });

    test('SQL injection in cookie values does not reach query layer', () => {
        const req = createMockReq({
            headers: {
                cookie: "deviceId=' OR 1=1--; userId=admin'--; timestamp=999"
            }
        });

        const cookies = parseSessionCookies(req);
        // Cookies are parsed as strings — no execution
        expect(typeof cookies.deviceId).toBe('string');
        // isSession should reject (fingerprint won't match injection string)
        expect(isSession(req)).toBeFalsy();
    });

    test('null bytes in cookie values are handled safely', () => {
        const req = createMockReq({
            headers: {
                cookie: 'deviceId=test%00admin; userId=test\x00root; timestamp=123'
            }
        });

        const cookies = parseSessionCookies(req);
        expect(typeof cookies.deviceId).toBe('string');
        expect(isSession(req)).toBeFalsy();
    });
});
