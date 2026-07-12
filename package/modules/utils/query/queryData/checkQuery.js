
const checkQuery = (ob) => {
    const tableName = ob.n;
    return { sql: 'SHOW TABLES LIKE ?;', params: [tableName] };
};

module.exports = checkQuery;
