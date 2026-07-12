/**
 * Session Security Tests
 * Phase 3 — Security Test Suite
 *
 * Validates cookieUtils module handles session cookies securely:
 * parsing, validation, destruction, and injection resistance.
 * See: knowledge/modules/setup/sessions/cookieUtils.md
 */

const {
    parseSessionCookies,
    hasValidSessionCookies,
    getDestroySessionCookies,
    destroySession
} = require('../../modules/setup/sessions/cookieUtils');

// ============================================================
// 1. parseSessionCookies — Cookie header parsing
// ============================================================
describe('Session Security — parseSessionCookies', () => {
    test('parses all three session cookies', () => {
        const req = { headers: { cookie: 'deviceId=abc123; timestamp=1234567890; userId=42' } };
        const result = parseSessionCookies(req);
        expect(result).toEqual({
            deviceId: 'abc123',
            timestamp: '1234567890',
            userId: '42'
        });
    });

    test('returns undefined for missing cookies', () => {
        const req = { headers: { cookie: 'deviceId=abc123' } };
        const result = parseSessionCookies(req);
        expect(result.deviceId).toBe('abc123');
        expect(result.timestamp).toBeUndefined();
        expect(result.userId).toBeUndefined();
    });

    test('handles missing cookie header', () => {
        const req = { headers: {} };
        const result = parseSessionCookies(req);
        expect(result.deviceId).toBeUndefined();
        expect(result.timestamp).toBeUndefined();
        expect(result.userId).toBeUndefined();
    });

    test('handles empty cookie header', () => {
        const req = { headers: { cookie: '' } };
        const result = parseSessionCookies(req);
        expect(result.deviceId).toBeUndefined();
    });

    test('handles cookies with special characters in values', () => {
        const req = { headers: { cookie: 'deviceId=abc%20def; userId=user%3D1; timestamp=123' } };
        const result = parseSessionCookies(req);
        expect(result.deviceId).toBe('abc%20def');
        // Note: cookie.split('=') only takes the first '=' match,
        // so 'user%3D1' gets split at first '=' → value is 'user%3D1'
        expect(result.userId).toBe('user%3D1');
    });

    test('ignores non-session cookies', () => {
        const req = { headers: { cookie: 'deviceId=abc; theme=dark; userId=42; lang=en; timestamp=123' } };
        const result = parseSessionCookies(req);
        expect(result).toEqual({
            deviceId: 'abc',
            userId: '42',
            timestamp: '123'
        });
    });

    test('resists XSS payloads in cookie values', () => {
        const xssPayload = '<script>alert("xss")</script>';
        const req = { headers: { cookie: `deviceId=${xssPayload}; userId=42; timestamp=123` } };
        const result = parseSessionCookies(req);
        // Parser should NOT crash — it just stores the raw value
        expect(result.deviceId).toBe(xssPayload);
    });

    test('SQL injection in cookie values does not crash parser', () => {
        // Note: cookie.split('=') uses naive split, so payloads with '='
        // get truncated. This test verifies the parser doesn't crash,
        // and that the parser splits at the FIRST '=' only.
        const sqlPayload = "' OR 1--";
        const req = { headers: { cookie: `userId=${sqlPayload}; deviceId=abc; timestamp=123` } };
        const result = parseSessionCookies(req);
        // Parser stores the raw value after first '='
        expect(result.userId).toBe(sqlPayload);
        expect(result.deviceId).toBe('abc');
    });

    test('cookie value with equals sign is truncated at first =', () => {
        // "userId=' OR '1'='1' --" splits to [userId, ' OR '1', '1' --]
        // destructuring takes first two: name=userId, value=' OR '1'
        const req = { headers: { cookie: "userId=' OR '1'='1' --; deviceId=abc; timestamp=123" } };
        const result = parseSessionCookies(req);
        // The value is truncated — parser limitation but doesn't crash
        expect(result.userId).toBe("' OR '1'");
        expect(result.deviceId).toBe('abc');
    });
});

