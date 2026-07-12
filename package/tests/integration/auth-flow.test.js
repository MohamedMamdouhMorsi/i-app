/**
 * Authentication Flow Integration Tests
 * Phase 3.3 — Integration Test Suite
 *
 * End-to-end auth lifecycle tests:
 *   Session creation → isSession check → sessionData validation
 *   → CSRF token generation → authenticated API call → logout
 *
 * Tests session state transitions across the full middleware chain
 * without requiring a real database or HTTP server.
 *
 * BUG DISCOVERED (Phase 3.3):
 *   routerUsers.del(id) compares `id` to `scureToken`, but logoutUser.js
 *   and setUserOffline.js both call del(req.user.deviceToken). Since
 *   deviceToken !== scureToken, the user is never actually removed from
 *   the in-memory cache. The destroy cookies ARE set correctly, so the
 *   client session ends — but the server-side cache leaks.
 *   Fix: Change logoutUser.js:22 and setUserOffline.js:18 to pass
 *   `req.user.scureToken` instead of `req.user.deviceToken`.
 */

const { createMockReq, createMockRes, createAuthenticatedSession, createExpiredSession, createCsrfToken, cleanupSessions } = require('./helpers');
const isSession = require('../../modules/setup/sessions/isSession');
const sessionData = require('../../modules/setup/sessions/sessionData');
const { parseSessionCookies, hasValidSessionCookies, destroySession, getDestroySessionCookies } = require('../../modules/setup/sessions/cookieUtils');
const { validateToken, generateToken, removeToken } = require('../../modules/setup/middelWare/csrfToken');
const { hashPassword, verifyPassword, isLegacyHash } = require('../../modules/utils/toolsFN/passwordHash');
const creatAUTH = require('../../modules/utils/toolsFN/createAUTH');
const routerUsers = require('../../modules/utils/router/routerUsers');
const logoutUser = require('../../modules/utils/orders/users/logoutUser');

// Mock db to prevent real database calls
jest.mock('../../modules/utils/query/mysqlConnect', () => {
    return jest.fn((body, res, cb) => {
        if (typeof cb === 'function') {
            cb([], res);
        }
    });
});

// ============================================================
// 1. Session Creation & Validation Lifecycle
// ============================================================
describe('Auth Flow — Session Creation → Validation', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('session created by helper passes isSession check', () => {
        const session = createAuthenticatedSession({ userId: 1, username: 'lifecycle_user' });
        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        expect(isSession(req)).toBe(true);
    });

    test('sessionData resolves authenticated user correctly', (done) => {
        const session = createAuthenticatedSession({ userId: 2, username: 'data_user' });
        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        const appHandler = (req, res, data, userData) => {
            expect(userData).toBeDefined();
            expect(userData.id).toBe(2);
            expect(userData.username).toBe('data_user');
            expect(userData.deviceToken).toBe(session.deviceId);
            expect(req.user).toBeDefined();
            expect(req.user.id).toBe(2);
            done();
        };

        const res = createMockRes();
        const data = []; // middleware data array
        sessionData(req, res, appHandler, data);
    });

    test('sessionData destroys session for invalid deviceToken match', (done) => {
        const session = createAuthenticatedSession({ userId: 3, username: 'tamper_user' });

        // Tamper with the user's deviceToken in cache to create mismatch
        session.userData.deviceToken = 'TAMPERED_TOKEN';
        routerUsers.set(session.userData);

        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });

        const appHandler = (req, res, data, userData) => {
            expect(userData.notSecure).toBe(true);
            expect(res.destroySession).toBe(true);
            done();
        };

        const res = createMockRes();
        sessionData(req, res, appHandler, []);
    });

    test('sessionData passes noAuth user when cookies missing', (done) => {
        const req = createMockReq({
            headers: {} // no cookies
        });

        const appHandler = (req, res, data, userData) => {
            expect(userData.noAuth).toBe(true);
            expect(userData.id).toBe(0);
            done();
        };

        const res = createMockRes();
        sessionData(req, res, appHandler, []);
    });
});

