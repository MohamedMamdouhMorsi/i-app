const insertValues =(op)=>{
    
   
    if(typeof op[0] === 'object'){
        let opTextAll = "";
        for(var z = 0 ; z < op.length; z++){
            const opT  = op[z];
            let opText = "";
            for(var i = 0 ; i < opT.length; i++){
                opText += ` '${opT[i]}'`;
                const nextOp =  opT[i+1] ||  opT[i+1] == '0' ? true : false;
                if(nextOp){
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
            const nextOp =  op[i+1] ||  op[i+1] == '0' ? true : false;
            if(nextOp){
                opTextA += `, `;
            }
        }
        opTextA = `(${opTextA})`;
        return opTextA;
    }
   
  

}

module.exports = insertValues
