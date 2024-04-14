const selectRelColumnJoin =(rel,op,tableName,sn)=>{
 
    let opText = ""
    for(var i = 0 ; i < op.length; i++){
        if(rel[i] == "sum"){
        const selectColumnName =sn[i]? ` AS ${sn[i]}` : ` AS ${op[i]}`; 
            opText += `COALESCE(SUM(${tableName}.${op[i]}),0) ${selectColumnName} `;
            if(op[i+1]){
                opText += `, `;
            }
        }else{
                const selectColumnName =sn[i]? ` AS ${sn[i]}` : ''; 
                opText += `${tableName}.${op[i]} ${selectColumnName} `;
                if(op[i+1]){
                    opText += `, `;
                }
        }
      
    }
 
    return opText;

}
module.exports = selectRelColumnJoin