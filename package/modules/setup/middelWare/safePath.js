const path = require('path');

// Forbidden file extensions — never serve these
const FORBIDDEN_EXTENSIONS = new Set([
    '.env', '.log', '.bak', '.tmp', '.swp',
    '.key', '.pem', '.crt', '.pfx',
    '.sql', '.dump', '.sqlite',
    '.sh', '.bat', '.cmd',
    '.git', '.gitignore',
    '.npmrc', '.yarnrc'
]);

/**
 * Validates that a resolved file path is within the allowed base directory
 * and does not access forbidden file types.
 *
 * @param {string} filePath - The resolved absolute file path to validate
 * @param {string} baseDir - The allowed base directory
 * @returns {{ safe: boolean, resolved: string, reason: string }}
 */
const validatePath = (filePath, baseDir) => {
    const resolved = path.resolve(filePath);
    const resolvedBase = path.resolve(baseDir);

    // Check the resolved path stays within the base directory
    if (!resolved.startsWith(resolvedBase + path.sep) && resolved !== resolvedBase) {
        return { safe: false, resolved, reason: 'path_traversal' };
    }

    // Check for forbidden extensions
    const ext = path.extname(resolved).toLowerCase();
    if (FORBIDDEN_EXTENSIONS.has(ext)) {
        return { safe: false, resolved, reason: 'forbidden_extension' };
    }

    // Check for hidden files (dotfiles)
    const basename = path.basename(resolved);
    if (basename.startsWith('.') && basename !== '.') {
        return { safe: false, resolved, reason: 'hidden_file' };
    }

    return { safe: true, resolved, reason: null };
};

/**
 * Sanitize a URL segment by removing traversal patterns.
 * Strips ../, ..\, removes null bytes, and decodes URI components.
 *
 * @param {string} segment - The URL segment to sanitize
 * @returns {string} The sanitized segment
 */
const sanitizeSegment = (segment) => {
    // Remove null bytes
    let clean = segment.replace(/\0/g, '');

    // Decode URI to catch encoded traversal attempts (%2e%2e%2f)
    try {
        clean = decodeURIComponent(clean);
    } catch (e) {
        // Invalid encoding — return as-is
    }

    // Remove traversal patterns
    clean = clean.replace(/\.\.\//g, '');
    clean = clean.replace(/\.\.\\/g, '');

    // Remove leading slashes and dots for safety
    clean = clean.replace(/^[./\\]+/, '');

    return clean;
};

/**
 * Build a safe file path relative to a base directory.
 * Combines sanitizeSegment + validatePath.
 *
 * @param {string} baseDir - The allowed base directory
 * @param {...string} segments - The path segments (from URL parsing)
 * @returns {{ safe: boolean, filePath: string, reason: string }}
 */
const safePath = (baseDir, ...segments) => {
    const sanitized = segments.map(s => sanitizeSegment(s));
    const joined = path.join(baseDir, ...sanitized);
    const result = validatePath(joined, baseDir);
    return { safe: result.safe, filePath: result.resolved, reason: result.reason };
};

module.exports = { validatePath, sanitizeSegment, safePath };
