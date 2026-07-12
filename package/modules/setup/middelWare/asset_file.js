const path = require('path');
const fs = require('fs');
const {getContentType} = require('../../main');
const {validatePath, sanitizeSegment} = require('./safePath');

const PACKAGE_ROOT = path.resolve(__dirname, '..', '..', '..');

const asset_file = (req, res, userDir, swScript, userData) => {
    let filePath = null;
    let backBody = null;
    let contentType = null;
    let isUiJs = false;

    if (req.url === '/sw.js') {
        contentType = 'text/javascript';
        backBody = swScript;
    } else if (req.url.match(/\/img\/flags\//)) {
        const img = sanitizeSegment(req.url.replace(/\/img\/flags\//, ''));
        filePath = path.join(PACKAGE_ROOT, 'img', 'flags', img);
    } else if (req.url.match(/\/img\/install\//)) {
        const img = sanitizeSegment(req.url.replace(/\/img\/install\//, ''));
        filePath = path.join(PACKAGE_ROOT, 'img', 'install', img);
    } else if (req.url === '/img/user.jpg') {
        filePath = path.join(PACKAGE_ROOT, 'img', 'user.jpg');
    } else if (req.url === '/three.js') {
        filePath = path.join(PACKAGE_ROOT, 'js', 'WEBGL', 'three.module.js');
    } else if (req.url.match(/\/server.js/)) {
        filePath = path.join(PACKAGE_ROOT, 'js', 'server.js');
    } else if (req.url.match(/\/firebase.mjs/)) {
        filePath = path.join(PACKAGE_ROOT, 'js', 'firebase.mjs');
    } else if (req.url.match(/\/WEBGL\//)) {
        const file = sanitizeSegment(req.url.replace(/\/WEBGL\//, ''));
        filePath = path.join(PACKAGE_ROOT, 'js', 'WEBGL', file);
    } else if (req.url === '/i-app-ui.js') {
        filePath = path.join(PACKAGE_ROOT, 'i-app-ui.js');
        isUiJs = true;
    } else if (req.url === '/i-app-ui.min.js') {
        filePath = path.join(PACKAGE_ROOT, 'i-app-ui.min.js');
        isUiJs = true;
    } else if (req.url === '/icofont.css') {
        filePath = path.join(PACKAGE_ROOT, 'css', 'icofont.css');
    } else if (req.url === '/app.png') {
        filePath = path.join(PACKAGE_ROOT, 'img', 'app.png');
    } else if (req.url === '/i-app-basic.css') {
        filePath = path.join(PACKAGE_ROOT, 'css', 'i-app-basic.css');
    } else if (req.url === '/i-app-basic.min.css') {
        filePath = path.join(PACKAGE_ROOT, 'css', 'i-app-basic.min.css');
    } else if (req.url === '/face-api.min.js') {
        filePath = path.join(PACKAGE_ROOT, 'lib', 'face-api.min.js');
    } else {
        let lastUrl = req.url;
        const urlArr = req.url.split('?');

        if (urlArr.length > 1) {
            lastUrl = urlArr[0];
        }

        if (filePath == null && backBody == null) {
            filePath = path.join(userDir, 'public', sanitizeSegment(lastUrl));
        }
    }

    // PATH TRAVERSAL PROTECTION: validate all dynamic paths
    if (filePath !== null) {
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
    }

    if (filePath !== null) {
        const extname = path.extname(filePath);
        contentType = getContentType(extname);

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
                        if (isUiJs) {
                            const userDataSt = `const userData = ${JSON.stringify(userData)};`;
                            const regex = /const userData = {};/g;
                            data = data.toString().replace(regex, userDataSt);
                        }
                        res.writeHead(200, {'Content-Type': contentType});
                        res.end(data);
                    }
                });
            }
        });
    } else {
        if (backBody !== null) {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(backBody);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
        }
    }
};

module.exports = asset_file;
