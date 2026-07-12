/**
 * whereClause — Unified WHERE clause builder for SQL queries.
 * Consolidates orAndOption.js (simple) and orAndOptionJoin.js (JOIN) into one module.
 *
 * Eliminates ~95% code duplication between the two original files (~160 lines → ~100 lines).
 *
 * @module whereClause
 */

const relationSymbol = {
    eq: '=',
    uneq: '!=',
    gr: '>',
    greq: '>=',
    le: '<',
    leeq: '<=',
    like: 'LIKE'
};

/**
 * Resolve a JOIN column-to-column reference value.
 * When value is an object like {t:'q', n:'tableName', d:'columnName'},
 * returns the fully qualified column reference string.
 *
 * @param {object} ob — Value object with t, n, d properties
 * @param {string} master — Master table name (fallback if ob.n is missing)
 * @returns {string} Qualified column reference or empty string
 */
const resolveColumnRef = (ob, master) => {
    let val = '';
    if (ob !== null && ob.t && ob.t === 'q') {
        const name = ob.n ? ob.n + '.' : master + '.';
        val = `${name}${ob.d}`;
    }
    return val;
};

/**
 * Resolve a column name from an index or string, with optional table prefix.
 *
 * @param {number|string} columnIndex — Column index (1-based) or column name string
 * @param {string[]} table — Array of column names for the table
 * @param {string|null} tablePrefix — Table prefix for qualified names (null for simple queries)
 * @returns {string} Resolved column name or empty string
 */
const resolveColumnName = (columnIndex, table, tablePrefix) => {
    let columnName = '';

    if (typeof columnIndex === 'string') {
        let columnExist = false;
        for (let i = 0; i < table.length; i++) {
            if (table[i] === columnIndex) {
                columnExist = true;
            }
        }
        if (columnExist) {
            columnName = tablePrefix ? `${tablePrefix}.${columnIndex}` : columnIndex;
        }
    } else if (typeof columnIndex === 'number') {
        const idx = columnIndex - 1;
        if (idx >= 0 && idx < table.length) {
            const col = table[idx];
            columnName = tablePrefix ? `${tablePrefix}.${col}` : col;
        }
    }

    return columnName;
};

/**
 * Build a parameterized WHERE clause from an OR/AND condition array.
 *
 * Supports two modes:
 * - Simple mode (isJoin=false): Column names without table prefix, values always parameterized
 * - JOIN mode (isJoin=true): Column names with table prefix, supports column-to-column references
 *
 * @param {Array} op — OR/AND condition array: [[AND-group], [AND-group], ...]
 * @param {object} options — Configuration options
 * @param {string[]|object} options.table — Column array (simple) or tables map (join)
 * @param {string} [options.tableName] — Table name (required for JOIN mode)
 * @param {string} [options.master] — Master table name for column refs (JOIN mode)
 * @param {string} [options.aliasName] — Alias for the table (JOIN mode)
 * @param {boolean} [options.isJoin=false] — Whether this is a JOIN query
 * @returns {{ sql: string, params: array }}
 */
const buildWhereClause = (op, options = {}) => {
    const { table, tableName, master, aliasName, isJoin = false } = options;
    let opText = '';
    const params = [];

    if (!op || op.length === 0) {
        return { sql: opText, params };
    }

    // Resolve the column list
    const columnList = isJoin ? table[tableName] : table;
    const prefix = isJoin ? (aliasName && aliasName !== tableName ? aliasName : tableName) : null;

    for (let orOp = 0; orOp < op.length; orOp++) {
        const OrOB = op[orOp];

        for (let andOp = 0; andOp < OrOB.length; andOp++) {
            const AndOB = OrOB[andOp];

            const columnIndex = AndOB[0];
            const columnName = resolveColumnName(columnIndex, columnList, prefix);
            const relationText = AndOB[2];
            const relation = relationSymbol[relationText] ? relationSymbol[relationText] : 'false';
            const Value = AndOB[1];

            // Handle value based on type
            if (isJoin && typeof Value === 'object') {
                // Column-to-column reference (JOIN ON condition) — not a user value, safe to inline
                const val = resolveColumnRef(Value, master);
                if (relation === 'false') {
                    if (relationText === 'likeCode') {
                        opText += ` IF(CHAR_LENGTH(${val}) < 4, ${columnName} LIKE CONCAT(${val}, '%'), ${columnName} LIKE CONCAT(${val}, '000%'))`;
                    }
                } else {
                    opText += ` ${columnName} ${relation} ${val}`;
                }
            } else {
                // Parameterized value (user input)
                if (relation === 'false') {
                    if (relationText === 'likeCode') {
                        opText += ` IF(CHAR_LENGTH(?) < 4, ${columnName} LIKE CONCAT(?, '%'), ${columnName} LIKE CONCAT(?, '000%'))`;
                        params.push(Value, Value, Value);
                    }
                } else {
                    opText += ` ${columnName} ${relation} ?`;
                    params.push(Value);
                }
            }

            // Add AND connector if more conditions follow
            let AndText = '';
            if (OrOB[andOp + 1]) {
                AndText = ' AND';
            }
            opText += AndText;
        }

        // Add OR connector if more groups follow
        if (op[orOp + 1]) {
            opText += ' OR ';
        }
    }

    return { sql: opText, params };
};

module.exports = { buildWhereClause, resolveColumnRef, resolveColumnName, relationSymbol };
