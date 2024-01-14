const getQuery =   require('./queryData/getQuery');
const getJQuery =   require('./queryData/getJQuery');
const insertQuery =   require('./queryData/insertQuery');
const updateQuery =   require('./queryData/updateQuery');
const deleteQuery =   require('./queryData/deleteQuery');
const checkQuery =   require('./queryData/checkQuery');
const querySize =   require('./queryData/querySize');
const querySizeJoin =   require('./queryData/querySizeJoin');
const checkQueryUptime =   require('./queryData/checkQueryUptime');

const makeQuery = async(body,tables)=>{
  
    const queryOB  = body.query;
    let queryText = "";

    for(var e = 0 ;  e < queryOB.length; e++){
        const cureOB = queryOB[e];
      
        let queryAction = cureOB.a;
      
        if(queryAction === "get"){
            return  getQuery(cureOB,tables);
         
        }else   if(queryAction === "getJ"){
            return  getJQuery(cureOB,tables);
           
        }else  if(queryAction === "in"){
          
            return  insertQuery(cureOB,tables);
        
        }else  if(queryAction === "up"){
          
            return  updateQuery(cureOB,tables);
        
        }else  if(queryAction === "del"){
          
            return  deleteQuery(cureOB,tables);
        
        }else  if(queryAction === "check"){
          
            return  checkQuery(cureOB);
        
        }else   if(queryAction === "querySize"){
            
          if(cureOB.ob.query[0].a === 'get'){
            return  querySize(cureOB,tables);
          }else if(cureOB.ob.query[0].a === 'getJ'){
            return  querySizeJoin(cureOB,tables);
          }
            
        
        }else  if(queryAction === "checkUpTime"){
          
            return  checkQueryUptime(cureOB);
        
        }else   if(queryAction === "create"){
          
            return  cureOB.d;
        
        }
    }
    
   
}
module.exports = makeQuery