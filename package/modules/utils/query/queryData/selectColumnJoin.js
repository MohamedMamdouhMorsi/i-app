const selectColumnJoin =(op,tableName,sn)=>{
    let opText = ""
    for(var i = 0 ; i < op.length; i++){
        const selectColumnName =sn[i]? ` AS ${sn[i]}` : ''; 
        opText += `${tableName}.${op[i]} ${selectColumnName} `;
        if(op[i+1]){
            opText += `, `;
        }
    }
    return opText;

}
module.exports = selectColumnJoin