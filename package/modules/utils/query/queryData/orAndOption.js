
const realationSympole ={
    eq:'=',
    uneq:'!=',
    gr:'>',
    greq:'>=',
    le:'<',
    leeq:'<=',
    like:'LIKE'
}
const orAndOption =(op,table)=>{
    let opText = ""
    for(var orOp = 0 ; orOp < op.length; orOp++){
        const OrOB = op[orOp];
  
        for(var andOp = 0; andOp < OrOB.length; andOp++){
            const AndOB = OrOB[andOp];
           
            const columnIndex = AndOB[0] - 1;
            const columnName = table[columnIndex];
            
            const realtionText = AndOB[2]
            const realtion = realationSympole[realtionText] ? realationSympole[realtionText] : 'false';
            const Value = AndOB[1];
            const AndText = '';
            
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
module.exports = orAndOption