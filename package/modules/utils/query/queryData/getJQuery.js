/**
 * getJQuery — SELECT query builder for JOIN queries.
 * Refactored to use shared utilities:
 *   - getLimit (was duplicated inline)
 *   - queryHelpers (selectAllColumnsJoin, selectAllColumnsJoinKata, getPointer, buildOrderBy, buildGroupBy)
 *
 * @param {object} ob — Query descriptor with join definitions
 * @param {object} tables — Table schema map
 * @param {object} [options] — Optional flags: { skipLimit: false }
 * @returns {{ sql: string, params: array }}
 */
const orAndOptionJoin = require('./orAndOptionJoin');
const selectColumnJoin = require('./selectColumnJoin');
const selectRelColumnJoin = require('./selectRelColumnJoin');
const getLimit = require('./getLimit');
const {
    selectAllColumnsJoin,
    selectAllColumnsJoinKata,
    getPointer,
    buildOrderBy,
    buildGroupBy
} = require('./queryHelpers');

const getJQuery = (ob, tables, options = {}) => {
    const tableName = ob.n;
    const newColumnSelectName = ob.sn ? ob.sn : [];
    const allParams = [];
    const skipLimit = options.skipLimit || false;

    if (tables[tableName]) {
        const whereResult = orAndOptionJoin(ob.q, tables, tableName, tableName);
        const limitResult = skipLimit ? { sql: '', params: [] } : getLimit(ob);
        let selectedColumn = ob.s && ob.s[0] !== 'A' ? selectColumnJoin(ob.s, tableName, newColumnSelectName) : tableName + '.* ';
        let joinString = '';

        allParams.push(...whereResult.params);

        if (ob.j) {
            for (let o = 0; o < ob.j.length; o++) {
                if (ob.j[o].s) {
                    const cureTableName = ob.j[o].n;
                    const aliasName = ob.j[o].an ? ob.j[o].an : cureTableName;
                    const newColumnSelectNameJoin = ob.j[o].sn ? ob.j[o].sn : [];
                    let selectedColumnJoin = cureTableName + '.* ';

                    if (ob.j[o].s && ob.j[o].s[0] !== 'A') {
                        if (ob['j'][o].rel) {
                            selectedColumnJoin = selectRelColumnJoin(ob['j'][o].rel, ob.j[o].s, aliasName, newColumnSelectNameJoin);
                        } else {
                            selectedColumnJoin = selectColumnJoin(ob.j[o].s, aliasName, newColumnSelectNameJoin);
                        }
                    }

                    const cureTableCol = tables[cureTableName];
                    const pointerData = getPointer(ob['j'][o]['q'], cureTableName, cureTableCol);
                    const joinJson = !ob['j'][o].rel && ob['j'][o]['l'] && ob['j'][o]['l'] === '0' ? true : false;

                    if (joinJson) {
                        selectedColumn += ' , ' + cureTableName + '.' + cureTableName;
                    } else {
                        selectedColumn += ' , ' + selectedColumnJoin;
                    }

                    if (ob.j[o].q) {
                        let multiArraySelect = '';
                        if (joinJson) {
                            let selectJoinArray = [];
                            if (ob['j'][o]['s'][0] === 'A') {
                                selectJoinArray = cureTableCol;
                            } else {
                                selectJoinArray = ob['j'][o]['s'];
                            }
                            const selectAllColumnsJoin_B = selectAllColumnsJoinKata(selectJoinArray, newColumnSelectNameJoin);
                            multiArraySelect = ` (SELECT ${pointerData.str} JSON_ARRAYAGG(JSON_OBJECT(${selectAllColumnsJoin_B})) AS ${cureTableName} FROM ${cureTableName} GROUP BY ${pointerData.key}) AS `;
                        }
                        const joinMethod = ob.j[o].jm ? ob.j[o].jm : 'LEFT';
                        const joinWhereResult = orAndOptionJoin(ob.j[o].q, tables, cureTableName, tableName, aliasName);
                        let as_alias = '';
                        if (aliasName !== cureTableName) {
                            as_alias = ` AS ${aliasName} `;
                        }
                        joinString += ` ${joinMethod} JOIN ${multiArraySelect} ${cureTableName} ${as_alias} ON ${joinWhereResult.sql} `;
                        allParams.push(...joinWhereResult.params);
                    }
                }
            }
        }

        const orderBy = buildOrderBy(ob, tables, tableName);
        const groupBy = buildGroupBy(ob, tables, tableName);

        allParams.push(...limitResult.params);

        const getText = `SELECT ${selectedColumn} FROM ${tableName} ${joinString} WHERE ${whereResult.sql} ${groupBy} ${orderBy} ${limitResult.sql} ;`;
        return { sql: getText, params: allParams };
    } else {
        console.log(`table ${tableName} is not exist`);
    }
};

module.exports = getJQuery;
