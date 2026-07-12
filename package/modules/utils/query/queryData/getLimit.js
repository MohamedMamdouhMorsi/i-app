/**
 * getLimit — Shared LIMIT clause builder for SQL queries.
 * Extracted from getQuery.js, getJQuery.js, and querySizeJoin.js
 * to eliminate 3x duplication (~20 lines each).
 *
 * Returns { sql: string, params: array } with parameterized LIMIT.
 *
 * @param {object} ob — Query object with optional limitAuto, last, l properties.
 * @returns {{ sql: string, params: array }}
 */
const getLimit = (ob) => {
    let limit = '';
    const params = [];

    if (ob.limitAuto) {
        if (ob.last) {
            limit = 'LIMIT ?, ?';
            params.push(parseInt(ob.last), parseInt(ob.limitAuto));
        } else {
            limit = 'LIMIT 0, ?';
            params.push(parseInt(ob.limitAuto));
        }
    } else if (!ob.l || ob.l.toString() === '0' || ob.l == 0 || ob.l === 'null' || ob.l == null || ob.l === undefined) {
        limit = '';
    } else {
        limit = 'LIMIT ?';
        params.push(parseInt(ob.l));
    }

    return { sql: limit, params };
};

module.exports = getLimit;
