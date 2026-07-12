/**
 * queryHelpers — Shared helper functions for JOIN query builders.
 * Extracted from getJQuery.js and querySizeJoin.js to eliminate duplication.
 *
 * Functions:
 *   - selectAllColumnsJoin(columns, tableName) — Build column list with table prefix
 *   - selectAllColumnsJoinKata(columns, aliases) — Build column list with optional aliases
 *   - getPointer(ob, tableName, table) — Extract JOIN pointer column names
 *   - buildOrderBy(ob, tables, tableName) — Build validated ORDER BY clause
 *   - buildGroupBy(ob, tables, tableName) — Build validated GROUP BY clause
 */

/**
 * Build a JSON_OBJECT-compatible column string: 'colName', tableName.colName, ...
 * Used for JSON_ARRAYAGG(JSON_OBJECT(...)) subselects.
 *
 * @param {string[]} op — Column names
 * @param {string} tableName — Table name for prefix
 * @returns {string}
 */
function selectAllColumnsJoin(op, tableName) {
    let opText = '';
    for (let i = 0; i < op.length; i++) {
        const opKeyName = op[i];
        const opKey = tableName + '.' + op[i];
        opText += "'" + opKeyName + "' ," + opKey;
        if (op[i + 1] !== undefined) {
            opText += ' , ';
        }
    }
    return opText;
}

/**
 * Build a JSON_OBJECT-compatible column string with optional alias names.
 * When sn[i] is provided, uses alias as key name instead of column name.
 *
 * @param {string[]} op — Column names
 * @param {string[]} sn — Alias names (optional, same length as op)
 * @returns {string}
 */
const selectAllColumnsJoinKata = (op, sn) => {
    let opText = '';
    for (let i = 0; i < op.length; i++) {
        let opKeyName = op[i];
        const opKeyValue = op[i];
        if (sn[i]) {
            opKeyName = sn[i];
        }
        opText += "'" + opKeyName + "' ," + opKeyValue;
        if (op[i + 1] !== undefined) {
            opText += ' , ';
        }
    }
    return opText;
};

/**
 * Extract JOIN pointer columns for GROUP BY in JSON_ARRAYAGG subselect.
 * Returns the column name string and the last key for GROUP BY.
 *
 * @param {Array} ob — Query condition array (q property of join)
 * @param {string} tableName — Current table name
 * @param {string[]} table — Column list for the table
 * @returns {{ str: string, key: string }}
 */
const getPointer = (ob, tableName, table) => {
    let columnName = '';
    const DataKeys = [];
    for (let r = 0; r < ob.length; r++) {
        const ORD_ = ob[r];
        for (let a = 0; a < ORD_.length; a++) {
            const ANDD = ORD_[a];
            let columnIndex = ANDD[0];
            if (typeof columnIndex === 'string') {
                const columnExist = table.includes(columnIndex);
                if (columnExist) {
                    columnName += columnIndex + ', ';
                    DataKeys.push(columnIndex);
                } else {
                    console.error('Error');
                    return;
                }
            } else if (typeof columnIndex === 'number') {
                columnIndex -= 1;
                if (columnIndex >= 0 && columnIndex < table.length) {
                    columnName += table[columnIndex] + ', ';
                    DataKeys.push(table[columnIndex]);
                }
            }
        }
    }
    return { str: columnName, key: DataKeys[DataKeys.length - 1] };
};

/**
 * Build validated ORDER BY clause for JOIN queries.
 * Validates column against table schema to prevent injection.
 *
 * @param {object} ob — Query object with order, method properties
 * @param {object} tables — Table schema map
 * @param {string} tableName — Main table name
 * @returns {string} ORDER BY clause or empty string
 */
const buildOrderBy = (ob, tables, tableName) => {
    let isIdTable = false;
    const orderByT_ = `${tableName}.id`;
    if (tables[tableName][0] === 'id') {
        isIdTable = true;
    }

    let orderBy = isIdTable ? `ORDER BY ${orderByT_}` : '';
    if (ob.order) {
        if (tables[tableName].includes(ob.order)) {
            orderBy = `ORDER BY ${tableName}.${ob.order}`;
        }
    }
    if (ob.method) {
        const validMethods = ['ASC', 'DESC', 'asc', 'desc'];
        if (validMethods.includes(ob.method)) {
            orderBy = orderBy + ' ' + ob.method.toUpperCase();
        }
    }
    return orderBy;
};

/**
 * Build validated GROUP BY clause.
 * Validates column against table schema.
 *
 * @param {object} ob — Query object with group property
 * @param {object} tables — Table schema map
 * @param {string} tableName — Main table name
 * @returns {string} GROUP BY clause or empty string
 */
const buildGroupBy = (ob, tables, tableName) => {
    let groupBy = '';
    if (ob.group) {
        if (tables[tableName].includes(ob.group)) {
            groupBy = `GROUP BY ${ob.group}`;
        }
    }
    return groupBy;
};

module.exports = {
    selectAllColumnsJoin,
    selectAllColumnsJoinKata,
    getPointer,
    buildOrderBy,
    buildGroupBy
};
