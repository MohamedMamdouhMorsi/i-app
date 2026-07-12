/**
 * Template Rendering Integration Tests
 * Phase 3.3 — Integration Test Suite
 *
 * Tests the template rendering pipeline:
 *   createAppHead (HTML generation) + route_file (page serving)
 *   + app_file (.app template serving) + asset_file (static file serving)
 *
 * Validates that the rendering chain produces correct HTML,
 * handles different configurations, and integrates with security layers.
 */

const createAppHead = require('../../modules/utils/toolsFN/createAppHead');
const { validatePath, sanitizeSegment } = require('../../modules/setup/middelWare/safePath');
const is_app_ = require('../../modules/setup/middelWare/is_app');
const is_asset_ = require('../../modules/setup/middelWare/is_asset');
const is_route_ = require('../../modules/setup/middelWare/is_route');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '..', '..');

// ============================================================
// 1. createAppHead HTML Generation
// ============================================================
describe('Template Rendering — createAppHead', () => {

    test('generates valid HTML document', () => {
        const app = {
            title: 'Test App',
            description: 'Test description',
            domain: 'https://test.com',
            keywords: 'test,app',
            mode: 'dev',
            dir: { icon: '/img/' }
        };
        const html = createAppHead(app, '#333');

        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('<html');
        expect(html).toContain('<head>');
        expect(html).toContain('</head>');
        expect(html).toContain('<body>');
        expect(html).toContain('</html>');
    });

    test('includes app title in HTML', () => {
        const app = { title: 'My Application', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('<title>My Application</title>');
    });

    test('includes meta description', () => {
        const app = { title: 'App', description: 'This is a test app', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('content="This is a test app"');
    });

    test('sets theme color from PR_D', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#FF5733');
        expect(html).toContain('content="#FF5733"');
    });

    test('uses dev mode scripts (non-minified)', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('/i-app-ui.js');
        expect(html).toContain('/i-app-basic.css');
    });

    test('uses production mode scripts (minified)', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'prod', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('/i-app-ui.min.js');
        expect(html).toContain('/i-app-basic.min.css');
    });

    test('sets LTR direction for English', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, defLang: 'en' };
        const html = createAppHead(app, '#000');
        expect(html).toContain('dir="ltr"');
        expect(html).toContain('lang="en"');
    });

    test('sets RTL direction for Arabic', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, defLang: 'ar' };
        const html = createAppHead(app, '#000');
        expect(html).toContain('dir="rtl"');
        expect(html).toContain('lang="ar"');
    });

    test('sets RTL for Hebrew', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, defLang: 'he' };
        const html = createAppHead(app, '#000');
        expect(html).toContain('dir="rtl"');
    });

    test('includes manifest link', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('href="/manifest.json"');
    });

    test('includes structured data JSON-LD', () => {
        const app = { title: 'Test App', description: 'Desc', domain: 'https://test.com', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@context":"https://schema.org"');
        expect(html).toContain('"name":"Test App"');
    });

    test('dev mode sets noindex robots', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('noindex, nofollow');
    });

    test('production mode sets index robots', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'prod', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('index, follow');
    });

    test('includes image overlay when imgSrc set', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, imgSrc: '/img/splash.png' };
        const html = createAppHead(app, '#000');
        expect(html).toContain('src="/img/splash.png"');
        expect(html).toContain('generalHolderImg');
    });

    test('no image overlay when imgSrc not set', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).not.toContain('generalHolderImg');
    });

    test('includes appData in script for client-side initialization', () => {
        const app = { title: 'ClientInit', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('const appData = ');
        expect(html).toContain('"title":"ClientInit"');
    });

    test('includes Face API script when enabled', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, faceapi: true };
        const html = createAppHead(app, '#000');
        expect(html).toContain('face-api.min.js');
    });

    test('includes Three.js import map when enabled', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, three: true };
        const html = createAppHead(app, '#000');
        expect(html).toContain('importmap');
        expect(html).toContain('three');
    });

    test('includes Open Graph meta tags', () => {
        const app = { title: 'OG App', description: 'OG Desc', domain: 'https://og.com', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('og:title');
        expect(html).toContain('OG App');
        expect(html).toContain('og:description');
    });

    test('includes Twitter card meta tags', () => {
        const app = { title: 'Twitter App', description: 'Twitter Desc', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('twitter:card');
        expect(html).toContain('twitter:title');
    });

    test('default language falls back to en', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#000');
        expect(html).toContain('lang="en"');
    });

    test('uses first language from lang array if defLang not set', () => {
        const app = { title: 'App', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, lang: ['fr', 'en'] };
        const html = createAppHead(app, '#000');
        expect(html).toContain('lang="fr"');
        expect(html).toContain('dir="ltr"');
    });
});

