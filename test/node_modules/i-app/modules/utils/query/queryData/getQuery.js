const orAndOption = require('./orAndOption');
const selectColumn = require('./selectColumn');
const getQuery = (ob,tables)=>{
    const tableName = ob.n;

    if(tables[tableName]){
    const orAndOptionText = orAndOption(ob.q,tables[tableName]);
    const limit = ob.l.toString() == '0' ? '' : ob.l.toString(); 
    const selectedColumn = ob.s && ob.s[0] !== 'A' ? selectColumn(ob.s) :'*';
    let getText = `SELECT ${selectedColumn} FROM ${tableName} WHERE ${orAndOptionText} ${limit}`;

        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = getQuery