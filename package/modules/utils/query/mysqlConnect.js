
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
const isInsertQuery = (ob)=>{
  const query = ob.query;
  for(var q = 0 ; q < query.length;q++){
    const cureAction = query[q].a;
    if(cureAction === 'in' ){
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
  return isAutoLimit_;
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
const getTables =(ob)=> {
  let query = ob.query;
  let back = [];

  for (let q in query) {
      let cureAction = query[q].j;
      
      for (let c in cureAction) {
          let cureTableName = cureAction[c].n;
          back.push(cureTableName);
      }
  }

  return back;
}
const updateBack = (result,selectables)=>{
  for(var r = 0 ; r < result.length;r++){
    const row = result[r];
    for (const columnName in row) {
      const dataColumn =  row[columnName] ;
        if (Object.hasOwnProperty.call(row, columnName)) {
            if (selectables.includes(columnName)) {
              row[columnName] = JSON.parse(dataColumn);
            } else {
              row[columnName] = dataColumn;
            }
      }
    }
     result[r] = row;
  }
 return result;
}
const mysqlConnect = async (body, res_, callBack) => {

    const dbConfig = dbConfigFn.get();
    
    if(dbConfig && dbConfig.host  && dbConfig.user  && dbConfig.password ){

    
    const queryText   = await makeQuery( body, dbConfig.tables);
    if(queryText){
    const queryTextUp = await makeQuery({query:[{a:'checkUpTime',ob:body}]}, dbConfig.tables);
    const querySize   = await makeQuery({query:[{ a:'querySize',ob:body}]}, dbConfig.tables);
    const stQueryText = queryText.toString();
    const selectedTables = getTables(body);
    const connection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
          } );

          if(isGetQuery(body)){
            connection.connect();
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
                  connection.query(`${stQueryText}`, (queryError, results, fields) => {
                  
                    if (queryError) {
                      console.error("Error executing MySQL query:", queryError.message);
                      reject(queryError);
                    } else {

                      resolve(results);
                      connection.end();
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
                connection.query(`${stQueryText}`, (queryError, results, fields) => {
                 
                  if (queryError) {
                    console.error("Error executing MySQL query:", queryError.message);
                    reject(queryError);
                  } else {
                    resolve(results);
                    connection.end();
                  }
                });
              });
            
              const backResult = COPY_OB(results);
              const backResultUpdate = updateBack(backResult,selectedTables);
                if(typeof callBack === 'function'){
                  callBack(backResult, res_,makeUpTodateData,Qsize);
                }
  
              return backResult;
            }
        
          }else{
            connection.connect();
                      const results = await new Promise((resolve, reject) => {
                        connection.query(`${stQueryText}`, (queryError, results, fields) => {
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
                          
                          if (queryError) {
                            console.error("Error executing MySQL query:", queryError.message);
                            reject(queryError);
                          } else {
                            resolve(upTime);
                            connection.end();
                          }
                        });
                      }); 
                      const upTimeData = COPY_OB(upTime);
                      const makeUpTodateData = makeUpTodate(upTimeData);
                        if(typeof callBack === 'function'){
                          
                          if(isInsertQuery(body)){
                            callBack(backResult.insertId, res_,makeUpTodateData,false);
                          
                           }else{
                            callBack(backResult, res_,makeUpTodateData,false);
                           }
                        }
                        if(isInsertQuery(body)){
                        
                         return backResult.insertId;
                        }else{
                          return backResult;
                        }
                     
          }
        }else{
          if(typeof callBack === 'function'){
            callBack([], res_,[{sorry:true}],false);
          }

          return false;
        }
        }else{
            return false;
          
        }
};

module.exports = mysqlConnect;
