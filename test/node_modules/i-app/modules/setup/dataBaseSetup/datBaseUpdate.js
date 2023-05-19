const db = require('../../utils/query/mysqlConnect');
const appDir = require('../appDir');
const iAppReader = require('../../utils/toolsFN/iAppReader');
const {JDS_,CL_,JD_} = require('../../tools');
const path = require('path');
const iAppFileMaker = require('../../utils/toolsFN/iAppFileMaker');
const fs = require('fs');
const dataBaseUpddate = (i_app)=>{
    const i_app_db_path = appDir().i_app_db_path;
//check if users system
if(i_app.users){
    const callBack =(res)=>{}
    if(!fs.existsSync(i_app_db_path)){
        
        console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app')
        return false;

      }else{

        fs.readFile(i_app_db_path, (err, data) => {
            if (err) {
                console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app')
                return false;
            }else{
            
                let dbSt  = data.toString();
                let cleanDataSt = iAppReader(dbSt)
                let jsonData    = JD_(cleanDataSt);
                const basicDB = ['users','usersSessions','usersPasswords'];
                let needDB =[];
                const createdDB = [];
                if(jsonData.tables){
                
                    for(var k = 0 ; k < basicDB.length;k++){
                        
                            const testDB = basicDB[k];
                            
                            let isExist = false;
                        
                      
                                if(jsonData.tables[testDB]){
                                    isExist = true;
                                }
                            

                            if(!isExist){
                                needDB.push(testDB);
                            }else{
                                createdDB.push(dbName)
                            }
                    }

               }else{
                needDB = basicDB;
               }
            
            
               for(var i = 0 ; i < needDB.length; i++){
                const dbName = needDB[i];
                const connect = db({query:[{a:'check',n:dbName}]}, false, callBack);
                console.log('connect : '+connect)
                        if(connect === undefined){
                            const sqlFileName = `${dbName}.sql`;
                            const sqlFilePath = path.join(__dirname, 'basicDB',sqlFileName);
                            fs.readFile(sqlFilePath, (err, sqlData) => {
                                if(err){
                                    
                                    console.log('sql file is missing '+dbName)
                                }else{
                                    const sqlDataST = sqlData.toString();
                                  
                                    const createDBOrder = db({query:[{a:'create',d:sqlDataST}]}, false, callBack);
                                    console.log(['createDBOrder',createDBOrder])
                                    if(  createDBOrder){
                                        createdDB.push(dbName)
                                    }else{
                                        createdDB.push(dbName)
                                    }
                                }
                              
                            });
                           
                        }else{
                            createdDB.push(dbName);
                        }        
               }
               console.log(['createdDB',createdDB])
               if(createdDB.length > 0){
               
                        const basicDBPath = path.join(__dirname, 'basicDB','basicDB.json');
                            fs.readFile(basicDBPath, (err, basicDBdata) => {
                                if (err) {
                                    console.log('sql basicDB.json is missing')
                                    return false;
                                }else{
                                    for(var d = 0 ; d < createdDB.length; d++){
                                        const createdDBName = createdDB[d]; 
                                        jsonData.tables[createdDBName] = basicDBdata[createdDBName];
                                    }
                                    const db_app = JDS_(jsonData);
                                    const db_app_file =iAppFileMaker(db_app);
                                    fs.writeFile(i_app_db_path, db_app_file, (err) => {
                                        if (err)
                                          console.log(err);
                                        else {
                                          console.log("db.app update");
                                     
                                        }
                                      });
                                }

                            });
                
               }
              
         
    }

});
}
}
}
module.exports =dataBaseUpddate