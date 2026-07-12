/**
 * querySize — Count/size query for non-JOIN SELECT.
 * Refactored to delegate to getQuery (was ~85% duplicate code).
 *
 * Unwraps the nested input format (obs.ob.query[0]) and calls getQuery
 * with l:'0' (no LIMIT) to get a full result count.
 *
 * @param {object} obs — Wrapper: { ob: { query: [queryDescriptor] } }
 * @param {object} tables — Table schema map
 * @returns {{ sql: string, params: array }}
 */
const getQuery = require('./getQuery');

const querySize = (obs, tables) => {
    const ob = obs.ob.query[0];

    // Delegate to getQuery with no limit (l: '0') and no ordering
    const sizeOb = {
        n: ob.n,
        q: ob.q,
        s: ob.s,
        l: '0'
        // No order, method, limitAuto — querySize doesn't need them
    };

    return getQuery(sizeOb, tables);
};

module.exports = querySize;
