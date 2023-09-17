
const dbConfigFn = require('./dbConfig');
const {JD_,COPY_OB} = require('../../tools');
const creatAUTH = require('../toolsFN/createAUTH');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery    = require('./makeQuery');
const isGetQuery = (ob)=>{
  const query = ob.query;
  for(var q = 0 ; q < query.length;q++){
    const cureAction = query[q].a;
    if(cureAction === 'get' || cureAction === 'getJ'){
      return true;
    }
    
  }
  return false;
}
const isUpToDate = (userDate,dbDate)=>{
  var process = true;
  for(var d = 0 ; d < dbDate.length ; d++){
    const AUTH = dbDate[d];
    let find = false;
    for(var u = 0 ; u < userDate.length; u++){
      const userAUTH = userDate[u];
      if(AUTH === userAUTH){
        find = true;
      }
    }
    if(!find){
      process = false;
    }
  }
  return process;
}
const isAutoLimit = (ob)=>{
  var isAutoLimit_ = false;
  for(var i = 0 ; i < ob.length;i++){
    if(ob.limitAuto){
      isAutoLimit_ = true;
    }
  }
  return true;
}
const makeUpTodate =(dbDate)=>{
  const AUTHARRAY = [];
  for(var d = 0 ; d < dbDate.length ; d++){
    const dbString = `${dbDate[d].TABLE_NAME}_${dbDate[d].UPDATE_TIME}`;
    const AUTH = creatAUTH(dbString);
    AUTHARRAY.push(AUTH);
  }
  return AUTHARRAY;
}
const mysqlConnect = async (body, res_, callBack) => {

    const dbConfig = dbConfigFn.get();
    
    if(dbConfig && dbConfig.host  && dbConfig.user  && dbConfig.password ){

    
    const queryText   = await makeQuery(body, dbConfig.tables);
    const queryTextUp = await makeQuery({query:[{a:'checkUpTime',ob:body}]}, dbConfig.tables);
    const querySize   = await makeQuery({query:[{a:'querySize',ob:body}]}, dbConfig.tables);
  
          const connection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
          });

          connection.connect();

          if(isGetQuery(body)){

            const upTime = await new Promise((resolve, reject) => {
              connection.query(queryTextUp, (queryError, upTime, fields) => {
               
                if (queryError) {
                  console.error("Error executing MySQL query:", queryError.message);
                  reject(queryError);
                } else {
                  resolve(upTime);
                }
              });
            }); 
            let Qsize = 0;
            if(querySize && querySize !== undefined && querySize !== ''){
              console.log(['querySize',querySize,JSON.stringify(body)]);
              Qsize = await new Promise((resolve, reject) => {
                connection.query(querySize, (queryError, Qsize, fields) => {
               
                  if (queryError) {
                    console.error("Error executing MySQL query:", queryError.message);
                    reject(queryError);
                  } else {
                    resolve(Qsize);
                  }
                });
              });
         
              console.log(['Qsize',Qsize])
            }
            
           
            const upTimeData = COPY_OB(upTime);
            const makeUpTodateData = makeUpTodate(upTimeData);
            
            if(body.upTime){

              const isUpdated = isUpToDate(body.upTime,makeUpTodateData);
              if(isUpdated){
                connection.end();
               
                if(typeof callBack === 'function'){
                  callBack("UPTODATE", res_,makeUpTodateData,Qsize);
                }
  
              return "UPTODATE";
              }else{
                const results = await new Promise((resolve, reject) => {
                  connection.query(queryText, (queryError, results, fields) => {
                    connection.end();
                    if (queryError) {
                      console.error("Error executing MySQL query:", queryError.message);
                      reject(queryError);
                    } else {
                      resolve(results);
                    }
                  });
                });
              
                const backResult = COPY_OB(results);
               
                  if(typeof callBack === 'function'){
                    callBack(backResult, res_,makeUpTodateData,Qsize);
                  }
    
                return backResult;
              }
           
            }else{
              const results = await new Promise((resolve, reject) => {
                connection.query(queryText, (queryError, results, fields) => {
                  connection.end();
                  if (queryError) {
                    console.error("Error executing MySQL query:", queryError.message);
                    reject(queryError);
                  } else {
                    resolve(results);
                  }
                });
              });
            
              const backResult = COPY_OB(results);
              
                if(typeof callBack === 'function'){
                  callBack(backResult, res_,makeUpTodateData,Qsize);
                }
  
              return backResult;
            }
        
          }else{
  
                      const results = await new Promise((resolve, reject) => {
                        connection.query(queryText, (queryError, results, fields) => {
                          if (queryError) {
                            console.error("Error executing MySQL query:", queryError.message);
                            reject(queryError);
                          } else {
                            resolve(results);
                          }
                        });
                      });
                    
                      const backResult = COPY_OB(results);
                      const upTime = await new Promise((resolve, reject) => {
                        connection.query(queryTextUp, (queryError, upTime, fields) => {
                          connection.end();
                          if (queryError) {
                            console.error("Error executing MySQL query:", queryError.message);
                            reject(queryError);
                          } else {
                            resolve(upTime);
                          }
                        });
                      }); 
                      const upTimeData = COPY_OB(upTime);
                      const makeUpTodateData = makeUpTodate(upTimeData);
                        if(typeof callBack === 'function'){
                          callBack(backResult, res_,makeUpTodateData,false);
                        }

                      return backResult;
          }
        }else{
          if(typeof callBack === 'function'){
            callBack([], res_,makeUpTodateData,false);
          }

        return false;
        }
/*} catch (err) {
    console.log(
      "No db.app file exists!! To connect to the MySQL DB, you need to create db.app file to store your db connection data"
    );
   
    if(typeof callBack === 'function'){
      callBack(err.message, res_);
    }
    return false;
  }*/
};

module.exports = mysqlConnect;
