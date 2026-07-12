
const selectColumn = require('./selectColumn');
const insertValues = require('./insertValues');

const insertQuery = (ob, tables) => {
    const tableName = ob.n;

    if (tables[tableName]) {
        const notId = tables[tableName].filter(e => e !== 'id');
        const selectedColumn = selectColumn(notId);
        const valuesResult = insertValues(ob.d);

        const getText = `INSERT INTO ${tableName} ( ${selectedColumn} ) VALUES ${valuesResult.sql} ;`;
        return { sql: getText, params: valuesResult.params };
    } else {
        console.log(`table ${tableName} is not exist`);
    }
};

module.exports = insertQuery;
