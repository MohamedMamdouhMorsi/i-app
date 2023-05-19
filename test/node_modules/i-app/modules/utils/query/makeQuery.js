const getQuery =   require('./queryData/getQuery');
const insertQuery =   require('./queryData/insertQuery');
const updateQuery =   require('./queryData/updateQuery');
const deleteQuery =   require('./queryData/deleteQuery');
const checkQuery =   require('./queryData/checkQuery');
const makeQuery =(body,tables)=>{
    const queryOB  = body.query;
    let queryText = "";
    for(var i = 0 ;  i < queryOB.length; i++){
        const cureOB = queryOB[i];
        let queryAction = cureOB.a;
   
        if(queryAction === "get"){
            queryText += getQuery(cureOB,tables)
        }else  if(queryAction === "in"){
          
            queryText += insertQuery(cureOB,tables);
        
        }else  if(queryAction === "up"){
          
            queryText += updateQuery(cureOB,tables);
        
        }else  if(queryAction === "del"){
          
            queryText += deleteQuery(cureOB,tables);
        
        }else  if(queryAction === "check"){
          
            queryText += checkQuery(cureOB,tables);
        
        }else  if(queryAction === "create"){
          
            queryText += cureOB.d;
        
        }
    }
    
    return queryText;
}
module.exports = makeQuery