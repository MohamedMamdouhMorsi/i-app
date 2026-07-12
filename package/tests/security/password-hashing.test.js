/**
 * Password Hashing Tests
 * Phase 3 — Security Test Suite
 *
 * Validates bcrypt hashing, legacy hash detection, and migration support.
 * See: knowledge/modules/utils/toolsFN/passwordHash.md
 */

const {
    hashPassword,
    hashPasswordAsync,
    verifyPassword,
    verifyPasswordAsync,
    isLegacyHash,
    BCRYPT_ROUNDS
} = require('../../modules/utils/toolsFN/passwordHash');

// ============================================================
// 1. Password Hashing (bcrypt)
// ============================================================
describe('Password Hashing — hashPassword', () => {
    test('returns a bcrypt hash string', () => {
        const hash = hashPassword('testPassword123');
        expect(hash).toMatch(/^\$2[aby]\$\d{2}\$/); // bcrypt format
    });

    test('hash starts with $2b$ (bcrypt v2b)', () => {
        const hash = hashPassword('test');
        expect(hash.startsWith('$2b$')).toBe(true);
    });

    test('uses correct cost factor', () => {
        const hash = hashPassword('test');
        const costStr = hash.split('$')[2];
        expect(parseInt(costStr)).toBe(BCRYPT_ROUNDS);
    });

    test('generates different hashes for same password (salt)', () => {
        const hash1 = hashPassword('samePassword');
        const hash2 = hashPassword('samePassword');
        expect(hash1).not.toBe(hash2);
    });

    test('generates different hashes for different passwords', () => {
        const hash1 = hashPassword('password1');
        const hash2 = hashPassword('password2');
        expect(hash1).not.toBe(hash2);
    });

    test('handles empty string', () => {
        const hash = hashPassword('');
        expect(hash).toMatch(/^\$2b\$/);
    });

    test('handles unicode passwords', () => {
        const hash = hashPassword('パスワード123');
        expect(hash).toMatch(/^\$2b\$/);
    });

    test('handles very long passwords', () => {
        // bcrypt truncates at 72 bytes — should not crash
        const longPassword = 'a'.repeat(200);
        const hash = hashPassword(longPassword);
        expect(hash).toMatch(/^\$2b\$/);
    });
});

describe('Password Hashing — hashPasswordAsync', () => {
    test('returns a bcrypt hash asynchronously', async () => {
        const hash = await hashPasswordAsync('asyncTest');
        expect(hash).toMatch(/^\$2b\$/);
    });

    test('async hash verifies correctly', async () => {
        const hash = await hashPasswordAsync('asyncTest');
        const result = verifyPassword('asyncTest', hash);
        expect(result.valid).toBe(true);
    });
});

// ============================================================
// 2. Password Verification
// ============================================================
describe('Password Hashing — verifyPassword', () => {
    test('verifies correct password against bcrypt hash', () => {
        const hash = hashPassword('correctPassword');
        const result = verifyPassword('correctPassword', hash);
        expect(result.valid).toBe(true);
        expect(result.needsMigration).toBe(false);
    });

    test('rejects incorrect password against bcrypt hash', () => {
        const hash = hashPassword('correctPassword');
        const result = verifyPassword('wrongPassword', hash);
        expect(result.valid).toBe(false);
        expect(result.needsMigration).toBe(false);
    });

    test('handles null stored hash', () => {
        const result = verifyPassword('password', null);
        expect(result.valid).toBe(false);
        expect(result.needsMigration).toBe(false);
    });

    test('handles undefined stored hash', () => {
        const result = verifyPassword('password', undefined);
        expect(result.valid).toBe(false);
    });

    test('handles empty plaintext', () => {
        const hash = hashPassword('test');
        const result = verifyPassword('', hash);
        expect(result.valid).toBe(false);
    });

    test('handles null plaintext', () => {
        const hash = hashPassword('test');
        const result = verifyPassword(null, hash);
        expect(result.valid).toBe(false);
    });
});

