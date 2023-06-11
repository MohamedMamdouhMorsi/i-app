const getQuery =   require('./queryData/getQuery');
const getJQuery =   require('./queryData/getJQuery');
const insertQuery =   require('./queryData/insertQuery');
const updateQuery =   require('./queryData/updateQuery');
const deleteQuery =   require('./queryData/deleteQuery');
const checkQuery =   require('./queryData/checkQuery');
const makeQuery = async(body,tables)=>{
  
    const queryOB  = body.query;
    let queryText = "";

    for(var e = 0 ;  e < queryOB.length; e++){
        const cureOB = queryOB[e];
      
        let queryAction = cureOB.a;
      
        if(queryAction === "get"){
            queryText += getQuery(cureOB,tables);
           
        }else   if(queryAction === "getJ"){
            queryText += getJQuery(cureOB,tables);
           
        }else  if(queryAction === "in"){
          
            queryText += insertQuery(cureOB,tables);
        
        }else  if(queryAction === "up"){
          
            queryText += updateQuery(cureOB,tables);
        
        }else  if(queryAction === "del"){
          
            queryText += deleteQuery(cureOB,tables);
        
        }else  if(queryAction === "check"){
          
            queryText += checkQuery(cureOB);
        
        }else  if(queryAction === "create"){
          
            queryText += cureOB.d;
        
        }
    }
  
    return queryText;
}
module.exports = makeQuery