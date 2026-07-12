/**
 * middleWareApp — Main middleware pipeline for all HTTP requests.
 * Phase 2: Uses shared cookieUtils for cookie extraction (was inline).
 *
 * Pipeline:
 *   1. Rate limiting (reject if exceeded)
 *   2. Session timeout check (24h max age)
 *   3. Session resolution (isSession → sessionData or sessionsControl)
 *   4. Request routing (POST: CSRF → API/router, GET: classify → serve)
 *   5. CSRF token generation on GET page routes
 */
const isSession       = require('./sessions/isSession');
const sessionsControl = require('./sessions/sessionsControl');
const sessionData     = require('./sessions/sessionData');
const { parseSessionCookies, getDestroySessionCookies } = require('./sessions/cookieUtils');
const {api}           = require('../main');
const {getfileName}   = require('../tools');
const path            = require('path');
const fs              = require('fs');
const is_api_         = require('./middelWare/is_api');
const is_app_         = require('./middelWare/is_app');
const is_asset_       = require('./middelWare/is_asset');
const is_route_       = require('./middelWare/is_route');
const app_file        = require('./middelWare/app_file');
const asset_file      = require('./middelWare/asset_file');
const route_file      = require('./middelWare/route_file');
const router          = require('../utils/router/router');
const routerData      = require('../utils/router/routerData');
const routerUsers     = require('../utils/router/routerUsers');
const routerPost      = require('../utils/router/routerPost');
const logOut          = require('../utils/orders/users/logoutUser');

// Security modules
const {rateLimitMiddleware} = require('./middelWare/rateLimit');
const {validateToken, generateToken, getTokenCookie} = require('./middelWare/csrfToken');
const {logSecurityEvent, LOG_LEVELS} = require('./middelWare/securityLog');

// Session timeout: 24 hours in milliseconds
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

const middleWareApp = async (req, res, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path]) => {

    const url = req.url;
    const is_logOut = req.url === '/logout' ? true : false;
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

    // RATE LIMITING: Check before any processing
    if (!rateLimitMiddleware(req, res)) {
        logSecurityEvent('RATE_LIMITED', LOG_LEVELS.WARN, {ip: clientIp, url});
        return;
    }

    const is_user = isSession(req);

    const appWare = async (req, res, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path], userData) => {

        req.user = userData;

        if (is_logOut) {
            res = logOut(req, res);
        }

        if (req.method === 'POST') {

            if (res.destroySession) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify({res: 'destroySession'}));
            } else {
                // CSRF VALIDATION: Check token on all POST requests
                const cookies = parseSessionCookies(req);
                const csrfHeader = req.headers['x-csrf-token'];

                if (cookies.deviceId && !validateToken(cookies.deviceId, csrfHeader)) {
                    logSecurityEvent('CSRF_VIOLATION', LOG_LEVELS.CRITICAL, {
                        ip: clientIp,
                        url,
                        userId: userData.id ? String(userData.id) : null,
                        reason: 'Invalid or missing CSRF token on POST request'
                    });
                    res.writeHead(403, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({res: 'error', message: 'CSRF token validation failed'}));
                    return;
                }

                const is_api = is_api_(url);
                if (is_api) {
                    return api(req, res, i_app_path, i_app, userDir);
                } else {
                    const userRouterPost = routerPost.match(req, res);
                    if (!userRouterPost) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
                    }
                }
            }
        } else if (req.method === 'GET') {

            // Strip query string before extracting extension (cache-busters like ?123 break extname)
            const urlPath = req.url.split("?")[0];
            const extname = path.extname(urlPath);
            const is_app = is_app_(extname);
            const is_asset = is_asset_(extname);
            const is_route = is_route_(extname);
            const fileName = getfileName(req);
            let userRouter = false;

            userRouter = await router.match(req, res);

            if (!userRouter) {
                const appData = routerData.get();
                i_app = {...i_app, ...appData};
            }

            if (req.url.match(/models/)) {
                const model = req.url.replace(/\/models\//, '');
                const filePath = path.join(__dirname, '..', 'lib', 'models', model);
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/html'});
                        res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                        return true;
                    }
                });
                return true;
            }

            // AUTO-GENERATED MANIFEST: serve in-memory manifest before file routing
            // manifest.json is generated at startup, not a file on disk.
            // Must be handled before is_app/is_asset classification since .json
            // is classified as asset (Phase 2) but manifest is not a static file.
            if (req.url === '/manifest.json') {
                const {JDS_} = require('../tools');
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JDS_(manifest));
                return;
            }

            // COUNTRY FLAGS: serve static JSON database before file routing
            if (req.url === '/countryFlags.json') {
                const flagsPath = path.join(__dirname, '..', '..', 'db', 'countryFlags.json');
                fs.readFile(flagsPath, (err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'application/json'});
                        res.end('{"error":"not found"}');
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(data);
                    }
                });
                return;
            }

            if (!userRouter) {
                // SET CSRF TOKEN: Generate and send on page routes
                if (is_route && userData.id && userData.id > 0) {
                    const cookies = parseSessionCookies(req);
                    if (cookies.deviceId) {
                        const token = generateToken(cookies.deviceId);
                        const existing = res.getHeader('Set-Cookie') || [];
                        const cookieHeaders = Array.isArray(existing) ? existing : [existing];
                        cookieHeaders.push(getTokenCookie(cookies.deviceId, token));
                        res.setHeader('Set-Cookie', cookieHeaders.filter(Boolean));
                    }
                }

                if (is_app || urlPath.includes("dev_")) {
                    return app_file(req, res, extname, fileName, manifest, tree, userDir, i_app);
                } else if (is_asset) {
                    return asset_file(req, res, userDir, swScript, userData);
                } else if (is_route) {
                    return route_file(req, res, i_app, colorPR_D, userData);
                } else {
                    res.writeHead(400, {'Content-Type': 'text/html'});
                    res.end('<h1>400 Bad Request</h1><p>Sorry, there was a problem loading the requested URL.</p>');
                }
            }
        }
    };

    if (i_app.users) {
        // SESSION TIMEOUT: Check cookie timestamp age
        const cookies = parseSessionCookies(req);
        if (cookies.timestamp) {
            const sessionAge = Date.now() - parseInt(cookies.timestamp);
            if (sessionAge > SESSION_MAX_AGE_MS) {
                logSecurityEvent('SESSION_EXPIRED', LOG_LEVELS.INFO, {ip: clientIp, url, reason: 'Session exceeded 24-hour max age'});
                res.setHeader('Set-Cookie', getDestroySessionCookies());
                res.destroySession = true;
                return appWare(req, res, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path], {id: 0, noAuth: true});
            }
        }

        if (is_user) {
            sessionData(req, res, appWare, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path]);
        } else {
            sessionsControl(req, res, appWare, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path]);
        }
    } else {
        appWare(req, res, [i_app, colorPR_D, manifest, tree, userDir, swScript, i_app_path], {id: 0, notBasic: true});
    }
};

module.exports = middleWareApp;
