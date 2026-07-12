/**
 * logUser — User login endpoint.
 * Phase 2: Password verification now uses bcrypt with automatic migration
 * from legacy creatAUTH hashes. Password comparison moved from SQL to Node.js
 * because bcrypt hashes are non-deterministic (include random salt).
 *
 * Migration flow:
 *   1. Fetch stored hash from usersPasswords by userId
 *   2. Verify with verifyPassword() (supports bcrypt + legacy)
 *   3. If legacy hash verified → rehash with bcrypt → update DB
 *   4. Generate session tokens (still uses creatAUTH for device tokens, not passwords)
 */
const db = require('../../query/mysqlConnect');
const routerUsers = require('../../router/routerUsers');
const creatAUTH = require('../../toolsFN/createAUTH');
const getDeviceInfo = require('../../toolsFN/getDeviceInfo');
const { verifyPassword, hashPassword } = require('../../toolsFN/passwordHash');

const logUser = (userData, req, res) => {
    userData = userData.data;

    if (typeof userData.username === 'string' && typeof userData.password === 'string') {
        const expires = new Date(Date.now() + 86400 * 1000);
        let userId = false;
        let dbuserData = null;

        const passwordIsTrue = (res_, res) => {
            // res_ contains the password row(s) from usersPasswords
            if (!res_ || res_.length < 1) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: false }));
                return;
            }

            const storedHash = res_[0].password;
            const verification = verifyPassword(userData.password, storedHash);

            if (!verification.valid) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: false }));
                return;
            }

            // Auto-migrate legacy hash to bcrypt
            if (verification.needsMigration) {
                const newHash = hashPassword(userData.password);
                db({
                    query: [{
                        a: 'up',
                        n: 'usersPasswords',
                        d: { password: newHash },
                        q: [[['userId', userId, 'eq']]],
                        l: 1
                    }]
                }, false, false);
            }

            // Password verified — generate session tokens
            const deviceInfo = getDeviceInfo(req);
            const fingerPrint = deviceInfo.fingerPrint;
            const timestamp = Date.now();
            const authDeviceSt = `${fingerPrint}-${timestamp}`;
            const authUserSt = `${fingerPrint}-${timestamp}-${storedHash}`;
            const authUsername = `${userData.username}-${timestamp}`;
            const cureDeviceId = creatAUTH(authDeviceSt);
            const cureUserId = creatAUTH(authUserSt);
            const userToken = creatAUTH(authUsername);

            if (userId) {
                const setScureUser = (res_, res) => {
                    dbuserData.scureToken = cureUserId;
                    dbuserData.deviceToken = cureDeviceId;
                    routerUsers.set(dbuserData);

                    if (userId && res_.length > 0) {
                        db({
                            query: [{
                                a: 'up',
                                n: 'usersSessions',
                                d: [[3, cureDeviceId], [4, cureUserId], [5, 'FALSE']],
                                q: [[[1, userId, 'eq']]],
                                l: 1
                            }]
                        }, res, false);
                        res.setHeader('Set-Cookie', [
                            `deviceId=${cureDeviceId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`,
                            `userId=${cureUserId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`,
                            `timestamp=${timestamp}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`
                        ]);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ res: true }));
                    } else {
                        db({
                            query: [{
                                a: 'in',
                                n: 'usersSessions',
                                d: [userId, userToken, cureDeviceId, cureUserId, 'FALSE'],
                                l: 1
                            }]
                        }, res, false);
                        res.setHeader('Set-Cookie', [
                            `deviceId=${cureDeviceId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`,
                            `userId=${cureUserId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`,
                            `timestamp=${timestamp}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`
                        ]);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ res: true }));
                    }
                };

                db({
                    query: [{
                        a: 'get',
                        n: 'usersSessions',
                        q: [[['userId', userId, 'eq']]],
                        l: 1
                    }]
                }, res, setScureUser);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: false }));
            }
        };

        const userExist = (res_, res) => {
            if (res_.length > 0) {
                dbuserData = res_[0];
                userId = dbuserData.id;
                // Fetch stored hash — compare in Node.js, not SQL (bcrypt is non-deterministic)
                db({
                    query: [{
                        a: 'get',
                        n: 'usersPasswords',
                        q: [[['userId', userId, 'eq']]],
                        s: ['A'],
                        l: 1
                    }]
                }, res, passwordIsTrue);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: false }));
            }
        };

        db({
            query: [{
                a: 'get',
                n: 'users',
                q: [[['username', userData.username, 'eq']]],
                l: 1
            }]
        }, res, userExist);
    }
};

module.exports = logUser;
