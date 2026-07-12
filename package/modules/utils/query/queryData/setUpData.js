
const setUpData = (data, table) => {
    let upData = '';
    const params = [];
    let isFirst = true;

    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        // Indexed arrays: [[1, 'value1'], [2, 'value2']]
        for (const row of data) {
            if (!isFirst) {
                upData += ' , ';
            }

            const columnIndex = row[0] - 1;
            const columnName = table[columnIndex];
            const value = row[1];

            if (typeof value === 'number' && Number.isInteger(value)) {
                upData += `${columnName} = ?`;
                params.push(value);
            } else {
                const stringValue = String(value);
                if (stringValue === 'now()' || stringValue === 'NOW()') {
                    upData += `${columnName} = NOW()`;
                } else {
                    upData += `${columnName} = ?`;
                    params.push(stringValue);
                }
            }
            isFirst = false;
        }
    } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        // Associative object: {'column1': 'value1', 'column2': 'value2'}
        for (const columnName in data) {
            if (data.hasOwnProperty(columnName)) {
                if (!isFirst) {
                    upData += ' , ';
                }

                const value = data[columnName];

                if (typeof value === 'number' && Number.isInteger(value)) {
                    upData += `${columnName} = ?`;
                    params.push(value);
                } else {
                    const stringValue = String(value);
                    if (stringValue === 'now()' || stringValue === 'NOW()') {
                        upData += `${columnName} = NOW()`;
                    } else {
                        upData += `${columnName} = ?`;
                        params.push(stringValue);
                    }
                }
                isFirst = false;
            }
        }
    }
    return { sql: upData, params };
};

module.exports = setUpData;
