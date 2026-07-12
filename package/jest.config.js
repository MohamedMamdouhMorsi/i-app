/**
 * Jest configuration for i-app framework testing.
 * Phase 3: Testing Infrastructure
 */
module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: [
        '**/*.test.js'
    ],
    collectCoverageFrom: [
        'modules/**/*.js',
        '!modules/**/node_modules/**',
        '!**/knowledge/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'text-summary', 'lcov'],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    verbose: true,
    testTimeout: 10000,
    // Prevent setInterval cleanup timers from keeping Jest open
    forceExit: true,
    // Detect open handles (timers from rateLimit, csrfToken)
    detectOpenHandles: false
};
