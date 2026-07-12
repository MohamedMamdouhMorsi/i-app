/**
 * sessionsControl — Full session controller with DB validation.
 * Phase 2: Uses shared cookieUtils for cookie parsing and session destruction.
 *
 * Called when isSession() returns false (user not yet cached).
 * Validates fingerprint → queries DB for session → loads user data + permissions.
 *
 * @param {object} req — HTTP request
 * @param {object} res — HTTP response
 * @param {function} app — Next handler: app(req, res, data, userData)
 * @param {Array} data — App configuration array
 */
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const db = require('../../utils/query/mysqlConnect');
const routerUsers = require('../../utils/router/routerUsers');
const { parseSessionCookies, hasValidSessionCookies, destroySession } = require('./cookieUtils');

const checkDB = {};

const sessionsControl = async (req, res, app, data) => {
    let userData = { id: 0 };
    const deviceInfo = getDeviceInfo(req);
    const fingerPrint = deviceInfo.fingerPrint;
    const cookies = parseSessionCookies(req);

    if (hasValidSessionCookies(cookies)) {
        const authSt = `${fingerPrint}-${cookies.timestamp}`;
        const cureDeviceId = creatAUTH(authSt);

        if (cookies.deviceId === cureDeviceId) {
            const chickUserData = routerUsers.get(cookies.userId);

            const isUser = (res_, res) => {
                delete checkDB[cookies.deviceId];

                if (res_.length > 0) {
                    if (chickUserData.id && chickUserData.id > 0) {
                        if (chickUserData.deviceToken) {
                            if (cureDeviceId === chickUserData.deviceToken) {
                                userData = res_[0];

                                const isUserCallback = (connectToken) => {
                                    if (connectToken.length > 0) {
                                        userData.connect = {
                                            ID: connectToken[0].userId,
                                            UT: connectToken[0].userToken,
                                            DT: connectToken[0].deviceToken,
                                            CT: connectToken[0].connectToken
                                        };
                                        if (connectToken[0].userId && connectToken[0].userId !== 0) {
                                            db({ query: [{ a: 'del', n: 'answers', q: [[[2, connectToken[0].userId, 'eq']]], l: '0' }] }, res, () => {});
                                        }
                                        db({ query: [{ a: 'up', n: 'usersSessions', d: [[5, 'FALSE']], q: [[[1, connectToken[0].userId, 'eq']]], l: 1 }] }, res, () => { console.log('offer deleted'); });
                                    }
                                    req.user = userData;
                                    routerUsers.set(userData);
                                    const permissionCallback = (userPermissions) => {
                                        userData.permissions = userPermissions.length > 0 ? userPermissions : [];
                                        app(req, res, data, userData);
                                    };
                                    getPermissions(userData.userType, permissionCallback);
                                };

                                getConnection(userData.id, isUserCallback);
                            } else {
                                userData.notSecure = true;
                                destroySession(res);
                                app(req, res, data, userData);
                            }
                        } else {
                            app(req, res, data, userData);
                        }
                    } else {
                        userData = res_[0];

                        const isUserCallback = (connectToken) => {
                            if (connectToken.length > 0) {
                                userData.connect = {
                                    ID: connectToken[0].userId,
                                    UT: connectToken[0].userToken,
                                    DT: connectToken[0].deviceToken,
                                    CT: connectToken[0].connectToken
                                };
                                if (connectToken[0].userId && connectToken[0].userId !== 0) {
                                    db({ query: [{ a: 'del', n: 'answers', q: [[[2, connectToken[0].userId, 'eq']]], l: '0' }] }, res, () => {});
                                }
                                db({ query: [{ a: 'up', n: 'usersSessions', d: [[5, 'FALSE']], q: [[[1, connectToken[0].userId, 'eq']]], l: 1 }] }, res, () => { console.log('offer deleted'); });
                            }
                            req.user = userData;
                            routerUsers.set(userData);
                            delete checkDB[cookies.deviceId];
                            const permissionCallback = (userPermissions) => {
                                userData.permissions = userPermissions.length > 0 ? userPermissions : [];
                                app(req, res, data, userData);
                            };
                            getPermissions(userData.userType, permissionCallback);
                        };

                        getConnection(userData.id, isUserCallback);
                    }
                } else {
                    userData.notSecure = true;
                    destroySession(res);
                    app(req, res, data, userData);
                }
            };

            const getPermissions = (typeId, call_Back) => {
                console.log(['userID', cookies.userId]);
                db({
                    query: [{
                        a: 'getJ',
                        n: 'appsPermissions',
                        q: [[[2, typeId, 'eq']]],
                        s: ['A'],
                        l: 0,
                        j: [{
                            n: 'permissions',
                            q: [[[1, { t: 'q', d: 'permissionId' }, 'eq']]],
                            s: ['A'],
                            l: 1
                        }, {
                            n: 'usersApps',
                            q: [[[1, { t: 'q', d: 'appId' }, 'eq']]],
                            s: ['appName'],
                            l: 1
                        }, {
                            n: 'usersTypeAppsUsage',
                            q: [[[1, { t: 'q', d: 'appId' }, 'eq'], [2, typeId, 'eq']]],
                            s: ['usageLimit'],
                            l: 1
                        }]
                    }]
                }, res, call_Back);
            };

            const getConnection = (id, callBack) => {
                db({
                    query: [{
                        a: 'get',
                        n: 'usersSessions',
                        q: [[[1, id, 'uneq'], [5, 'FALSE', 'uneq']]],
                        s: ['A'],
                        l: 1
                    }]
                }, res, callBack);
            };

            if (checkDB[cookies.deviceId]) {
                app(req, res, data, userData);
            } else {
                checkDB[cookies.deviceId] = true;
                db({
                    query: [{
                        a: 'getJ',
                        n: 'usersSessions',
                        q: [[[3, cookies.deviceId, 'eq']]],
                        s: ['A'],
                        l: 1,
                        j: [{
                            n: 'users',
                            q: [[[1, { t: 'q', d: 'userId' }, 'eq']]],
                            s: ['A'],
                            l: 1
                        }]
                    }]
                }, res, isUser);
            }
        } else {
            const callBackK = () => { console.log('answers deleted'); };
            if (userData.id && userData.id !== 0) {
                db({ query: [{ a: 'del', n: 'answers', q: [[[2, userData.id, 'eq']]], l: '0' }] }, res, callBackK);
            }
            userData.notSecure = true;
            destroySession(res);
            app(req, res, data, userData);
        }
    } else {
        userData.noAuth = true;
        app(req, res, data, userData);
    }
};

module.exports = sessionsControl;
