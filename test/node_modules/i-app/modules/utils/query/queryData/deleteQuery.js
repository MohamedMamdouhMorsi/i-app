const orAndOption = require('./orAndOption');

const deleteQuery = (ob,tables)=>{
    const tableName = ob.n;

    if(tables[tableName]){
    const orAndOptionText = orAndOption(ob.q,tables[tableName]);
    const limit =ob.l && ob.l.toString() == '0' ? '' :  `LIMIT ${ob.l.toString()}`; 

   
    let getText = `DELETE FROM ${tableName} WHERE ${orAndOptionText} ${limit}`;

        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = deleteQuery