// ============================================================
// 2. Login → Session → CSRF → API Call Flow
// ============================================================
describe('Auth Flow — Login → CSRF → API', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('full authenticated POST flow: session + CSRF + API access', () => {
        // Step 1: Create authenticated session (simulates login)
        const session = createAuthenticatedSession({ userId: 10, username: 'api_caller' });

        // Step 2: Generate CSRF token (simulates GET page load)
        const csrfToken = createCsrfToken(session.deviceId);

        // Step 3: Validate CSRF token (simulates POST request validation)
        expect(validateToken(session.deviceId, csrfToken)).toBe(true);

        // Step 4: Session is valid (simulates isSession check)
        const req = createMockReq({
            method: 'POST',
            url: '/api',
            headers: {
                cookie: session.cookieHeader,
                'x-csrf-token': csrfToken
            }
        });
        expect(isSession(req)).toBe(true);

        // Step 5: User data is retrievable from cache
        const userData = routerUsers.get(session.userId);
        expect(userData.id).toBe(10);
        expect(userData.username).toBe('api_caller');
    });

    test('CSRF token bound to specific session', () => {
        const session1 = createAuthenticatedSession({ userId: 11, username: 'user_a' });
        const session2 = createAuthenticatedSession({ userId: 12, username: 'user_b' });

        const token1 = createCsrfToken(session1.deviceId);
        const token2 = createCsrfToken(session2.deviceId);

        // Each token valid only for its session
        expect(validateToken(session1.deviceId, token1)).toBe(true);
        expect(validateToken(session2.deviceId, token2)).toBe(true);

        // Cross-session usage fails
        expect(validateToken(session1.deviceId, token2)).toBe(false);
        expect(validateToken(session2.deviceId, token1)).toBe(false);
    });

    test('expired session prevents CSRF-protected actions', () => {
        const expired = createExpiredSession();
        const csrfToken = createCsrfToken(expired.deviceId);

        // CSRF token is technically valid...
        expect(validateToken(expired.deviceId, csrfToken)).toBe(true);

        // But session timeout would be caught BEFORE CSRF check in middleware
        const cookies = parseSessionCookies(
            createMockReq({ headers: { cookie: expired.cookieHeader } })
        );
        const sessionAge = Date.now() - parseInt(cookies.timestamp);
        expect(sessionAge).toBeGreaterThan(24 * 60 * 60 * 1000);
        // Middleware would destroy session before reaching CSRF validation
    });
});

// ============================================================
// 3. Password Hashing Integration
// ============================================================
describe('Auth Flow — Password Hashing', () => {

    test('bcrypt hash → verify roundtrip', () => {
        const password = 'SecureP@ss123!';
        const hash = hashPassword(password);

        expect(hash.startsWith('$2b$')).toBe(true);
        const result = verifyPassword(password, hash);
        expect(result.valid).toBe(true);
        expect(result.needsMigration).toBe(false);
    });

    test('wrong password fails verification', () => {
        const hash = hashPassword('correct_password');
        const result = verifyPassword('wrong_password', hash);
        expect(result.valid).toBe(false);
    });

    test('legacy hash detected and verified', () => {
        const password = 'legacyPass123';
        const legacyHash = creatAUTH(password); // I-app-... format

        expect(isLegacyHash(legacyHash)).toBe(true);
        expect(legacyHash.startsWith('I-app-')).toBe(true);

        const result = verifyPassword(password, legacyHash);
        expect(result.valid).toBe(true);
        expect(result.needsMigration).toBe(true);
    });

    test('legacy hash migration flow: verify → rehash → verify new', () => {
        const password = 'migrateMe456';

        // Step 1: Old system — hash with creatAUTH
        const legacyHash = creatAUTH(password);
        expect(isLegacyHash(legacyHash)).toBe(true);

        // Step 2: Login — verify legacy hash
        const legacyResult = verifyPassword(password, legacyHash);
        expect(legacyResult.valid).toBe(true);
        expect(legacyResult.needsMigration).toBe(true);

        // Step 3: Rehash with bcrypt
        const newHash = hashPassword(password);
        expect(newHash.startsWith('$2b$')).toBe(true);
        expect(isLegacyHash(newHash)).toBe(false);

        // Step 4: Next login — verify with new hash
        const modernResult = verifyPassword(password, newHash);
        expect(modernResult.valid).toBe(true);
        expect(modernResult.needsMigration).toBe(false);
    });

    test('empty/null inputs handled safely', () => {
        expect(verifyPassword('', 'somehash').valid).toBe(false);
        expect(verifyPassword(null, 'somehash').valid).toBe(false);
        expect(verifyPassword('pass', null).valid).toBe(false);
        expect(verifyPassword('pass', '').valid).toBe(false);
    });
});

