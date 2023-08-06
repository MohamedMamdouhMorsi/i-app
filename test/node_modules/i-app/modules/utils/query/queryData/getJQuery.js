const orAndOptionJoin = require('./orAndOptionJoin');
const selectColumnJoin = require('./selectColumnJoin');
const getJQuery = (ob,tables)=>{

    const tableName = ob.n;
    const newColumnSelectName = ob.sn ? ob.sn : [];
    if(tables[tableName]){
    
    const orAndOptionText = orAndOptionJoin(ob.q,tables,tableName,tableName);
    const limit =ob.l && ob.l.toString() == '0' ? '' :  `LIMIT ${ob.l.toString()}`; 
    let selectedColumn = ob.s && ob.s[0] !== 'A' ? selectColumnJoin(ob.s,tableName,newColumnSelectName) :tableName+'.* ';
    let joinSting  ='';
    if(ob.j){
        for(var o = 0 ; o < ob.j.length; o++){
            if(ob.j[o].s){
                const cureTableName = ob.j[o].n;
                const newColumnSelectNameJoin = ob.sn ? ob.sn : [];
                let selectedColumnJoin = ob.j[o].s && ob.j[o].s[0] !== 'A' ? selectColumnJoin(ob.j[o].s,cureTableName,newColumnSelectNameJoin) : cureTableName+'.* ';
                selectedColumn += ' , '+selectedColumnJoin;
                if(ob.j[o].q){
                    const joinMethod =ob.j[o].jm ? ob.j[o].jm : 'LEFT';
                    const orAndOptionText = orAndOptionJoin(ob.j[o].q,tables,cureTableName,tableName);
                    joinSting += ` ${joinMethod} JOIN  ${cureTableName} ON ${orAndOptionText} `;
                }
            }
        }
    }
    let isIdTable = "";
   
    let orderBy = isIdTable !== '' ? `ORDER BY ${isIdTable}` :"";
    if(ob.order){
        orderBy =  `ORDER BY ${ob.order}` ;
    }
    let getText = `SELECT ${selectedColumn} FROM ${tableName} ${joinSting} WHERE ${orAndOptionText} ${orderBy} ${limit}`;
console.log(getText);
        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = getJQuery