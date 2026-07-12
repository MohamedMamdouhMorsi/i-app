/**
 * is_asset — Classify a request extension as a static asset.
 * Phase 2: Changed from blacklist to whitelist approach.
 *
 * Previously: everything except .app and .json → asset (SECURITY RISK: .env, .log served)
 * Now: only known safe extensions are treated as assets.
 * .json now served as data asset (was incorrectly treated as template in is_app).
 *
 * @param {string} ext — File extension from path.extname() (e.g., '.js', '.css')
 * @returns {boolean}
 */
const ASSET_EXTENSIONS = new Set([
    // Styles
    '.css',
    // Scripts
    '.js', '.mjs',
    // Images
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif', '.bmp',
    // Fonts
    '.woff', '.woff2', '.ttf', '.eot', '.otf',
    // Documents
    '.pdf', '.txt',
    // Media
    '.mp3', '.mp4', '.ogg', '.webm', '.wav',
    // Data (including .json — moved from is_app template classification)
    '.json', '.xml', '.csv',
    // 3D / WebGL
    '.glb', '.gltf', '.hdr', '.obj', '.mtl', '.fbx',
    // Web
    '.html', '.htm', '.map', '.webmanifest',
    // Archives
    '.zip', '.gz'
]);

const is_asset = (ext) => {
    if (!ext || ext === '') return false;
    return ASSET_EXTENSIONS.has(ext.toLowerCase());
};

module.exports = is_asset;
