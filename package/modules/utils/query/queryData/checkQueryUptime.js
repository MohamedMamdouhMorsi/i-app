
const checkQueryUptime = (ob) => {
    const query = ob.ob.query;
    let conditions = '';
    const params = [];

    for (let q = 0; q < query.length; q++) {
        const cureQuery = query[q];
        if (q < 1 && cureQuery.n) {
            conditions += ' TABLE_NAME = ?';
            params.push(cureQuery.n);
        } else {
            conditions += ' OR TABLE_NAME = ?';
            params.push(cureQuery.n);
        }
        if (cureQuery.j) {
            const cureJoins = cureQuery.j;
            for (let j = 0; j < cureJoins.length; j++) {
                const cureJoin = cureJoins[j];
                conditions += ' OR TABLE_NAME = ?';
                params.push(cureJoin.n);
            }
        }
    }

    return { sql: `SELECT TABLE_NAME, UPDATE_TIME FROM information_schema.tables WHERE ${conditions} ;`, params };
};

module.exports = checkQueryUptime;
