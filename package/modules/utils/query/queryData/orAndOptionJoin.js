/**
 * orAndOptionJoin — JOIN WHERE clause builder.
 * Now delegates to the unified whereClause module.
 * Backward-compatible: same signature and return format.
 *
 * @param {Array} op — OR/AND condition array
 * @param {object} tables — Tables schema map
 * @param {string} tableName — Current table name
 * @param {string} master — Master/primary table name
 * @param {string} [aliasName] — Optional alias for the table
 * @returns {{ sql: string, params: array }}
 */
const { buildWhereClause } = require('./whereClause');

const orAndOptionJoin = (op, tables, tableName, master, aliasName) => {
    return buildWhereClause(op, {
        table: tables,
        tableName,
        master,
        aliasName,
        isJoin: true
    });
};

module.exports = orAndOptionJoin;
