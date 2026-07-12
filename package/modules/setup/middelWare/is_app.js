/**
 * is_app — Classify a request extension as an i-app template.
 * Phase 2: Only .app files are now templates. .json files handled as assets.
 *
 * Previously: both .app AND .json → template (security concern: all JSON treated as templates)
 * Now: only .app → template
 *
 * NOTE: Static JSON databases (countries.json, icons.json, etc.) are served
 * via the orders API, not as raw files. If .json template rendering is needed
 * for specific element config files (dev_colors.json, dev_style.json), those
 * are loaded internally by the core engine, not via HTTP file serving.
 *
 * @param {string} ext — File extension from path.extname()
 * @returns {boolean}
 */
const is_app = (ext) => {
    if (ext === '.app') {
        return true;
    }
    return false;
};

module.exports = is_app;
