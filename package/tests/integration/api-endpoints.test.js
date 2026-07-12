/**
 * API Endpoint Integration Tests
 * Phase 3.3 — Integration Test Suite
 *
 * Tests the orders.js API dispatcher with authentication tiers:
 *   PUBLIC (no auth): countries, languages, icons
 *   PRE-LOGIN (CSRF only): addUser, checkUser, logUser, requestPasswordReset
 *   AUTHENTICATED (full session): all other endpoints
 *
 * These tests verify that the 3-tier auth system works correctly
 * when integrated with the orders dispatcher and session system.
 */

const orders = require('../../modules/utils/orders/orders');
const { createMockReq, createMockRes, createAuthenticatedSession, cleanupSessions, expectJsonResponse } = require('./helpers');
const path = require('path');
const fs = require('fs');

// Resolve the package root (for order handlers that read from /db/)
const PACKAGE_ROOT = path.resolve(__dirname, '..', '..');

// ============================================================
// 1. PUBLIC Endpoints (no auth required)
// ============================================================
describe('API Endpoints — PUBLIC (no auth)', () => {

    test('countries endpoint returns JSON data', (done) => {
        const res = createMockRes();
        // Override res.end to check async response
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            const json = res.json();
            expect(res._status).toBe(200);
            expect(json).toBeDefined();
            expect(json.res).toBeDefined();
            expect(Array.isArray(json.res)).toBe(true);
            expect(json.res.length).toBeGreaterThan(0);
            // Verify country structure
            const country = json.res[0];
            expect(country).toHaveProperty('code');
            expect(country).toHaveProperty('name');
            done();
        };

        const body = { order: 'countries' };
        const req = createMockReq();
        req.user = { id: 0 }; // No auth
        orders(body, req, res, PACKAGE_ROOT, {});
    });

    test('languages endpoint returns JSON data', (done) => {
        const res = createMockRes();
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            const json = res.json();
            expect(res._status).toBe(200);
            expect(json).toBeDefined();
            expect(json.res).toBeDefined();
            expect(Array.isArray(json.res)).toBe(true);
            expect(json.res.length).toBeGreaterThan(0);
            done();
        };

        const body = { order: 'languages' };
        const req = createMockReq();
        req.user = { id: 0 };
        orders(body, req, res, PACKAGE_ROOT, {});
    });

    test('icons endpoint returns JSON data', (done) => {
        const res = createMockRes();
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            const json = res.json();
            expect(res._status).toBe(200);
            expect(json).toBeDefined();
            expect(json.res).toBeDefined();
            expect(Array.isArray(json.res)).toBe(true);
            done();
        };

        const body = { order: 'icons' };
        const req = createMockReq();
        req.user = { id: 0 };
        orders(body, req, res, PACKAGE_ROOT, {});
    });

    test('public endpoints work without authenticated session', (done) => {
        const res = createMockRes();
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            expect(res._status).toBe(200);
            done();
        };

        const req = createMockReq();
        req.user = { id: 0, noAuth: true };
        orders({ order: 'countries' }, req, res, PACKAGE_ROOT, {});
    });

    test('public endpoints work with authenticated session', (done) => {
        const session = createAuthenticatedSession({ userId: 100 });
        const res = createMockRes();
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            expect(res._status).toBe(200);
            done();
        };

        const req = createMockReq({
            headers: { cookie: session.cookieHeader }
        });
        req.user = session.userData;
        orders({ order: 'countries' }, req, res, PACKAGE_ROOT, {});
    });
});

