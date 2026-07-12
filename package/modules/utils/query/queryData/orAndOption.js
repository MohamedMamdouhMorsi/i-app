/**
 * orAndOption — Simple WHERE clause builder (non-JOIN queries).
 * Now delegates to the unified whereClause module.
 * Backward-compatible: same signature and return format.
 *
 * @param {Array} op — OR/AND condition array
 * @param {string[]} table — Column names array for the table
 * @returns {{ sql: string, params: array }}
 */
const { buildWhereClause } = require('./whereClause');

const orAndOption = (op, table) => {
    return buildWhereClause(op, { table, isJoin: false });
};

module.exports = orAndOption;
