/**
 * CSRF token generation and validation for i-app framework.
 * Uses crypto.randomBytes for secure token generation.
 * 
 * Tokens are stored per-session (deviceId) in an in-memory map.
 * The token is sent as a cookie and must be echoed back in the
 * X-CSRF-Token request header for all state-changing operations.
 */

const crypto = require('crypto');

const TOKEN_LENGTH = 32; // 32 bytes = 64 hex chars
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory token store: deviceId -> { token, createdAt }
const tokenStore = new Map();

// Cleanup expired tokens every 30 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of tokenStore.entries()) {
        if (now - data.createdAt > TOKEN_MAX_AGE_MS) {
            tokenStore.delete(key);
        }
    }
}, 30 * 60 * 1000);

/**
 * Generate a new CSRF token for a session.
 * 
 * @param {string} sessionId - The session/device identifier
 * @returns {string} The generated CSRF token
 */
const generateToken = (sessionId) => {
    const token = crypto.randomBytes(TOKEN_LENGTH).toString('hex');
    tokenStore.set(sessionId, { token, createdAt: Date.now() });
    return token;
};

/**
 * Validate a CSRF token against the stored token for this session.
 * 
 * @param {string} sessionId - The session/device identifier
 * @param {string} token - The token to validate (from request header)
 * @returns {boolean} True if valid, false if invalid or missing
 */
const validateToken = (sessionId, token) => {
    if (!sessionId || !token) {
        return false;
    }

    const stored = tokenStore.get(sessionId);
    if (!stored) {
        return false;
    }

    // Check token age
    if (Date.now() - stored.createdAt > TOKEN_MAX_AGE_MS) {
        tokenStore.delete(sessionId);
        return false;
    }

    // Constant-time comparison to prevent timing attacks
    try {
        return crypto.timingSafeEqual(
            Buffer.from(stored.token, 'hex'),
            Buffer.from(token, 'hex')
        );
    } catch (e) {
        return false;
    }
};

/**
 * Get the CSRF token cookie string for a session.
 * 
 * @param {string} sessionId - The session/device identifier
 * @param {string} token - The CSRF token
 * @returns {string} The Set-Cookie header value
 */
const getTokenCookie = (sessionId, token) => {
    return `csrfToken=${token}; Path=/; SameSite=Strict; Max-Age=86400`;
};

/**
 * Remove a CSRF token (on logout).
 * 
 * @param {string} sessionId - The session/device identifier
 */
const removeToken = (sessionId) => {
    tokenStore.delete(sessionId);
};

module.exports = { generateToken, validateToken, getTokenCookie, removeToken };
