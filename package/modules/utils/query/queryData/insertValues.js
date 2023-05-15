const insertValues =(op)=>{
    let opText = ""
    for(var i = 0 ; i < op.length; i++){
        opText += ` '${op[i]}'`;
        if(op[i+1]){
            opText += `, `;
        }
    }
    return opText;

}
module.exports = insertValues