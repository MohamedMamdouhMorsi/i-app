const orAndOption = require('./orAndOption');
const setUpData = require('./setUpData');
const updateQuery = (ob,tables)=>{
    const tableName = ob.n;

    if(tables[tableName]){
    const orAndOptionText = orAndOption(ob.q,tables[tableName]);
    const upData = setUpData(ob.d,tables[tableName])
    const limit = ob.l && ob.l.toString() == '0' ? '' : `LIMIT ${ob.l.toString()}`; 
    let getText = `UPDATE ${tableName} SET ${upData} WHERE ${orAndOptionText} ${limit}`;
        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = updateQuery