describe('Password Hashing — verifyPasswordAsync', () => {
    test('verifies correct password asynchronously', async () => {
        const hash = hashPassword('asyncVerify');
        const result = await verifyPasswordAsync('asyncVerify', hash);
        expect(result.valid).toBe(true);
    });

    test('rejects incorrect password asynchronously', async () => {
        const hash = hashPassword('asyncVerify');
        const result = await verifyPasswordAsync('wrong', hash);
        expect(result.valid).toBe(false);
    });

    test('handles null inputs', async () => {
        const result = await verifyPasswordAsync(null, null);
        expect(result.valid).toBe(false);
    });
});

// ============================================================
// 3. Legacy Hash Detection and Migration
// ============================================================
describe('Password Hashing — isLegacyHash', () => {
    test('detects legacy I-app- prefixed hash', () => {
        expect(isLegacyHash('I-app-abc123def456')).toBe(true);
    });

    test('does not flag bcrypt hash as legacy', () => {
        const hash = hashPassword('test');
        expect(isLegacyHash(hash)).toBe(false);
    });

    test('does not flag random string as legacy', () => {
        expect(isLegacyHash('randomHash123')).toBe(false);
    });

    test('handles null', () => {
        expect(isLegacyHash(null)).toBe(false);
    });

    test('handles undefined', () => {
        expect(isLegacyHash(undefined)).toBe(false);
    });

    test('handles empty string', () => {
        expect(isLegacyHash('')).toBe(false);
    });

    test('handles number input', () => {
        expect(isLegacyHash(12345)).toBe(false);
    });
});

describe('Password Hashing — Legacy Migration', () => {
    test('legacy hash sets needsMigration on successful verify', () => {
        // We need a real legacy hash to test this properly.
        // Legacy format is deterministic: creatAUTH(password) = 'I-app-...'
        // Since we can't easily create one here, we test the flag logic:
        
        // If the stored hash starts with I-app- and matches, needsMigration = true
        // If the stored hash starts with I-app- and doesn't match, needsMigration = false
        const creatAUTH = require('../../modules/utils/toolsFN/createAUTH');
        const legacyHash = creatAUTH('testLegacy');
        
        if (legacyHash && legacyHash.startsWith('I-app-')) {
            const result = verifyPassword('testLegacy', legacyHash);
            expect(result.valid).toBe(true);
            expect(result.needsMigration).toBe(true);
        }
    });

    test('legacy hash with wrong password: needsMigration = false', () => {
        const creatAUTH = require('../../modules/utils/toolsFN/createAUTH');
        const legacyHash = creatAUTH('testLegacy');
        
        if (legacyHash && legacyHash.startsWith('I-app-')) {
            const result = verifyPassword('wrongPassword', legacyHash);
            expect(result.valid).toBe(false);
            expect(result.needsMigration).toBe(false);
        }
    });
});

// ============================================================
// 4. Security Properties
// ============================================================
describe('Password Hashing — Security Properties', () => {
    test('BCRYPT_ROUNDS is at least 10', () => {
        expect(BCRYPT_ROUNDS).toBeGreaterThanOrEqual(10);
    });

    test('hash is not reversible (not plaintext)', () => {
        const password = 'secretPassword123';
        const hash = hashPassword(password);
        expect(hash).not.toContain(password);
    });

    test('timing: hash generation takes meaningful time (>5ms)', () => {
        const start = Date.now();
        hashPassword('timingTest');
        const elapsed = Date.now() - start;
        // bcrypt with 12 rounds should take > 5ms on any modern CPU
        expect(elapsed).toBeGreaterThan(5);
    });

    test('cross-verify: sync hash verified by async, and vice versa', async () => {
        const syncHash = hashPassword('crossVerify');
        const asyncResult = await verifyPasswordAsync('crossVerify', syncHash);
        expect(asyncResult.valid).toBe(true);

        const asyncHash = await hashPasswordAsync('crossVerify2');
        const syncResult = verifyPassword('crossVerify2', asyncHash);
        expect(syncResult.valid).toBe(true);
    });
});