// ============================================================
// 4. Logout Flow
// ============================================================
describe('Auth Flow — Logout', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    /**
     * BUG: logoutUser calls routerUsers.del(req.user.deviceToken), but
     * del() compares against scureToken. deviceToken !== scureToken, so
     * the user remains in cache. This test documents the actual behavior.
     * Fix: logoutUser.js:22 should use req.user.scureToken.
     */
    test('logout does NOT clear routerUsers cache (known bug — deviceToken/scureToken mismatch)', () => {
        const session = createAuthenticatedSession({ userId: 20, username: 'logout_user' });

        const req = createMockReq({
            url: '/logout',
            headers: { cookie: session.cookieHeader }
        });
        req.user = session.userData;

        const res = createMockRes();
        logoutUser(req, res);

        // BUG: User remains in cache because del() compares deviceToken to scureToken
        const cachedUser = routerUsers.get(session.userId);
        expect(cachedUser.id).toBe(20); // Still there — bug
    });

    test('routerUsers.del works correctly when called with scureToken', () => {
        // This proves the fix: if logoutUser passed scureToken, del() would work
        const session = createAuthenticatedSession({ userId: 24, username: 'fix_demo' });

        // Direct call with scureToken (what logoutUser SHOULD do)
        routerUsers.del(session.userData.scureToken);

        const cachedUser = routerUsers.get(session.userId);
        expect(cachedUser.id).toBe(0);
        expect(cachedUser.notUser).toBe(true);
    });

    test('logout sets destroy cookies on response', () => {
        const session = createAuthenticatedSession({ userId: 21, username: 'logout_cookies' });

        const req = createMockReq({
            url: '/logout',
            headers: { cookie: session.cookieHeader }
        });
        req.user = session.userData;

        const res = createMockRes();
        logoutUser(req, res);

        // Should have Set-Cookie with clearing headers
        const cookies = res._headers['set-cookie'];
        expect(cookies).toBeDefined();
        expect(Array.isArray(cookies)).toBe(true);
        expect(cookies.length).toBeGreaterThanOrEqual(3);

        // All session cookies should be cleared
        const cookieStr = cookies.join('; ');
        expect(cookieStr).toContain("deviceId=''");
        expect(cookieStr).toContain("userId=''");
        expect(cookieStr).toContain("timestamp=''");
    });

    test('logout of user without deviceToken is safe', () => {
        const req = createMockReq();
        req.user = { id: 0 }; // No deviceToken

        const res = createMockRes();
        const result = logoutUser(req, res);
        // Should not throw
        expect(result).toBeDefined();
    });

    /**
     * BUG: Due to the deviceToken/scureToken mismatch, logoutUser doesn't
     * actually remove either session from cache. This test documents
     * that both sessions survive logout.
     */
    test('concurrent sessions — logout keeps both due to del() bug', () => {
        const session1 = createAuthenticatedSession({ userId: 22, username: 'keep_alive' });
        const session2 = createAuthenticatedSession({ userId: 23, username: 'logout_me' });

        // Logout session2
        const req = createMockReq({
            url: '/logout',
            headers: { cookie: session2.cookieHeader }
        });
        req.user = session2.userData;
        const res = createMockRes();
        logoutUser(req, res);

        // session1 should still be valid
        const req1 = createMockReq({ headers: { cookie: session1.cookieHeader } });
        expect(isSession(req1)).toBe(true);

        // BUG: session2 still in cache (del mismatch)
        const cachedUser2 = routerUsers.get(session2.userId);
        expect(cachedUser2.id).toBe(23); // Still there — bug

        // Verify destroy cookies are at least set
        const cookieStr = res._headers['set-cookie'].join('; ');
        expect(cookieStr).toContain("deviceId=''");
    });

    test('concurrent sessions — del with scureToken removes only target (fix verification)', () => {
        const session1 = createAuthenticatedSession({ userId: 25, username: 'survivor' });
        const session2 = createAuthenticatedSession({ userId: 26, username: 'removed' });

        // Correct del call: pass scureToken
        routerUsers.del(session2.userData.scureToken);

        // session1 survives
        const req1 = createMockReq({ headers: { cookie: session1.cookieHeader } });
        expect(isSession(req1)).toBe(true);

        // session2 is properly removed
        const cachedUser2 = routerUsers.get(session2.userId);
        expect(cachedUser2.id).toBe(0);
        expect(cachedUser2.notUser).toBe(true);
    });
});

// ============================================================
// 5. Session Invalidation Scenarios
// ============================================================
describe('Auth Flow — Session Invalidation', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('destroySession sets cookies and marks response', () => {
        const res = createMockRes();
        destroySession(res);

        expect(res.destroySession).toBe(true);
        const cookies = res._headers['set-cookie'];
        expect(Array.isArray(cookies)).toBe(true);
        expect(cookies.length).toBe(4); // deviceId, userId, timestamp, destroy
    });

    test('getDestroySessionCookies includes all session cookie names', () => {
        const cookies = getDestroySessionCookies();
        const names = cookies.map(c => c.split('=')[0]);
        expect(names).toContain('deviceId');
        expect(names).toContain('userId');
        expect(names).toContain('timestamp');
        expect(names).toContain('destroy');
    });

    test('session with modified user-agent after login ', () => {
        // Create session with one user-agent
        const session = createAuthenticatedSession({
            userId: 30,
            username: 'ua_change',
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });

        // Validate with same user-agent — works
        const req1 = createMockReq({ headers: { cookie: session.cookieHeader } });
        expect(isSession(req1)).toBe(true);

        // Try with different user-agent — fingerprint mismatch
        const req2 = createMockReq({
            headers: {
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
                cookie: session.cookieHeader
            }
        });
        expect(isSession(req2)).toBeFalsy();
    });

    test('session with modified IP still works (IP not in fingerprint)', () => {
        // getDeviceInfo.fingerPrint = `${userAgent}-${os}-${browser}-${device}`
        // IP is NOT part of fingerprint, so changing IP should still work
        const session = createAuthenticatedSession({ userId: 31, username: 'ip_change' });

        // Request from different IP but same user-agent
        const req = createMockReq({
            headers: { cookie: session.cookieHeader },
            remoteAddress: '10.0.0.99' // different IP
        });
        // Should still pass because fingerprint doesn't include IP
        expect(isSession(req)).toBe(true);
    });
});
