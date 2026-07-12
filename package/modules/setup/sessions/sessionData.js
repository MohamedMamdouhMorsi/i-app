/**
 * sessionData — Session data loader for authenticated requests.
 * Phase 2: Uses shared cookieUtils for cookie parsing and session destruction.
 *
 * Called when isSession() returns true (user already cached in routerUsers).
 * Validates fingerprint, checks deviceToken match, and passes userData to app handler.
 *
 * @param {object} req — HTTP request
 * @param {object} res — HTTP response
 * @param {function} app — Next handler: app(req, res, data, userData)
 * @param {Array} data — App configuration array
 */
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const routerUsers = require('../../utils/router/routerUsers');
const { parseSessionCookies, hasValidSessionCookies, destroySession } = require('./cookieUtils');

const sessionData = async (req, res, app, data) => {
    let userData = { id: 0 };

    const deviceInfo = getDeviceInfo(req);
    const fingerPrint = deviceInfo.fingerPrint;
    const cookies = parseSessionCookies(req);

    if (hasValidSessionCookies(cookies)) {
        const authSt = `${fingerPrint}-${cookies.timestamp}`;
        const cureDeviceId = creatAUTH(authSt);

        if (cookies.deviceId === cureDeviceId) {
            const chickUserData = routerUsers.get(cookies.userId);

            if (chickUserData.id && chickUserData.id > 0) {
                if (chickUserData.deviceToken && cureDeviceId === chickUserData.deviceToken) {
                    userData = chickUserData;
                    req.user = userData;
                    app(req, res, data, userData);
                } else {
                    userData.notSecure = true;
                    destroySession(res);
                    app(req, res, data, userData);
                }
            } else {
                // User exists in cache but no deviceToken — treat as cached session
                userData = chickUserData;
                req.user = userData;
                app(req, res, data, userData);
            }
        } else {
            userData.notSecure = true;
            destroySession(res);
            app(req, res, data, userData);
        }
    } else {
        userData.noAuth = true;
        app(req, res, data, userData);
    }
};

module.exports = sessionData;
