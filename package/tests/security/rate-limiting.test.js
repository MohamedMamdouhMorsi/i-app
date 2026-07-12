/**
 * Rate Limiting Tests
 * Phase 3 — Security Test Suite
 *
 * Validates IP-based rate limiting with sliding window.
 * See: knowledge/modules/setup/middelWare/rateLimit.md
 */

const { checkRateLimit, rateLimitMiddleware } = require('../../modules/setup/middelWare/rateLimit');

// ============================================================
// 1. checkRateLimit core function
// ============================================================
describe('Rate Limiting — checkRateLimit', () => {
    // Use unique IPs per test to avoid cross-test interference

    test('allows first request from a new IP', () => {
        const ip = 'rate-test-1-' + Date.now();
        const result = checkRateLimit(ip);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(99);
        expect(result.retryAfterMs).toBe(0);
    });

    test('tracks request count per IP', () => {
        const ip = 'rate-test-2-' + Date.now();
        checkRateLimit(ip);
        const result = checkRateLimit(ip);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(98);
    });

    test('blocks after exceeding max requests', () => {
        const ip = 'rate-test-3-' + Date.now();
        // Hit limit with lower max for faster testing
        for (let i = 0; i < 5; i++) {
            checkRateLimit(ip, 5, 900000);
        }
        const result = checkRateLimit(ip, 5, 900000);
        expect(result.allowed).toBe(false);
        expect(result.remaining).toBe(0);
        expect(result.retryAfterMs).toBeGreaterThan(0);
    });

    test('returns remaining count accurately', () => {
        const ip = 'rate-test-4-' + Date.now();
        const max = 10;
        for (let i = 0; i < 7; i++) {
            checkRateLimit(ip, max, 900000);
        }
        const result = checkRateLimit(ip, max, 900000);
        expect(result.remaining).toBe(max - 8);
    });

    test('resets after window expires', () => {
        const ip = 'rate-test-5-' + Date.now();
        // Use a very short window (1ms) to simulate expiry
        checkRateLimit(ip, 1, 1);

        // Wait briefly for window to expire
        const start = Date.now();
        while (Date.now() - start < 5) { /* busy wait */ }

        const result = checkRateLimit(ip, 1, 1);
        expect(result.allowed).toBe(true);
    });

    test('uses custom max and window', () => {
        const ip = 'rate-test-6-' + Date.now();
        const result = checkRateLimit(ip, 50, 60000);
        expect(result.remaining).toBe(49);
    });

    test('default max is 100', () => {
        const ip = 'rate-test-7-' + Date.now();
        const result = checkRateLimit(ip);
        expect(result.remaining).toBe(99); // 100 - 1
    });

    test('retryAfterMs is within window bounds', () => {
        const ip = 'rate-test-8-' + Date.now();
        const windowMs = 60000;
        for (let i = 0; i <= 3; i++) {
            checkRateLimit(ip, 3, windowMs);
        }
        const result = checkRateLimit(ip, 3, windowMs);
        expect(result.retryAfterMs).toBeGreaterThan(0);
        expect(result.retryAfterMs).toBeLessThanOrEqual(windowMs);
    });

    test('different IPs are tracked independently', () => {
        const ip1 = 'rate-test-9a-' + Date.now();
        const ip2 = 'rate-test-9b-' + Date.now();

        // Exhaust ip1's limit
        for (let i = 0; i <= 3; i++) {
            checkRateLimit(ip1, 3, 900000);
        }

        // ip2 should still be allowed
        const result = checkRateLimit(ip2, 3, 900000);
        expect(result.allowed).toBe(true);

        // ip1 should be blocked
        const blocked = checkRateLimit(ip1, 3, 900000);
        expect(blocked.allowed).toBe(false);
    });
});

// ============================================================
// 2. rateLimitMiddleware — Express-style middleware
// ============================================================
describe('Rate Limiting — rateLimitMiddleware', () => {
    const createMockReqRes = (ip) => {
        const req = {
            headers: { 'x-forwarded-for': ip },
            connection: { remoteAddress: ip }
        };
        let statusCode = null;
        let headers = {};
        let body = '';
        const res = {
            writeHead: (code, h) => { statusCode = code; headers = h; },
            end: (b) => { body = b; }
        };
        return { req, res, getStatusCode: () => statusCode, getBody: () => body, getHeaders: () => headers };
    };

    test('returns true for allowed request', () => {
        const ip = 'mw-test-1-' + Date.now();
        const { req, res } = createMockReqRes(ip);
        const allowed = rateLimitMiddleware(req, res);
        expect(allowed).toBe(true);
    });

    test('returns false and sends 429 when rate limited', () => {
        const ip = 'mw-test-2-' + Date.now();

        // Exhaust the limit first using checkRateLimit
        for (let i = 0; i <= 100; i++) {
            checkRateLimit(ip);
        }

        const { req, res, getStatusCode, getBody, getHeaders } = createMockReqRes(ip);
        const allowed = rateLimitMiddleware(req, res);

        expect(allowed).toBe(false);
        expect(getStatusCode()).toBe(429);
        expect(getBody()).toContain('429');
        expect(getBody()).toContain('Too Many Requests');
        expect(getHeaders()['Retry-After']).toBeDefined();
        expect(getHeaders()['Content-Type']).toBe('text/html');
    });

    test('reads IP from x-forwarded-for header', () => {
        const ip = 'mw-test-3-' + Date.now();
        const req = {
            headers: { 'x-forwarded-for': ip },
            connection: { remoteAddress: '127.0.0.1' }
        };
        const res = { writeHead: () => {}, end: () => {} };
        const allowed = rateLimitMiddleware(req, res);
        expect(allowed).toBe(true);
    });

    test('falls back to connection.remoteAddress', () => {
        const ip = 'mw-test-4-' + Date.now();
        const req = {
            headers: {},
            connection: { remoteAddress: ip }
        };
        const res = { writeHead: () => {}, end: () => {} };
        const allowed = rateLimitMiddleware(req, res);
        expect(allowed).toBe(true);
    });

    test('handles missing IP gracefully', () => {
        const req = {
            headers: {},
            connection: {}
        };
        const res = { writeHead: () => {}, end: () => {} };
        // Should use 'unknown' as fallback
        expect(() => rateLimitMiddleware(req, res)).not.toThrow();
    });
});
