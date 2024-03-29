const orAndOption  = require('./orAndOption');
const selectColumn = require('./selectColumn');
const getLimit = (ob)=>{
    let  limit = '';
    if(ob.limitAuto){
        if(ob.last){
            limit = `LIMIT ${parseInt(ob.last)} , ${parseInt(ob.limitAuto)}`;
        }else{
            limit = `LIMIT 0 , ${parseInt(ob.limitAuto)}`;
        }
        
    }else if(ob.l.toString() == '0' ||  ob.l == 0){
        limit = '';
    }else{
        limit = `LIMIT ${ob.l.toString()}`;
    }
return limit;
}

const getQuery = (ob,tables)=>{
    const tableName = ob.n;

    if(tables[tableName]){
    
    const orAndOptionText = orAndOption(ob.q,tables[tableName]);
    const limit = getLimit(ob); 
    if(!ob.s){
        ob.s = ["A"];
    }
   
    
        
            if(ob.s && ob.s[0] == "A"){
             const   getText =  "SELECT  *  FROM "+ tableName +" WHERE "+ orAndOptionText +" "+ limit;
             return getText;
            }else{
                const selectedColumn = selectColumn(ob.s).toString();
                const  getText =  "SELECT "+ selectedColumn +" FROM "+ tableName +" WHERE "+ orAndOptionText +" "+ limit;
                return getText;
            }
           
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = getQuery