// ============================================================
// 2. AUTHENTICATED Endpoints — Auth Enforcement
// ============================================================
describe('API Endpoints — AUTHENTICATED (require session)', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('authenticated endpoint rejects unauthenticated request with 401', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 }; // No auth

        orders({ order: 'setUserOffline' }, req, res, PACKAGE_ROOT, {});

        expect(res._status).toBe(401);
        const json = res.json();
        expect(json.res).toBe(false);
        expect(json.error).toBe('Authentication required');
    });

    test('authenticated endpoint rejects noAuth user', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 5, noAuth: true };

        orders({ order: 'dataBaseReport' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(401);
    });

    test('authenticated endpoint rejects notSecure user', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 5, notSecure: true };

        orders({ order: 'updateApp' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(401);
    });

    test('authenticated endpoint rejects user with id=0', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        orders({ order: 'speechSynthesisData' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(401);
    });

    test('authenticated endpoint rejects null user', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = null;

        orders({ order: 'serverOffer' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(401);
    });

    test('authenticated endpoint rejects undefined user', () => {
        const res = createMockRes();
        const req = createMockReq();
        // req.user not set

        orders({ order: 'serverAnswer' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(401);
    });

    test('all AUTHENTICATED endpoints reject unauthenticated requests', () => {
        const authenticatedOrders = [
            'setUserOffline', 'serverOffer', 'serverAnswer', 'getAnswer',
            'speechSynthesisData', 'dataBaseReport', 'updateApp',
            'updateTranslate', 'updateTxt', 'uploadIcons', 'saveImage'
        ];

        for (const orderName of authenticatedOrders) {
            const res = createMockRes();
            const req = createMockReq();
            req.user = { id: 0 };

            orders({ order: orderName }, req, res, PACKAGE_ROOT, {});
            expect(res._status).toBe(401);
        }
    });

    test('unknown order returns false (no endpoint matched)', () => {
        const session = createAuthenticatedSession({ userId: 101 });
        const res = createMockRes();
        const req = createMockReq();
        req.user = session.userData;

        orders({ order: 'nonExistentOrder' }, req, res, PACKAGE_ROOT, {});
        expect(res._status).toBe(200);
        const json = res.json();
        expect(json.res).toBe(false);
    });
});

// ============================================================
// 3. PRE-LOGIN Endpoints (no session, some validation needed)
// ============================================================
describe('API Endpoints — PRE-LOGIN', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('addUser endpoint is accessible without session', () => {
        // addUser flows through to the addUser handler which requires DB
        // We just verify it doesn't return 401 (auth gatekeeping check)
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        // Note: This will attempt DB operations which won't work in test,
        // but it should NOT return 401 — that's the integration check
        try {
            orders({ order: 'addUser', data: { username: 'test', password: 'test123' } }, req, res, PACKAGE_ROOT, {});
        } catch (e) {
            // Expected — no DB connection in test
        }
        // Key assertion: NOT 401 (auth passed, handler was reached)
        expect(res._status).not.toBe(401);
    });

    test('checkUser endpoint is accessible without session', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        try {
            orders({ order: 'checkUser', data: { username: 'test' } }, req, res, PACKAGE_ROOT, {});
        } catch (e) {
            // Expected — no DB
        }
        expect(res._status).not.toBe(401);
    });

    test('logUser endpoint is accessible without session', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        try {
            orders({ order: 'logUser', data: { username: 'test', password: 'test123' } }, req, res, PACKAGE_ROOT, {});
        } catch (e) {
            // Expected — no DB
        }
        expect(res._status).not.toBe(401);
    });

    test('requestPasswordReset is accessible without session', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        try {
            orders({ order: 'requestPasswordReset', data: { email: 'test@test.com' } }, req, res, PACKAGE_ROOT, {});
        } catch (e) {
            // Expected — no DB/mail
        }
        expect(res._status).not.toBe(401);
    });
});

// ============================================================
// 4. API Response Format Consistency
// ============================================================
describe('API Endpoints — Response Format', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('401 responses have consistent JSON structure', () => {
        const res = createMockRes();
        const req = createMockReq();
        req.user = { id: 0 };

        orders({ order: 'updateApp' }, req, res, PACKAGE_ROOT, {});

        expect(res._headers['Content-Type']).toBe('application/json');
        const json = res.json();
        expect(json).toHaveProperty('res', false);
        expect(json).toHaveProperty('error', 'Authentication required');
    });

    test('unknown order has JSON response format', () => {
        const session = createAuthenticatedSession({ userId: 102 });
        const res = createMockRes();
        const req = createMockReq();
        req.user = session.userData;

        orders({ order: 'notARealEndpoint' }, req, res, PACKAGE_ROOT, {});

        expect(res._headers['Content-Type']).toBe('application/json');
        const json = res.json();
        expect(json).toHaveProperty('res', false);
    });

    test('public endpoint response wraps data in res key', (done) => {
        const res = createMockRes();
        const origEnd = res.end.bind(res);
        res.end = (body) => {
            origEnd(body);
            const json = res.json();
            expect(json).toHaveProperty('res');
            done();
        };

        const req = createMockReq();
        req.user = { id: 0 };
        orders({ order: 'countries' }, req, res, PACKAGE_ROOT, {});
    });
});

// ============================================================
// 5. Tier Boundary Tests
// ============================================================
describe('API Endpoints — Tier Boundaries', () => {
    beforeEach(() => {
        cleanupSessions();
    });

    afterAll(() => {
        cleanupSessions();
    });

    test('PUBLIC order in list does not require auth', () => {
        const publicOrders = ['countries', 'languages', 'icons'];
        for (const orderName of publicOrders) {
            const res = createMockRes();
            const req = createMockReq();
            req.user = { id: 0 };

            orders({ order: orderName }, req, res, PACKAGE_ROOT, {});
            // PUBLIC endpoints should NOT be 401
            expect(res._status).not.toBe(401);
        }
    });

    test('PRE-LOGIN orders accessible without user session', () => {
        const preLoginOrders = ['addUser', 'checkUser', 'logUser', 'requestPasswordReset'];
        for (const orderName of preLoginOrders) {
            const res = createMockRes();
            const req = createMockReq();
            req.user = { id: 0 };

            try {
                orders({ order: orderName, data: {} }, req, res, PACKAGE_ROOT, {});
            } catch (e) {
                // DB operations may throw, that's expected
            }
            expect(res._status).not.toBe(401);
        }
    });

    test('boundary: countries is PUBLIC, dataBaseReport is AUTHENTICATED', () => {
        // Same user state, different endpoint tiers
        const req = createMockReq();
        req.user = { id: 0 };

        const res1 = createMockRes();
        orders({ order: 'countries' }, req, res1, PACKAGE_ROOT, {});
        // countries should succeed (not 401)

        const res2 = createMockRes();
        orders({ order: 'dataBaseReport' }, req, res2, PACKAGE_ROOT, {});
        // dataBaseReport should fail auth
        expect(res2._status).toBe(401);
    });
});
