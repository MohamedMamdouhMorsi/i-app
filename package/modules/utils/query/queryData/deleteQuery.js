const orAndOption = require('./orAndOption');

const deleteQuery = (ob, tables) => {
    const tableName = ob.n;

    if (tables[tableName]) {
        const whereResult = orAndOption(ob.q, tables[tableName]);
        const allParams = [...whereResult.params];

        let limit = '';
        if (ob.l && ob.l.toString() !== '0') {
            limit = 'LIMIT ?';
            allParams.push(parseInt(ob.l));
        }

        const getText = `DELETE FROM ${tableName} WHERE ${whereResult.sql} ${limit} ;`;
        return { sql: getText, params: allParams };
    } else {
        console.log(`table ${tableName} is not exist`);
    }
};

module.exports = deleteQuery;
