const orAndOption = require('./orAndOption');
const selectColumn = require('./selectColumn');

const querySize = (obs,tables)=>{
    const ob = obs.ob.query[0];
    const tableName = ob.n ?  ob.n  :   'No table Name';

    if(tables[tableName] && ob.q){

    const orAndOptionText   = orAndOption(ob.q,tables[tableName]);
    let   selectedColumn    = selectColumn([0]) ;
    let   getText           = `SELECT ${selectedColumn} FROM ${tableName} WHERE ${orAndOptionText} `;

        return getText;

    }else{

        console.log(`table ${tableName} is not exist`);
    
    }
}
module.exports = querySize