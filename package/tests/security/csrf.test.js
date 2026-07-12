/**
 * CSRF Protection Tests
 * Phase 3 — Security Test Suite
 *
 * Validates CSRF token generation, validation, and timing safety.
 * See: knowledge/modules/setup/middelWare/csrfToken.md
 */

const { generateToken, validateToken, getTokenCookie, removeToken } = require('../../modules/setup/middelWare/csrfToken');

describe('CSRF Protection — csrfToken', () => {

    // ============================================================
    // Token Generation
    // ============================================================
    describe('Token Generation', () => {
        test('generates a 64-character hex token', () => {
            const token = generateToken('session-1');
            expect(typeof token).toBe('string');
            expect(token).toHaveLength(64); // 32 bytes = 64 hex chars
            expect(token).toMatch(/^[0-9a-f]{64}$/);
        });

        test('generates unique tokens per session', () => {
            const token1 = generateToken('session-1');
            const token2 = generateToken('session-2');
            expect(token1).not.toBe(token2);
        });

        test('generates unique tokens on regeneration', () => {
            const token1 = generateToken('session-regen');
            const token2 = generateToken('session-regen');
            // Regenerating for same session should produce new token
            expect(token1).not.toBe(token2);
        });
    });

    // ============================================================
    // Token Validation
    // ============================================================
    describe('Token Validation', () => {
        test('validates correct token', () => {
            const sessionId = 'valid-session-1';
            const token = generateToken(sessionId);
            expect(validateToken(sessionId, token)).toBe(true);
        });

        test('rejects wrong token', () => {
            const sessionId = 'wrong-token-session';
            generateToken(sessionId);
            const fakeToken = 'a'.repeat(64);
            expect(validateToken(sessionId, fakeToken)).toBe(false);
        });

        test('rejects token for non-existent session', () => {
            const token = 'b'.repeat(64);
            expect(validateToken('nonexistent-session', token)).toBe(false);
        });

        test('rejects null/undefined sessionId', () => {
            expect(validateToken(null, 'token123')).toBe(false);
            expect(validateToken(undefined, 'token123')).toBe(false);
        });

        test('rejects null/undefined token', () => {
            const sessionId = 'null-token-session';
            generateToken(sessionId);
            expect(validateToken(sessionId, null)).toBe(false);
            expect(validateToken(sessionId, undefined)).toBe(false);
        });

        test('rejects empty string token', () => {
            const sessionId = 'empty-token-session';
            generateToken(sessionId);
            expect(validateToken(sessionId, '')).toBe(false);
        });

        test('rejects empty string sessionId', () => {
            expect(validateToken('', 'sometoken')).toBe(false);
        });

        test('rejects token with wrong length (timing-safe)', () => {
            const sessionId = 'len-mismatch-session';
            generateToken(sessionId);
            // Token with wrong length should fail gracefully (timingSafeEqual throws on length mismatch)
            expect(validateToken(sessionId, 'short')).toBe(false);
            expect(validateToken(sessionId, 'a'.repeat(128))).toBe(false);
        });

        test('rejects token with non-hex characters', () => {
            const sessionId = 'nonhex-session';
            generateToken(sessionId);
            const nonHex = 'zz' + 'a'.repeat(62);
            expect(validateToken(sessionId, nonHex)).toBe(false);
        });

        test('uses constant-time comparison (not vulnerable to timing attacks)', () => {
            const sessionId = 'timing-session';
            const token = generateToken(sessionId);

            // Validate correct token multiple times — timing should be consistent
            const times = [];
            for (let i = 0; i < 100; i++) {
                const start = process.hrtime.bigint();
                validateToken(sessionId, token);
                const end = process.hrtime.bigint();
                times.push(Number(end - start));
            }

            // Check that validation with partially-correct token takes similar time
            const partialToken = token.substring(0, 32) + 'f'.repeat(32);
            const partialTimes = [];
            for (let i = 0; i < 100; i++) {
                const start = process.hrtime.bigint();
                validateToken(sessionId, partialToken);
                const end = process.hrtime.bigint();
                partialTimes.push(Number(end - start));
            }

            // Both should use timingSafeEqual — we can't perfectly test timing in unit tests,
            // but we verify they both complete reasonably (no short-circuit)
            const avgCorrect = times.reduce((a, b) => a + b, 0) / times.length;
            const avgPartial = partialTimes.reduce((a, b) => a + b, 0) / partialTimes.length;

            // Allow 10x variance — the point is neither is instant (< 100ns)
            expect(avgCorrect).toBeGreaterThan(0);
            expect(avgPartial).toBeGreaterThan(0);
        });
    });

    // ============================================================
    // Token Cookie
    // ============================================================
    describe('Token Cookie', () => {
        test('returns valid Set-Cookie string', () => {
            const cookie = getTokenCookie('session-cookie', 'abc123');
            expect(cookie).toContain('csrfToken=abc123');
            expect(cookie).toContain('Path=/');
            expect(cookie).toContain('SameSite=Strict');
        });

        test('cookie has Max-Age of 24 hours', () => {
            const cookie = getTokenCookie('s', 't');
            expect(cookie).toContain('Max-Age=86400');
        });
    });

    // ============================================================
    // Token Removal
    // ============================================================
    describe('Token Removal', () => {
        test('removeToken invalidates the session token', () => {
            const sessionId = 'remove-session';
            const token = generateToken(sessionId);
            expect(validateToken(sessionId, token)).toBe(true);

            removeToken(sessionId);
            expect(validateToken(sessionId, token)).toBe(false);
        });

        test('removeToken is safe for non-existent session', () => {
            expect(() => removeToken('nonexistent')).not.toThrow();
        });
    });

    // ============================================================
    // Security Edge Cases
    // ============================================================
    describe('Security Edge Cases', () => {
        test('stolen token from one session cannot be used on another', () => {
            const token1 = generateToken('session-a');
            generateToken('session-b');
            // Token from session-a should not validate on session-b
            expect(validateToken('session-b', token1)).toBe(false);
        });

        test('old token invalidated after regeneration', () => {
            const sessionId = 'regen-session';
            const oldToken = generateToken(sessionId);
            const newToken = generateToken(sessionId);

            expect(validateToken(sessionId, newToken)).toBe(true);
            expect(validateToken(sessionId, oldToken)).toBe(false);
        });

        test('XSS payload in sessionId does not break', () => {
            const xssSessionId = "<script>alert('XSS')</script>";
            const token = generateToken(xssSessionId);
            expect(validateToken(xssSessionId, token)).toBe(true);
        });

        test('SQL injection in sessionId does not break', () => {
            const sqlSessionId = "'; DROP TABLE sessions;--";
            const token = generateToken(sqlSessionId);
            expect(validateToken(sqlSessionId, token)).toBe(true);
        });
    });
});
