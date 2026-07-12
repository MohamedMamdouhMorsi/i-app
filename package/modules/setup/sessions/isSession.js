/**
 * isSession — Lightweight session existence check.
 * Phase 2: Now uses shared cookieUtils for cookie parsing.
 *
 * Returns true if:
 *   1. Session cookies present (deviceId, userId, timestamp)
 *   2. deviceId matches recomputed fingerprint hash
 *   3. User exists in routerUsers cache with valid id
 *
 * @param {object} req — HTTP request
 * @returns {boolean}
 */
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const routerUsers = require('../../utils/router/routerUsers');
const { parseSessionCookies, hasValidSessionCookies } = require('./cookieUtils');

const isSession = (req) => {
    const deviceInfo = getDeviceInfo(req);
    const fingerPrint = deviceInfo.fingerPrint;
    const cookies = parseSessionCookies(req);

    if (hasValidSessionCookies(cookies)) {
        const authSt = `${fingerPrint}-${cookies.timestamp}`;
        const cureDeviceId = creatAUTH(authSt);

        if (cookies.deviceId === cureDeviceId) {
            const chickUserData = routerUsers.get(cookies.userId);
            if (chickUserData.id && chickUserData.id > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
};

module.exports = isSession;
