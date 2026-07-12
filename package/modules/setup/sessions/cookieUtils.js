/**
 * cookieUtils — Shared cookie parsing and session cookie utilities.
 * Phase 2: Extracts duplicated cookie logic from isSession.js, sessionData.js,
 * sessionsControl.js, and middleWareApp.js.
 *
 * Previously, the same cookie parsing loop was written 5+ times across session files.
 *
 * @module cookieUtils
 */

/**
 * Parse session cookies from request headers.
 * Extracts deviceId, timestamp, and userId cookies.
 *
 * @param {object} req — HTTP request with headers.cookie
 * @returns {{ deviceId: string|undefined, timestamp: string|undefined, userId: string|undefined }}
 */
const parseSessionCookies = (req) => {
    const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    let deviceId, timestamp, userId;

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'deviceId') {
            deviceId = value;
        } else if (name === 'timestamp') {
            timestamp = value;
        } else if (name === 'userId') {
            userId = value;
        }
    }

    return { deviceId, timestamp, userId };
};

/**
 * Check if all required session cookies are present and non-undefined.
 *
 * @param {{ deviceId: string|undefined, timestamp: string|undefined, userId: string|undefined }} cookies
 * @returns {boolean}
 */
const hasValidSessionCookies = (cookies) => {
    return !!(
        cookies.userId && cookies.userId !== undefined &&
        cookies.deviceId && cookies.deviceId !== undefined &&
        cookies.timestamp && cookies.timestamp !== undefined
    );
};

/**
 * Generate Set-Cookie headers to destroy/clear all session cookies.
 * Sets all cookies to empty values with immediate expiration.
 *
 * @returns {string[]} Array of Set-Cookie header values
 */
const getDestroySessionCookies = () => {
    const expires = new Date(Date.now()).toUTCString();
    const destroyExpires = new Date(Date.now() + 9000).toUTCString();

    return [
        `deviceId=''; Expires=${expires}; HttpOnly; SameSite=Strict`,
        `userId=''; Expires=${expires}; HttpOnly; SameSite=Strict`,
        `timestamp=''; Expires=${expires}; HttpOnly; SameSite=Strict`,
        `destroy='true'; Expires=${destroyExpires}; HttpOnly; SameSite=Strict`
    ];
};

/**
 * Apply session destruction to the response object.
 * Sets destroy cookies and marks res.destroySession = true.
 *
 * @param {object} res — HTTP response
 */
const destroySession = (res) => {
    res.setHeader('Set-Cookie', getDestroySessionCookies());
    res.destroySession = true;
};

module.exports = {
    parseSessionCookies,
    hasValidSessionCookies,
    getDestroySessionCookies,
    destroySession
};
