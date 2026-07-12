/**
 * addUser — User registration endpoint.
 * Phase 2: Now uses bcrypt for password hashing (was MD5+SHA1 via creatAUTH).
 *
 * @param {object} userData — { data: { username, firstname, lastname, email, phonenumber, gender, birthdate, accountType, password } }
 * @param {object} res — HTTP response
 */
const db = require('../../query/mysqlConnect');
const { hashPassword } = require('../../toolsFN/passwordHash');

const addUser = (userData, res) => {
    userData = userData.data;
    console.log(userData);

    const callBack = (res_, res) => {
        const userId = res_;
        const passHash = hashPassword(userData.password);
        db({ query: [{ a: 'in', n: 'usersPasswords', d: [userId, passHash] }] }, false, false);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ res: true, userId: userId }));
    };

    db({
        query: [{
            a: 'in',
            n: 'users',
            d: [userData.username, userData.firstname, userData.lastname, userData.email,
                userData.phonenumber, userData.gender, userData.birthdate, userData.accountType, '1']
        }]
    }, res, callBack);
};

module.exports = addUser;
