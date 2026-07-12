/**
 * API Routing Tests
 * Phase 3 — Security Test Suite
 *
 * Validates is_api, is_app, and is_asset middleware classifiers.
 * See: knowledge/modules/setup/middelWare/is_api.md, is_app.md, is_asset.md
 */

const is_api = require('../../../modules/setup/middelWare/is_api');
const is_app = require('../../../modules/setup/middelWare/is_app');
const is_asset = require('../../../modules/setup/middelWare/is_asset');

// ============================================================
// 1. is_api — API route detection
// ============================================================
describe('API Routing — is_api', () => {
    describe('Valid API routes', () => {
        test('detects /api', () => {
            expect(is_api('/api')).toBe(true);
        });

        test('detects /api/ with trailing slash', () => {
            expect(is_api('/api/')).toBe(true);
        });

        test('detects /api/users (nested route)', () => {
            expect(is_api('/api/users')).toBe(true);
        });

        test('detects /api/data/query (deeply nested)', () => {
            expect(is_api('/api/data/query')).toBe(true);
        });

        test('detects /api?param=value (with query string)', () => {
            expect(is_api('/api?param=value')).toBe(true);
        });

        test('detects /api/users?id=1 (nested with query string)', () => {
            expect(is_api('/api/users?id=1')).toBe(true);
        });
    });

    describe('Non-API routes', () => {
        test('rejects /', () => {
            expect(is_api('/')).toBe(false);
        });

        test('rejects /app', () => {
            expect(is_api('/app')).toBe(false);
        });

        test('rejects /apiary (starts with /api but is not /api/)', () => {
            expect(is_api('/apiary')).toBe(false);
        });

        test('rejects /public/api', () => {
            expect(is_api('/public/api')).toBe(false);
        });

        test('rejects /apikeys', () => {
            expect(is_api('/apikeys')).toBe(false);
        });

        test('rejects empty string', () => {
            expect(is_api('')).toBe(false);
        });
    });

    describe('Edge cases and security', () => {
        test('handles URL-encoded /api', () => {
            expect(is_api('/api%2fusers')).toBe(false);
        });

        test('handles double slashes', () => {
            expect(is_api('//api')).toBe(false);
        });

        test('case sensitivity: /API rejected', () => {
            expect(is_api('/API')).toBe(false);
        });

        test('handles traversal in API path', () => {
            expect(is_api('/api/../secret')).toBe(true);
        });
    });
});

// ============================================================
// 2. is_app — Template file detection
// ============================================================
describe('API Routing — is_app', () => {
    describe('Template files', () => {
        test('.app is a template', () => {
            expect(is_app('.app')).toBe(true);
        });
    });

    describe('Non-template files', () => {
        test('.json is NOT a template (Phase 2 fix)', () => {
            expect(is_app('.json')).toBe(false);
        });

        test('.html is NOT a template', () => {
            expect(is_app('.html')).toBe(false);
        });

        test('.js is NOT a template', () => {
            expect(is_app('.js')).toBe(false);
        });

        test('.css is NOT a template', () => {
            expect(is_app('.css')).toBe(false);
        });

        test('empty string is NOT a template', () => {
            expect(is_app('')).toBe(false);
        });

        test('.APP (uppercase) is NOT a template', () => {
            expect(is_app('.APP')).toBe(false);
        });
    });
});

// ============================================================
// 3. is_asset — Static asset detection (whitelist-based)
// ============================================================
describe('API Routing — is_asset', () => {
    describe('Allowed asset extensions', () => {
        const allowed = [
            '.css', '.js', '.mjs',
            '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif', '.bmp',
            '.woff', '.woff2', '.ttf', '.eot', '.otf',
            '.pdf', '.txt',
            '.mp3', '.mp4', '.ogg', '.webm', '.wav',
            '.json', '.xml', '.csv',
            '.glb', '.gltf', '.hdr', '.obj', '.mtl', '.fbx',
            '.html', '.htm', '.map', '.webmanifest',
            '.zip', '.gz'
        ];

        allowed.forEach((ext) => {
            test(`allows ${ext}`, () => {
                expect(is_asset(ext)).toBe(true);
            });
        });
    });

    describe('Blocked / unknown extensions (whitelist rejects)', () => {
        const blocked = [
            '.env', '.log', '.bak', '.sql', '.sh', '.bat',
            '.pem', '.key', '.crt', '.pfx',
            '.exe', '.dll', '.so',
            '.php', '.py', '.rb',
            '.conf', '.ini', '.cfg',
            '.tmp', '.swp'
        ];

        blocked.forEach((ext) => {
            test(`blocks ${ext}`, () => {
                expect(is_asset(ext)).toBe(false);
            });
        });
    });

    describe('Edge cases', () => {
        test('handles empty string', () => {
            expect(is_asset('')).toBe(false);
        });

        test('handles null/undefined', () => {
            expect(is_asset(null)).toBe(false);
            expect(is_asset(undefined)).toBe(false);
        });

        test('case insensitive: .CSS accepted', () => {
            expect(is_asset('.CSS')).toBe(true);
        });

        test('case insensitive: .JS accepted', () => {
            expect(is_asset('.JS')).toBe(true);
        });

        test('case insensitive: .JSON accepted', () => {
            expect(is_asset('.JSON')).toBe(true);
        });

        test('.app extension is NOT an asset', () => {
            expect(is_asset('.app')).toBe(false);
        });
    });
});