// ============================================================
// 2. File Type Classification for Rendering
// ============================================================
describe('Template Rendering — File Type Classification', () => {

    test('.app files routed to app_file handler', () => {
        expect(is_app_('.app')).toBe(true);
    });

    test('.css files routed to asset handler', () => {
        expect(is_asset_('.css')).toBe(true);
    });

    test('.js files routed to asset handler', () => {
        expect(is_asset_('.js')).toBe(true);
    });

    test('empty extension routed to route handler (page)', () => {
        expect(is_route_('')).toBe(true);
    });

    test('rendering pipeline: route → createAppHead → HTML response', () => {
        // This simulates what route_file does
        const app = { title: 'Route Test', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' } };
        const html = createAppHead(app, '#333');
        // route_file sends this as response
        expect(typeof html).toBe('string');
        expect(html.length).toBeGreaterThan(100);
        expect(html).toContain('<!DOCTYPE html>');
    });
});

// ============================================================
// 3. Safe Path Integration with File Serving
// ============================================================
describe('Template Rendering — Safe Path in File Serving', () => {

    test('normal .app file path validates safely', () => {
        const filePath = path.join(PACKAGE_ROOT, 'elements', 'dev.app');
        const result = validatePath(filePath, path.join(PACKAGE_ROOT, 'elements'));
        expect(result.safe).toBe(true);
    });

    test('traversal attempt in .app path is blocked', () => {
        const filePath = path.join(PACKAGE_ROOT, 'elements', '..', '..', 'etc', 'passwd');
        const result = validatePath(filePath, path.join(PACKAGE_ROOT, 'elements'));
        expect(result.safe).toBe(false);
    });

    test('hidden file access blocked', () => {
        const filePath = path.join(PACKAGE_ROOT, 'elements', '.env');
        const result = validatePath(filePath, path.join(PACKAGE_ROOT, 'elements'));
        expect(result.safe).toBe(false);
    });

    test('sanitizeSegment removes traversal characters', () => {
        expect(sanitizeSegment('../etc/passwd')).not.toContain('..');
        expect(sanitizeSegment('normal-file.app')).toBe('normal-file.app');
    });

    test('asset paths for allowed extensions validate', () => {
        const allowedFiles = ['style.css', 'app.js', 'logo.png', 'font.woff2'];
        const baseDir = '/tmp/test-app';

        for (const file of allowedFiles) {
            const filePath = path.join(baseDir, file);
            const result = validatePath(filePath, baseDir);
            expect(result.safe).toBe(true);
        }
    });

    test('forbidden extension assets blocked', () => {
        const forbiddenFiles = ['.env', 'data.sql', 'key.pem', 'backup.bak', 'deploy.sh'];
        const baseDir = '/tmp/test-app';

        for (const file of forbiddenFiles) {
            const filePath = path.join(baseDir, file);
            const result = validatePath(filePath, baseDir);
            expect(result.safe).toBe(false);
        }
    });
});

// ============================================================
// 4. XSS Prevention in Template Rendering
// ============================================================
describe('Template Rendering — XSS Prevention', () => {

    test('app title with HTML tags is included as-is (server-generated)', () => {
        // Note: createAppHead does NOT escape HTML in title/description.
        // XSS prevention relies on app config being trusted (server-side only).
        // This test documents the current behavior.
        const app = {
            title: '<script>alert("xss")</script>',
            description: '',
            domain: '',
            keywords: '',
            mode: 'dev',
            dir: { icon: '/' }
        };
        const html = createAppHead(app, '#000');
        // Current behavior: no escaping (config is trusted)
        expect(html).toContain('<title><script>alert("xss")</script></title>');
    });

    test('appData JSON serialization handles special characters', () => {
        const app = {
            title: 'Test "Quotes" & <Tags>',
            description: "It's a test",
            domain: '',
            keywords: '',
            mode: 'dev',
            dir: { icon: '/' }
        };
        const html = createAppHead(app, '#000');
        // JSON.stringify escapes quotes correctly
        expect(html).toContain('const appData = ');
        // Should not break the script tag
        expect(html).toContain('"title":"Test \\"Quotes\\" & <Tags>"');
    });
});

// ============================================================
// 5. Configuration Variants
// ============================================================
describe('Template Rendering — Config Variants', () => {

    test('minimal config produces valid HTML', () => {
        const app = { title: '', description: '', domain: '', keywords: '', dir: { icon: '/' } };
        const html = createAppHead(app, '');
        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('</html>');
    });

    test('FCM enabled includes Firebase script', () => {
        const app = { title: '', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, fcm: true };
        const html = createAppHead(app, '#000');
        expect(html).toContain('firebase');
    });

    test('custom type in Open Graph', () => {
        const app = { title: '', description: '', domain: '', keywords: '', mode: 'dev', dir: { icon: '/' }, type: 'article' };
        const html = createAppHead(app, '#000');
        expect(html).toContain('content="article"');
    });
});
