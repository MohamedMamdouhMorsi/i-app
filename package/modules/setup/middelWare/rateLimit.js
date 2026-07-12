/**
 * In-memory rate limiter for i-app framework.
 * Limits requests per IP address within a sliding time window.
 * 
 * Default: 100 requests per 15 minutes per IP.
 */

const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_MAX_REQUESTS = 1000;

const ipHits = new Map();

// Cleanup interval — remove expired entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipHits.entries()) {
        if (now - data.windowStart > DEFAULT_WINDOW_MS * 2) {
            ipHits.delete(ip);
        }
    }
}, 5 * 60 * 1000);

/**
 * Check if a request from this IP should be rate-limited.
 * 
 * @param {string} ip - The client IP address
 * @param {number} [maxRequests=100] - Max requests per window
 * @param {number} [windowMs=900000] - Window size in ms (default 15min)
 * @returns {{ allowed: boolean, remaining: number, retryAfterMs: number }}
 */
const checkRateLimit = (ip, maxRequests = DEFAULT_MAX_REQUESTS, windowMs = DEFAULT_WINDOW_MS) => {
    const now = Date.now();

    if (!ipHits.has(ip)) {
        ipHits.set(ip, { count: 1, windowStart: now });
        return { allowed: true, remaining: maxRequests - 1, retryAfterMs: 0 };
    }

    const data = ipHits.get(ip);

    // If the window has expired, reset the counter
    if (now - data.windowStart > windowMs) {
        data.count = 1;
        data.windowStart = now;
        return { allowed: true, remaining: maxRequests - 1, retryAfterMs: 0 };
    }

    data.count++;

    if (data.count > maxRequests) {
        const retryAfterMs = windowMs - (now - data.windowStart);
        return { allowed: false, remaining: 0, retryAfterMs };
    }

    return { allowed: true, remaining: maxRequests - data.count, retryAfterMs: 0 };
};

/**
 * Express-style middleware for rate limiting.
 * Returns 429 Too Many Requests if limit exceeded.
 * 
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 * @returns {boolean} true if request is allowed, false if blocked
 */
const rateLimitMiddleware = (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const result = checkRateLimit(ip);

    if (!result.allowed) {
        const retryAfterSec = Math.ceil(result.retryAfterMs / 1000);
        res.writeHead(429, {
            'Content-Type': 'text/html',
            'Retry-After': retryAfterSec.toString()
        });
        res.end('<h1>429 Too Many Requests</h1><p>Rate limit exceeded. Please try again later.</p>');
        return false;
    }

    return true;
};

module.exports = { checkRateLimit, rateLimitMiddleware };
