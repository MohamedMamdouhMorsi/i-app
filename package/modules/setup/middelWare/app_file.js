const {searchFiles, getContentType, iAppReader} = require('../../main');
const iAppReadSave = require('../../utils/toolsFN/iAppReadSave');
const {JDS_} = require('../../tools');
const path = require('path');
const fs = require('fs');
const {validatePath, sanitizeSegment} = require('./safePath');

const PACKAGE_ROOT = path.resolve(__dirname, '..', '..', '..');

const isUrlFilleApp = (url) => {
    const urlArr = url.split('.app');
    if (urlArr.length > 1) {
        return true;
    }
    return false;
};

const isUrlDevApp = (url) => {
    const urlArr = url.split('dev_');
    if (urlArr.length > 1) {
        return true;
    }
    return false;
};

const app_file = (req, res, ext, fileName, manifest, tree, userDir, i_app) => {
    let backBody = null;
    let filePath = null;
    let isApp = isUrlFilleApp(req.url);
    let isJson = false;
    let isDevUrl = isUrlDevApp(req.url);

    if (isDevUrl) {
        const dev_ = req.url.split('/');
        let fileNamedev = sanitizeSegment(dev_[dev_.length - 1]);
        // Validate dev element filename: must start with dev_ and end with .app or .json
        if (/^dev_[\w]+\.(app|json)$/.test(fileNamedev)) {
            filePath = path.join(PACKAGE_ROOT, 'elements', fileNamedev);
            if (fileNamedev.endsWith('.json')) {
                isJson = true;
            }
        }
        isApp = true;
    } else if (req.url.match(/models/)) {
        const model = sanitizeSegment(req.url.replace(/\/models\//, ''));
        filePath = path.join(PACKAGE_ROOT, 'lib', 'models', model);

        // PATH TRAVERSAL CHECK for models
        const modelsBase = path.join(PACKAGE_ROOT, 'lib', 'models');
        const modelPathCheck = validatePath(filePath, modelsBase);
        if (!modelPathCheck.safe) {
            console.error(`[SECURITY] Path traversal blocked (models): ${req.url} (${modelPathCheck.reason})`);
            res.writeHead(403, {'Content-Type': 'text/html'});
            res.end('<h1>403 Forbidden</h1>');
            return true;
        }
        filePath = modelPathCheck.resolved;

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
                return true;
            }
        });
        return true;
    } else if (req.url === '/countryFlags.json') {
        filePath = path.join(PACKAGE_ROOT, 'db', 'countryFlags.json');
        isApp = true;
    } else if (req.url === '/manifest.json') {
        backBody = JDS_(manifest);
        isApp = true;
    } else if (backBody == null && req.url === '/i.app') {
        backBody = JSON.stringify(i_app);
        isApp = true;
    } else {
        if (req.url === '/limitAuto.app') {
            filePath = path.join(PACKAGE_ROOT, 'elements', 'limitAuto.app');
            isApp = true;
        } else if (req.url === '/sl.app') {
            filePath = path.join(PACKAGE_ROOT, 'elements', 'sl.app');
            isApp = true;
        } else if (req.url === i_app.dir.src + 'dev.app' && i_app.mode === 'dev') {
            filePath = path.join(PACKAGE_ROOT, 'elements', 'dev.app');
            isApp = true;
        } else {
            if (filePath == null && backBody == null && ext === '.app') {
                filePath = path.join(userDir, 'public', sanitizeSegment(req.url));
                isApp = true;
            } else if (filePath == null && backBody == null && ext === '.json') {
                isJson = true;
                filePath = path.join(userDir, 'public', sanitizeSegment(req.url));
            }
        }
    }

    // PATH TRAVERSAL PROTECTION: validate all dynamic file paths
    if (backBody == null && filePath !== null) {
        const allowedBase = filePath.startsWith(path.resolve(userDir))
            ? path.resolve(userDir, 'public')
            : PACKAGE_ROOT;

        const pathCheck = validatePath(filePath, allowedBase);
        if (!pathCheck.safe) {
            console.error(`[SECURITY] Path traversal blocked: ${req.url} -> ${filePath} (${pathCheck.reason})`);
            res.writeHead(403, {'Content-Type': 'text/html'});
            res.end('<h1>403 Forbidden</h1>');
            return;
        }
        filePath = pathCheck.resolved;

        const extname = path.extname(filePath);
        const contentType = getContentType(extname);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
            } else {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/html'});
                        res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
                    } else {
                        const appData = iAppReadSave(data.toString(), req.url, i_app.dir.src);

                        if (isJson) {
                            res.writeHead(200, {'Content-Type': contentType});
                            res.end(data);
                        } else if (appData.page || isApp) {
                            res.writeHead(200, {'Content-Type': contentType});
                            res.end(appData);
                        } else {
                            res.writeHead(400, {'Content-Type': 'text/html'});
                            res.end('<h1>400 Bad Request</h1><p>Sorry, there was a problem loading the requested URL.</p>');
                        }
                    }
                });
            }
        });
    } else {
        if (backBody !== null) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(backBody);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
        }
    }
};

module.exports = app_file;
