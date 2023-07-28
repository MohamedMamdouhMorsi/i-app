const insertValues =(op)=>{
    
   
    if(typeof op[0] === 'object'){
        let opTextAll = "";
        for(var z = 0 ; z < op.length; z++){
            const opT  = op[z];
            let opText = "";
            for(var i = 0 ; i < opT.length; i++){
                opText += ` '${opT[i]}'`;
                if(opT[i+1]){
                    opText += `, `;
                }
            }
            opTextAll += `(${opText})`;
            if(op[z+1]){
                opTextAll += `, `;
            }
        }
        return opTextAll;
    }else{
        let opTextA = "";
        for(var i = 0 ; i < op.length; i++){
            opTextA += ` '${op[i]}'`;
            if(op[i+1]){
                opTextA += `, `;
            }
        }
        opTextA = `(${opTextA})`;
        return opTextA;
    }
   
  

}

module.exports = insertValues
