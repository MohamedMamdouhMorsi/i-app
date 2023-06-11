
const checkQuery = (ob)=>{
    const tableName = ob.n;
        return `show tables like '${tableName}'`;
}
module.exports = checkQuery