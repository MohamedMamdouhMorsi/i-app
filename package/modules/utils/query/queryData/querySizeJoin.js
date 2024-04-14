const orAndOptionJoin  = require('./orAndOptionJoin');
const selectColumnJoin = require('./selectColumnJoin');

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
function selectAllColumnsJoin(op, tableName) {
    let opText = "";

    for (let i = 0; i < op.length; i++) {
        let opKeyName = op[i];
        let opKey = tableName + '.' + op[i];
        opText += "'" + opKeyName + "' ," + opKey;

        if (op[i + 1] !== undefined) {
            opText += " , ";
        }
    }

    return opText;
}
const querySizeJoin = (ob,tables)=>{

    const tableName = ob.n;
    const newColumnSelectName = ob.sn ? ob.sn : [];
    
    if(tables[tableName]){
    
    const orAndOptionText   = orAndOptionJoin(ob.q,tables,tableName,tableName);
    const limit             = getLimit(ob); 
    var selectedColumn      = ob.s && ob.s[0] !== 'A' ? selectColumnJoin(ob.s,tableName,newColumnSelectName) :tableName+'.* ';
    var joinSting           = '';

    if(ob.j){

        for(var o = 0 ; o < ob.j.length; o++){
            if(ob.j[o].s){

                const cureTableName = ob.j[o].n;
                const newColumnSelectNameJoin = ob.sn ? ob.sn : [];
                var selectedColumnJoin =  cureTableName+'.* ';
                        if(ob.j[o].s && ob.j[o].s[0] !== 'A' ){
                            selectedColumnJoin =  selectColumnJoin(ob.j[o].s,cureTableName,newColumnSelectNameJoin) ;
                        }
                       
                    const cureTableCol            = tables[cureTableName];  
              
                    if(ob['j'][o]['l'] && ob['j'][o]['l'] !== "0"){
                      
                       selectedColumn += ' , ' + selectedColumnJoin;
             
                    }else  if(ob['j'][o]['l'] && ob['j'][o]['l'] == "0"){
                       const selectAllColumnsJoin_ = selectAllColumnsJoin(cureTableCol , cureTableName);
                        selectedColumn += `, JSON_ARRAYAGG(JSON_OBJECT(${selectAllColumnsJoin_ })) AS ${cureTableName}`;
                    }

                if(ob.j[o].q){
                    const joinMethod = ob.j[o].jm ? ob.j[o].jm : 'LEFT';
                    const orAndOptionText_ = orAndOptionJoin(ob.j[o].q,tables,cureTableName,tableName);
                    joinSting += ` ${joinMethod} JOIN  ${cureTableName} ON ${orAndOptionText_} `;
                }
            }
        }
        
    }
    let isIdTable = false;
    const orderByT_ = `${tableName}.id`;
    if(tables[tableName][0] == "id"){
        isIdTable = true;
    }
   
    let orderBy = isIdTable  ? `ORDER BY ${orderByT_}` :"";

    if(ob.order){
        const orderByT = `${tableName}.${ob.order}`;
        orderBy =  `ORDER BY ${orderByT}` ;
    }
    let groupBy = "";
    if(ob.group){
        const groupByT = `${tableName}.${ob.order}`;
        groupBy =  `GROUP BY ${ob.group}` ;
    }
    let getText = `SELECT ${selectedColumn} FROM ${tableName} ${joinSting} WHERE ${orAndOptionText} ${groupBy}  ${orderBy} `;

        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = querySizeJoin