// ============================================================
// 2. hasValidSessionCookies — Truthiness validation
// ============================================================
describe('Session Security — hasValidSessionCookies', () => {
    test('returns true when all cookies present and non-empty', () => {
        expect(hasValidSessionCookies({
            deviceId: 'abc', userId: '42', timestamp: '123'
        })).toBe(true);
    });

    test('returns false when userId is missing', () => {
        expect(hasValidSessionCookies({
            deviceId: 'abc', timestamp: '123'
        })).toBe(false);
    });

    test('returns false when deviceId is missing', () => {
        expect(hasValidSessionCookies({
            userId: '42', timestamp: '123'
        })).toBe(false);
    });

    test('returns false when timestamp is missing', () => {
        expect(hasValidSessionCookies({
            deviceId: 'abc', userId: '42'
        })).toBe(false);
    });

    test('returns false when userId is undefined', () => {
        expect(hasValidSessionCookies({
            deviceId: 'abc', userId: undefined, timestamp: '123'
        })).toBe(false);
    });

    test('returns false when all cookies are empty strings', () => {
        expect(hasValidSessionCookies({
            deviceId: '', userId: '', timestamp: ''
        })).toBe(false);
    });

    test('accepts string "0" as userId (truthy non-empty string)', () => {
        // In JavaScript, the string '0' is truthy — it's a non-empty string.
        // hasValidSessionCookies uses !! coercion, so '0' → true.
        expect(hasValidSessionCookies({
            deviceId: 'abc', userId: '0', timestamp: '123'
        })).toBe(true);
    });

    test('returns false with null values', () => {
        expect(hasValidSessionCookies({
            deviceId: null, userId: null, timestamp: null
        })).toBe(false);
    });

    test('returns false with empty object', () => {
        expect(hasValidSessionCookies({})).toBe(false);
    });
});

// ============================================================
// 3. Session Destruction
// ============================================================
describe('Session Security — getDestroySessionCookies', () => {
    test('returns array of 4 Set-Cookie headers', () => {
        const cookies = getDestroySessionCookies();
        expect(Array.isArray(cookies)).toBe(true);
        expect(cookies.length).toBe(4);
    });

    test('clears deviceId cookie', () => {
        const cookies = getDestroySessionCookies();
        const deviceCookie = cookies.find(c => c.startsWith('deviceId'));
        expect(deviceCookie).toBeDefined();
        expect(deviceCookie).toContain("deviceId=''");
        expect(deviceCookie).toContain('HttpOnly');
        expect(deviceCookie).toContain('SameSite=Strict');
    });

    test('clears userId cookie', () => {
        const cookies = getDestroySessionCookies();
        const userCookie = cookies.find(c => c.startsWith('userId'));
        expect(userCookie).toBeDefined();
        expect(userCookie).toContain("userId=''");
    });

    test('clears timestamp cookie', () => {
        const cookies = getDestroySessionCookies();
        const tsCookie = cookies.find(c => c.startsWith('timestamp'));
        expect(tsCookie).toBeDefined();
        expect(tsCookie).toContain("timestamp=''");
    });

    test('sets destroy flag cookie', () => {
        const cookies = getDestroySessionCookies();
        const destroyCookie = cookies.find(c => c.startsWith('destroy'));
        expect(destroyCookie).toBeDefined();
        expect(destroyCookie).toContain("destroy='true'");
    });

    test('all cookies have Expires header', () => {
        const cookies = getDestroySessionCookies();
        cookies.forEach(c => {
            expect(c).toContain('Expires=');
        });
    });
});

// ============================================================
// 4. destroySession — Response modification
// ============================================================
describe('Session Security — destroySession', () => {
    test('sets Set-Cookie headers on response', () => {
        const res = { setHeader: jest.fn(), destroySession: false };
        destroySession(res);
        expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.any(Array));
    });

    test('marks response with destroySession flag', () => {
        const res = { setHeader: jest.fn(), destroySession: false };
        destroySession(res);
        expect(res.destroySession).toBe(true);
    });

    test('sets exactly 4 cookies via setHeader', () => {
        const res = { setHeader: jest.fn(), destroySession: false };
        destroySession(res);
        const cookieHeaders = res.setHeader.mock.calls[0][1];
        expect(cookieHeaders.length).toBe(4);
    });
});
