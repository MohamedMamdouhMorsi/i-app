/**
 * Path Traversal Protection Tests
 * Phase 3 — Security Test Suite
 *
 * Validates safePath module prevents directory traversal,
 * forbidden file access, and hidden file access.
 * See: knowledge/modules/setup/middelWare/safePath.md
 *
 * KEY BEHAVIOR: sanitizeSegment strips leading dots/slashes,
 * so dotfiles like '.env' become 'env' (safe, but not the original file).
 * validatePath (called with full paths) detects dotfiles by basename.
 * safePath (sanitize+validate) prevents access by stripping, not blocking.
 */

const path = require('path');
const { validatePath, sanitizeSegment, safePath } = require('../../modules/setup/middelWare/safePath');
const payloads = require('../fixtures/malicious-payloads.json');

const BASE_DIR = '/home/user/project/public';

// ============================================================
// 1. sanitizeSegment — URL segment sanitization
// ============================================================
describe('Path Traversal — sanitizeSegment', () => {
    test('strips ../ traversal', () => {
        expect(sanitizeSegment('../../../etc/passwd')).not.toContain('../');
    });

    test('strips ..\\ traversal (Windows)', () => {
        expect(sanitizeSegment('..\\..\\..\\windows')).not.toContain('..\\');
    });

    test('decodes %2e%2e%2f encoded traversal', () => {
        const sanitized = sanitizeSegment('%2e%2e%2f%2e%2e%2fetc%2fpasswd');
        expect(sanitized).not.toContain('..');
    });

    test('removes null bytes', () => {
        expect(sanitizeSegment('file\x00.txt')).not.toContain('\x00');
    });

    test('removes leading dots and slashes', () => {
        const sanitized = sanitizeSegment('../../secret');
        expect(sanitized).not.toMatch(/^\./);
        expect(sanitized).not.toMatch(/^\//);
    });

    test('preserves safe filenames', () => {
        expect(sanitizeSegment('style.css')).toBe('style.css');
        expect(sanitizeSegment('app.js')).toBe('app.js');
        expect(sanitizeSegment('image.png')).toBe('image.png');
    });

    test('handles empty string', () => {
        expect(sanitizeSegment('')).toBe('');
    });

    test('handles deeply nested traversal', () => {
        const deep = '../'.repeat(20) + 'etc/passwd';
        const sanitized = sanitizeSegment(deep);
        expect(sanitized).not.toContain('..');
    });

    test('strips leading dot from dotfiles (.env → env)', () => {
        const sanitized = sanitizeSegment('.env');
        expect(sanitized).toBe('env');
    });

    test('strips leading dot from .git', () => {
        const sanitized = sanitizeSegment('.git');
        expect(sanitized).toBe('git');
    });

    test('strips leading dot from .npmrc', () => {
        const sanitized = sanitizeSegment('.npmrc');
        expect(sanitized).toBe('npmrc');
    });
});

// ============================================================
// 2. validatePath — Path validation against base directory
// ============================================================
describe('Path Traversal — validatePath', () => {
    describe('Traversal attacks', () => {
        test('blocks path outside base directory', () => {
            const result = validatePath('/etc/passwd', BASE_DIR);
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('path_traversal');
        });

        test('blocks resolved traversal path', () => {
            const traversed = path.resolve(BASE_DIR, '../../../etc/passwd');
            const result = validatePath(traversed, BASE_DIR);
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('path_traversal');
        });

        test('allows path within base directory', () => {
            const validPath = path.join(BASE_DIR, 'css', 'style.css');
            const result = validatePath(validPath, BASE_DIR);
            expect(result.safe).toBe(true);
            expect(result.reason).toBeNull();
        });

        test('blocks path exactly at base dir parent', () => {
            const parentDir = path.dirname(BASE_DIR);
            const result = validatePath(parentDir, BASE_DIR);
            expect(result.safe).toBe(false);
        });
    });

    describe('Forbidden extensions', () => {
        const forbidden = [
            '.env', '.log', '.bak', '.tmp', '.swp',
            '.key', '.pem', '.crt', '.pfx',
            '.sql', '.dump', '.sqlite',
            '.sh', '.bat', '.cmd',
            '.git', '.gitignore',
            '.npmrc', '.yarnrc'
        ];

        forbidden.forEach((ext) => {
            test(`blocks ${ext} files`, () => {
                const filePath = path.join(BASE_DIR, `config${ext}`);
                const result = validatePath(filePath, BASE_DIR);
                expect(result.safe).toBe(false);
                expect(result.reason).toBe('forbidden_extension');
            });
        });
    });

    describe('Hidden files (dotfiles)', () => {
        test('blocks .htaccess', () => {
            const result = validatePath(path.join(BASE_DIR, '.htaccess'), BASE_DIR);
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('hidden_file');
        });

        test('blocks .DS_Store', () => {
            const result = validatePath(path.join(BASE_DIR, '.DS_Store'), BASE_DIR);
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('hidden_file');
        });

        test('blocks .config', () => {
            const result = validatePath(path.join(BASE_DIR, '.config'), BASE_DIR);
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('hidden_file');
        });

        test('blocks .env directly (forbidden ext + dotfile)', () => {
            const result = validatePath(path.join(BASE_DIR, '.env'), BASE_DIR);
            expect(result.safe).toBe(false);
            // .env has extension '.env' which is forbidden — caught before dotfile check
        });

        test('blocks .npmrc directly (forbidden ext)', () => {
            const result = validatePath(path.join(BASE_DIR, '.npmrc'), BASE_DIR);
            expect(result.safe).toBe(false);
        });

        test('validatePath checks basename only (not parent dirs)', () => {
            // path.join(BASE_DIR, '.git', 'config') → basename is 'config'
            // validatePath does NOT scan intermediate directory names for dots
            const result = validatePath(path.join(BASE_DIR, '.git', 'config'), BASE_DIR);
            expect(result.safe).toBe(true); // 'config' has no forbidden ext and is not a dotfile
        });
    });

    describe('Allowed files', () => {
        const allowed = [
            'index.html', 'style.css', 'app.js', 'image.png',
            'font.woff2', 'data.json', 'manifest.webmanifest'
        ];

        allowed.forEach((file) => {
            test(`allows ${file}`, () => {
                const result = validatePath(path.join(BASE_DIR, file), BASE_DIR);
                expect(result.safe).toBe(true);
            });
        });
    });
});

// ============================================================
// 3. safePath — Full path safety check (sanitize + validate)
// ============================================================
describe('Path Traversal — safePath (combined)', () => {
    describe('Traversal payloads from fixtures', () => {
        payloads.pathTraversal.forEach((payload) => {
            test(`blocks traversal: ${payload.substring(0, 40)}`, () => {
                const result = safePath(BASE_DIR, payload);
                // Safe path should either resolve to within BASE_DIR or be blocked
                if (!result.safe) {
                    expect(['path_traversal', 'forbidden_extension', 'hidden_file']).toContain(result.reason);
                } else {
                    // If considered safe, the resolved path must be within BASE_DIR
                    expect(result.filePath.startsWith(path.resolve(BASE_DIR))).toBe(true);
                }
            });
        });
    });

    describe('Forbidden file payloads from fixtures', () => {
        // Dotfiles: sanitizeSegment strips leading dot → safe (different file served)
        const dotFiles = payloads.forbiddenFiles.filter(f => f.startsWith('.'));
        dotFiles.forEach((file) => {
            test(`sanitizes dotfile: ${file} (dot stripped → safe path)`, () => {
                const result = safePath(BASE_DIR, file);
                // After sanitization, the leading dot is stripped
                if (result.safe) {
                    expect(result.filePath.startsWith(path.resolve(BASE_DIR))).toBe(true);
                    // Verify the dot was stripped — basename should NOT start with '.'
                    const basename = path.basename(result.filePath);
                    expect(basename.startsWith('.')).toBe(false);
                }
            });
        });

        // Non-dot forbidden files (config.log, database.sql, etc.) are blocked by extension
        const nonDotForbidden = payloads.forbiddenFiles.filter(f => !f.startsWith('.') && !f.includes('/'));
        nonDotForbidden.forEach((file) => {
            test(`blocks forbidden file: ${file}`, () => {
                const result = safePath(BASE_DIR, file);
                expect(result.safe).toBe(false);
                expect(result.reason).toBe('forbidden_extension');
            });
        });
    });

    describe('Multiple segments', () => {
        test('joins multiple safe segments', () => {
            const result = safePath(BASE_DIR, 'css', 'style.css');
            expect(result.safe).toBe(true);
            expect(result.filePath).toBe(path.resolve(BASE_DIR, 'css', 'style.css'));
        });

        test('blocks traversal in middle segment', () => {
            const result = safePath(BASE_DIR, 'css', '../../etc/passwd');
            // After sanitization, '../' should be stripped
            if (result.safe) {
                expect(result.filePath.startsWith(path.resolve(BASE_DIR))).toBe(true);
            }
        });
    });

    describe('Real-world attack scenarios', () => {
        test('neutralizes /etc/passwd via URL-encoded traversal', () => {
            const result = safePath(BASE_DIR, '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd');
            // After decoding and stripping traversal, resolves within base dir
            if (result.safe) {
                expect(result.filePath.startsWith(path.resolve(BASE_DIR))).toBe(true);
            } else {
                expect(result.reason).toBeDefined();
            }
        });

        test('sanitizes .env (dot stripped → serves "env" not ".env")', () => {
            const result = safePath(BASE_DIR, '.env');
            // sanitizeSegment('.env') → 'env' (dot stripped)
            // The actual .env file is NEVER accessed
            expect(result.filePath).toBe(path.resolve(BASE_DIR, 'env'));
            expect(result.safe).toBe(true);
        });

        test('sanitizes nested .env (dot stripped in each segment)', () => {
            const result = safePath(BASE_DIR, 'config', '.env');
            // 'config' passes through, '.env' → 'env'
            expect(result.filePath).toBe(path.resolve(BASE_DIR, 'config', 'env'));
            expect(result.safe).toBe(true);
        });

        test('sanitizes .git directory access (dot stripped)', () => {
            const result = safePath(BASE_DIR, '.git', 'config');
            // '.git' → 'git', 'config' passes through
            expect(result.filePath).toBe(path.resolve(BASE_DIR, 'git', 'config'));
            expect(result.safe).toBe(true);
        });

        test('validatePath blocks dotfiles when basename starts with dot', () => {
            // Direct dotfile access (no sanitization) is blocked
            const envResult = validatePath(path.join(BASE_DIR, '.env'), BASE_DIR);
            expect(envResult.safe).toBe(false);

            const htResult = validatePath(path.join(BASE_DIR, '.htaccess'), BASE_DIR);
            expect(htResult.safe).toBe(false);
        });

        test('allows legitimate nested asset', () => {
            const result = safePath(BASE_DIR, 'js', 'WEBGL', 'GLTFLoader.js');
            expect(result.safe).toBe(true);
        });

        test('allows root-level CSS file', () => {
            const result = safePath(BASE_DIR, 'i-app.css');
            expect(result.safe).toBe(true);
        });

        test('blocks .log file extension', () => {
            const result = safePath(BASE_DIR, 'error.log');
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('forbidden_extension');
        });

        test('blocks .sql file extension', () => {
            const result = safePath(BASE_DIR, 'backup.sql');
            expect(result.safe).toBe(false);
            expect(result.reason).toBe('forbidden_extension');
        });
    });
});
