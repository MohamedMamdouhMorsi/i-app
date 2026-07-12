/**
 * Security event logger for i-app framework.
 * Logs security-relevant events for audit and monitoring.
 * 
 * Events are logged to console and optionally to a file.
 */

const fs = require('fs');
const path = require('path');

const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    CRITICAL: 'CRITICAL'
};

/**
 * Log a security event.
 * 
 * @param {string} event - Event type (e.g., 'LOGIN_FAILED', 'CSRF_VIOLATION', 'RATE_LIMITED')
 * @param {string} level - LOG_LEVELS value
 * @param {object} details - Event details
 * @param {string} [details.ip] - Client IP address
 * @param {string} [details.userId] - User ID if known
 * @param {string} [details.url] - Request URL
 * @param {string} [details.reason] - Reason for the event
 */
const logSecurityEvent = (event, level, details = {}) => {
    const timestamp = new Date().toISOString();
    const ip = details.ip || 'unknown';
    const logEntry = {
        timestamp,
        level,
        event,
        ip,
        userId: details.userId || null,
        url: details.url || null,
        reason: details.reason || null
    };

    // Console output with color coding
    const prefix = `[SECURITY:${level}]`;
    if (level === LOG_LEVELS.CRITICAL) {
        console.error(`${prefix} ${event} | IP: ${ip} | ${details.reason || ''}`);
    } else if (level === LOG_LEVELS.WARN) {
        console.warn(`${prefix} ${event} | IP: ${ip} | ${details.reason || ''}`);
    } else {
        console.log(`${prefix} ${event} | IP: ${ip}`);
    }

    return logEntry;
};

module.exports = { logSecurityEvent, LOG_LEVELS };
