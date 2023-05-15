
const selectColumn = require('./selectColumn');
const insertValues = require('./insertValues');
const insertQuery = (ob,tables)=>{
    const tableName = ob.n;
    console.log(["insertQuery",ob,tables])
    if(tables[tableName]){

    const notId = tables[tableName].filter(e=>{
        if(e !== 'id'){
            return e;
        }
    }); 
    const selectedColumn = selectColumn(notId);
    const insertValuesData   = insertValues(ob.d);
    
        let getText = `INSERT INTO ${tableName} (${selectedColumn}) VALUES (${insertValuesData}) `;
        
        return getText;
    }else{
       
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = insertQuery