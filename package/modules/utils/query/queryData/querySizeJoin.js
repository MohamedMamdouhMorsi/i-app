/**
 * querySizeJoin — Count/size query for JOIN SELECT.
 * Refactored to delegate to getJQuery with skipLimit option.
 * Was ~85% duplicate code with getJQuery.
 *
 * @param {object} ob — Query descriptor with join definitions
 * @param {object} tables — Table schema map
 * @returns {{ sql: string, params: array }}
 */
const getJQuery = require('./getJQuery');

const querySizeJoin = (ob, tables) => {
    // Delegate to getJQuery but skip the LIMIT clause for counting
    return getJQuery(ob, tables, { skipLimit: true });
};

module.exports = querySizeJoin;
