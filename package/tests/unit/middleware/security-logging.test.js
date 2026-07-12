/**
 * Security Logging Tests
 * Phase 3 — Security Test Suite
 *
 * Validates security event logging structure and levels.
 * See: knowledge/modules/setup/middelWare/securityLog.md
 */

const { logSecurityEvent, LOG_LEVELS } = require('../../../modules/setup/middelWare/securityLog');

// ============================================================
// 1. LOG_LEVELS constants
// ============================================================
describe('Security Logging — LOG_LEVELS', () => {
    test('defines INFO level', () => {
        expect(LOG_LEVELS.INFO).toBe('INFO');
    });

    test('defines WARN level', () => {
        expect(LOG_LEVELS.WARN).toBe('WARN');
    });

    test('defines CRITICAL level', () => {
        expect(LOG_LEVELS.CRITICAL).toBe('CRITICAL');
    });
});

// ============================================================
// 2. logSecurityEvent function
// ============================================================
describe('Security Logging — logSecurityEvent', () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = {
            log: jest.spyOn(console, 'log').mockImplementation(),
            warn: jest.spyOn(console, 'warn').mockImplementation(),
            error: jest.spyOn(console, 'error').mockImplementation()
        };
    });
    afterEach(() => {
        consoleSpy.log.mockRestore();
        consoleSpy.warn.mockRestore();
        consoleSpy.error.mockRestore();
    });

    test('returns structured log entry', () => {
        const entry = logSecurityEvent('LOGIN_FAILED', LOG_LEVELS.WARN, {
            ip: '192.168.1.1',
            userId: '42',
            url: '/api/login',
            reason: 'Invalid password'
        });

        expect(entry).toHaveProperty('timestamp');
        expect(entry.level).toBe('WARN');
        expect(entry.event).toBe('LOGIN_FAILED');
        expect(entry.ip).toBe('192.168.1.1');
        expect(entry.userId).toBe('42');
        expect(entry.url).toBe('/api/login');
        expect(entry.reason).toBe('Invalid password');
    });

    test('timestamp is valid ISO string', () => {
        const entry = logSecurityEvent('TEST', LOG_LEVELS.INFO, {});
        expect(new Date(entry.timestamp).toISOString()).toBe(entry.timestamp);
    });

    test('defaults ip to "unknown"', () => {
        const entry = logSecurityEvent('TEST', LOG_LEVELS.INFO, {});
        expect(entry.ip).toBe('unknown');
    });

    test('defaults userId to null', () => {
        const entry = logSecurityEvent('TEST', LOG_LEVELS.INFO, {});
        expect(entry.userId).toBeNull();
    });

    test('defaults url to null', () => {
        const entry = logSecurityEvent('TEST', LOG_LEVELS.INFO, {});
        expect(entry.url).toBeNull();
    });

    test('defaults reason to null', () => {
        const entry = logSecurityEvent('TEST', LOG_LEVELS.INFO, {});
        expect(entry.reason).toBeNull();
    });

    test('handles empty details object', () => {
        const entry = logSecurityEvent('EVENT', LOG_LEVELS.INFO);
        expect(entry).toHaveProperty('timestamp');
        expect(entry.ip).toBe('unknown');
    });

    describe('Console output routing', () => {
        test('CRITICAL uses console.error', () => {
            logSecurityEvent('CRITICAL_EVENT', LOG_LEVELS.CRITICAL, { ip: '1.2.3.4' });
            expect(consoleSpy.error).toHaveBeenCalled();
            expect(consoleSpy.warn).not.toHaveBeenCalled();
            expect(consoleSpy.log).not.toHaveBeenCalled();
        });

        test('WARN uses console.warn', () => {
            logSecurityEvent('WARN_EVENT', LOG_LEVELS.WARN, { ip: '1.2.3.4' });
            expect(consoleSpy.warn).toHaveBeenCalled();
            expect(consoleSpy.error).not.toHaveBeenCalled();
        });

        test('INFO uses console.log', () => {
            logSecurityEvent('INFO_EVENT', LOG_LEVELS.INFO, { ip: '1.2.3.4' });
            expect(consoleSpy.log).toHaveBeenCalled();
            expect(consoleSpy.error).not.toHaveBeenCalled();
        });
    });

    describe('Event types (from design system)', () => {
        const eventTypes = [
            'LOGIN_FAILED',
            'CSRF_VIOLATION',
            'RATE_LIMITED',
            'PATH_TRAVERSAL_BLOCKED',
            'SESSION_EXPIRED'
        ];

        eventTypes.forEach((event) => {
            test(`logs ${event} event`, () => {
                const entry = logSecurityEvent(event, LOG_LEVELS.CRITICAL, {
                    ip: '10.0.0.1',
                    reason: `${event} test`
                });
                expect(entry.event).toBe(event);
            });
        });
    });

    describe('Security edge cases', () => {
        test('handles XSS in event details', () => {
            const entry = logSecurityEvent('XSS_ATTEMPT', LOG_LEVELS.WARN, {
                ip: "<script>alert('xss')</script>",
                reason: '<img onerror=alert(1)>'
            });
            expect(entry.ip).toContain('<script>');
        });

        test('handles SQL injection in event details', () => {
            const entry = logSecurityEvent('SQL_INJECT', LOG_LEVELS.CRITICAL, {
                ip: "'; DROP TABLE logs;--",
                reason: "1' OR '1'='1"
            });
            expect(entry.ip).toContain('DROP TABLE');
        });
    });
});
