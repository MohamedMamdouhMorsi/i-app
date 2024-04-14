const orAndOptionJoin  = require('./orAndOptionJoin');
const selectColumnJoin = require('./selectColumnJoin');
const selectRelColumnJoin = require('./selectRelColumnJoin');

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

const selectAllColumnsJoinKata = (op,sn)=> {
    let opText = "";

    for (let i = 0; i < op.length; i++) {
        var opKeyName = op[i];
        var opKeyValue = op[i];
        if(sn[i]){
            opKeyName = sn[i];
        }
        opText += "'" + opKeyName + "' ," + opKeyValue;

        if (op[i + 1] !== undefined) {
            opText += " , ";
        }
    }

    return opText;
}
const getPointer =(ob, tableName, table)=> {
    let columnIndex = ob[0][0][0];
    let columnName = "";

    if (typeof columnIndex === "string") {
        let columnExist = table.includes(columnIndex);
        if (columnExist) {
            columnName = columnIndex;
        } else {
            console.error("Error");
            return;
        }
    } else if (typeof columnIndex === "number") {
        columnIndex -= 1;
        if (columnIndex >= 0 && columnIndex < table.length) {
            columnName = table[columnIndex];
        }
    }
    return columnName;
}
const getJQuery = (ob,tables)=>{

    const tableName = ob.n;
    const newColumnSelectName = ob.sn ? ob.sn : [];
    
    if(tables[tableName]){
    
    const orAndOptionText   = orAndOptionJoin(ob.q,tables,tableName,tableName);
    const limit             = getLimit(ob); 
    var selectedColumn      = ob.s && ob.s[0] !== 'A' ? selectColumnJoin(ob.s,tableName,newColumnSelectName) :tableName+'.* ';
    var joinSting           ='';
   
    if(ob.j){
        
      
        for(var o = 0 ; o < ob.j.length; o++){
            if(ob.j[o].s){

                const cureTableName = ob.j[o].n;
                const newColumnSelectNameJoin = ob.j[o].sn ? ob.j[o].sn : [];
                var selectedColumnJoin =  cureTableName+'.* ';
                        if(ob.j[o].s && ob.j[o].s[0] !== 'A' ){
                            if(ob['j'][o].rel){
                                selectedColumnJoin =  selectRelColumnJoin(ob['j'][o].rel,ob.j[o].s,cureTableName,newColumnSelectNameJoin) ;
                            }else{
                                selectedColumnJoin =  selectColumnJoin(ob.j[o].s,cureTableName,newColumnSelectNameJoin) ;
                            }
                           
                        }
                       
                    const cureTableCol            = tables[cureTableName];  
                    const pointerData             = getPointer(ob['j'][o]['q'],cureTableName,cureTableCol);
                    const joinJson = !ob['j'][o].rel && ob['j'][o]['l'] && ob['j'][o]['l'] == "0" ? true :false;

                    if(joinJson){
                        selectedColumn += ' , '+cureTableName+'.'+cureTableName;
                    }else{
                        selectedColumn += ' , ' + selectedColumnJoin;
                    }
                   

                if(ob.j[o].q){
                    var multiArraySelect = "";
                    if(joinJson){
                        var selectJoinArray = [];
                                    if(ob['j'][o]['s'][0] == "A"){
                                        selectJoinArray = cureTableCol;
                                    }else{
                                        selectJoinArray = ob['j'][o]['s'];
                                    }
                        const selectAllColumnsJoin_B = selectAllColumnsJoinKata(selectJoinArray,newColumnSelectNameJoin);
                        multiArraySelect         = ` (SELECT ${pointerData} , JSON_ARRAYAGG(JSON_OBJECT(${selectAllColumnsJoin_B} )) AS ${cureTableName} FROM ${cureTableName} GROUP BY ${pointerData} ) AS `;
                    }
                    const joinMethod = ob.j[o].jm ? ob.j[o].jm : 'LEFT';
                    const orAndOptionText_ = orAndOptionJoin(ob.j[o].q,tables,cureTableName,tableName);
                    joinSting += ` ${joinMethod} JOIN ${multiArraySelect} ${cureTableName} ON ${orAndOptionText_} `;
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
    let getText = `SELECT ${selectedColumn} FROM ${tableName} ${joinSting} WHERE ${orAndOptionText} ${groupBy}  ${orderBy} ${limit} ;`;
    console.log(['getText',getText]);
        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
    }
}
module.exports = getJQuery