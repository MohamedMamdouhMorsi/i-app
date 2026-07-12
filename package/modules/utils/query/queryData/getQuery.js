/**
 * getQuery — SELECT query builder for non-JOIN queries.
 * Refactored to use shared getLimit utility (was duplicated).
 *
 * @param {object} ob — Query descriptor: { n, q, s, order, method, limitAuto, last, l }
 * @param {object} tables — Table schema map (tableName → column array)
 * @returns {{ sql: string, params: array }}
 */
const orAndOption = require('./orAndOption');
const selectColumn = require('./selectColumn');
const getLimit = require('./getLimit');

const getQuery = (ob, tables) => {
    const tableName = ob.n;

    if (tables[tableName]) {
        const whereResult = orAndOption(ob.q, tables[tableName]);
        const limitResult = getLimit(ob);
        const allParams = [];

        if (!ob.s) {
            ob.s = ['A'];
        }

        let orderBy = '';
        if (ob.order) {
            // Validate order column exists in table schema
            if (tables[tableName].includes(ob.order)) {
                orderBy = 'ORDER BY ' + ob.order;
            }
        }

        if (ob.method && ob.order) {
            const validMethods = ['ASC', 'DESC', 'asc', 'desc'];
            if (validMethods.includes(ob.method)) {
                orderBy = orderBy + ' ' + ob.method.toUpperCase();
            }
        }

        let orAndOptionTextFinal = whereResult.sql;
        allParams.push(...whereResult.params);

        if (orAndOptionTextFinal.trim() === '') {
            orAndOptionTextFinal = '';
        } else {
            orAndOptionTextFinal = ' WHERE ' + orAndOptionTextFinal;
        }

        allParams.push(...limitResult.params);

        if (ob.s && ob.s[0] === 'A') {
            const getText = 'SELECT * FROM ' + tableName + orAndOptionTextFinal + ' ' + orderBy + ' ' + limitResult.sql;
            return { sql: getText, params: allParams };
        } else {
            const selectedColumn = selectColumn(ob.s);
            const getText = 'SELECT ' + selectedColumn + ' FROM ' + tableName + orAndOptionTextFinal + ' ' + orderBy + ' ' + limitResult.sql + ';';
            return { sql: getText, params: allParams };
        }
    } else {
        console.log(`table ${tableName} is not exist`);
    }
};

module.exports = getQuery;
