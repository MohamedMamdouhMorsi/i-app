const orAndOption = require('./orAndOption');
const setUpData = require('./setUpData');

const updateQuery = (ob, tables) => {
    const tableName = ob.n;

    if (tables[tableName]) {
        const whereResult = orAndOption(ob.q, tables[tableName]);
        const setResult = setUpData(ob.d, tables[tableName]);
        const allParams = [];

        allParams.push(...setResult.params);
        allParams.push(...whereResult.params);

        let limit = '';
        if (ob.l && ob.l.toString() !== '0') {
            limit = 'LIMIT ?';
            allParams.push(parseInt(ob.l));
        }

        const getText = `UPDATE ${tableName} SET ${setResult.sql} WHERE ${whereResult.sql} ${limit}`;
        return { sql: getText, params: allParams };
    } else {
        console.log(`table ${tableName} is not exist`);
    }
};

module.exports = updateQuery;
