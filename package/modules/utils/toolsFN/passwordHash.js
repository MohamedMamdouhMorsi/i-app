/**
 * passwordHash — Password verification with legacy creatAUTH support.
 * Uses creatAUTH (I-app- prefix) for password hashing and verification.
 */
const creatAUTH = require('./createAUTH');

const LEGACY_PREFIX = 'I-app-';

const hashPassword = (plaintext) => {
    return creatAUTH(plaintext);
};

const isLegacyHash = (storedHash) => {
    return typeof storedHash === 'string' && storedHash.startsWith(LEGACY_PREFIX);
};

const verifyPassword = (plaintext, storedHash) => {
    if (!storedHash || !plaintext) {
        return { valid: false, needsMigration: false };
    }
    const computedHash = creatAUTH(plaintext);
    const valid = computedHash === storedHash;
    return { valid, needsMigration: false };
};

module.exports = {
    hashPassword,
    verifyPassword,
    isLegacyHash,
};
