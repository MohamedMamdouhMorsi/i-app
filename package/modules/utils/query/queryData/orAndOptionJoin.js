
const realationSympole ={
    eq:'=',
    uneq:'!=',
    gr:'>',
    greq:'>=',
    le:'<',
    leeq:'<=',
    like:'LIKE'
}
const valueFN = (ob,master)=>{
    let val = '';
    if(ob.t === 'q'){
        const name = ob.n? ob.n+'.' : master+'.';
        val = name+''+ob.d;
    }
    return val;
}
const orAndOptionJoin =(op,tables, tableName,master)=>{
    const table = tables[tableName];
    let opText = "";
    for(var orOp = 0 ; orOp < op.length; orOp++){
        const OrOB = op[orOp];
  
        for(var andOp = 0; andOp < OrOB.length; andOp++){
            const AndOB = OrOB[andOp];
           
            let columnIndex = AndOB[0] ;
            let columnName ;
            if(typeof columnIndex === 'string' ){
                let coulmnExist = false;
                for(var i = 0 ; i < table.length; i++){
                    if(table[i] == columnIndex){
                        coulmnExist = true;
                    }
                }
                if(coulmnExist){
                    columnName = `${tableName}.${columnIndex}`;
                }
            }else if(typeof columnIndex === 'number' ){
                 columnIndex = columnIndex - 1;
                 columnName = `${tableName}.${table[columnIndex]}`;
            }
            const realtionText = AndOB[2]
            const realtion = realationSympole[realtionText] ? realationSympole[realtionText] : 'false';
            var ValueOB = AndOB[1];
            var Value =null;
            if(typeof ValueOB === 'object'){
                Value = valueFN(ValueOB,master);
            }else if(typeof ValueOB === 'string'){
                Value = `'${ValueOB}'`
            }
            let AndText = '';
            
            if(OrOB[andOp +1]){
                AndText = 'AND';
            }
            if(realtion == 'false'){
                if(realtionText == 'likeCode' ){
                    opText += ` IF(CHAR_LENGTH(${Value}) < 4 , ${columnName} LIKE CONCAT(${Value},'%') , ${columnName} LIKE CONCAT(${Value},'000%')) ${AndText}`;
                }
            }else{
                opText += ` ${columnName} ${realtion} ${Value} ${AndText}`;
            }
          
        }
        if(op[orOp +1]){
            opText += ' OR ';
        }
    }

return opText;
}
module.exports = orAndOptionJoin