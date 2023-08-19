const checkQueryUptime = (ob)=>{

   const query = ob.ob.query;
   let tableName = '';
   for(var q = 0 ; q < query.length;q++){
    const cureQuery = query[q];
    if(q < 1 && cureQuery.n){
        tableName += ` TABLE_NAME = '${cureQuery.n}'`;
    }else{

        tableName += ` OR TABLE_NAME = '${cureQuery.n}'`;
    }
    if(cureQuery.j){
        const cureJoins = cureQuery.j;
        for(var j = 0 ; j < cureJoins.length;j++){
            const cureJoin = cureJoins[j];
            tableName += ` OR TABLE_NAME = '${cureJoin.n}'`;
        } 
    }
   }

        return `SELECT TABLE_NAME, UPDATE_TIME FROM  information_schema.tables WHERE ${tableName} `;
}
module.exports = checkQueryUptime
