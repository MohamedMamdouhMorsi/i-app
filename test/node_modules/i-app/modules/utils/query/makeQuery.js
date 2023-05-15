const getQuery =   require('./queryData/getQuery');
const insertQuery =   require('./queryData/insertQuery');
const makeQuery =(body,tables)=>{
    const queryOB  = body.query;
    let queryText = "";
    for(var i = 0 ;  i < queryOB.length; i++){
        const cureOB = queryOB[i];
        let queryAction = cureOB.a;
        console.log(["queryAction in",cureOB,queryAction])
        if(queryAction === "get"){
            queryText += getQuery(cureOB,tables)
        }else  if(queryAction === "in"){
          
            queryText += insertQuery(cureOB,tables);
        
        }
    }
    
    return queryText;
}
module.exports = makeQuery