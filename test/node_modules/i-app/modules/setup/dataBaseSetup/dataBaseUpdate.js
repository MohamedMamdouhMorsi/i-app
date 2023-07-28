const db = require('../../utils/query/mysqlConnect');
const appDir = require('../appDir');
const iAppReader = require('../../utils/toolsFN/iAppReader');
const {JDS_,CL_,JD_} = require('../../tools');
const path = require('path');
const iAppFileMaker = require('../../utils/toolsFN/iAppFileMaker');
const fs = require('fs');
const dataBaseUpddate =async (i_app)=>{
    const {i_app_db_path} =await appDir();
//check if users system
if(i_app.users){
    const callBack =(res)=>{}
    if(!fs.existsSync(i_app_db_path)){
        
        console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app'+i_app_db_path)
        return false;

      }else{

        fs.readFile(i_app_db_path, (err, data) => {
            if (err) {
                console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app'+i_app_db_path)
                return false;
            }else{
            
                let dbSt            = data.toString();
                let cleanDataSt     = iAppReader(dbSt)
                const jsonData      = JD_(cleanDataSt);
                if(jsonData.mysql && jsonData.mysql.length > 0){

                const basicDataBase = jsonData.mysql[0];
                const basicTables =basicDataBase.tables ?basicDataBase.tables: false ; 
                const basicDB = ['users','usersSessions','usersPasswords','usersApps','usersType','typesApps','permissions','appsPermissions','usersPermissions'];
                const insertDB = {
                    usersApps:['users', 'Basic Users App'],
                    usersType:['admin', 'Basic Admin User'],
                    typesApps:[1,1],
                    permissions:[
                        ['create','Ability to create new orders'],
                        ['update','Ability to update existing orders'],
                        ['delete','Ability to delete orders'],
                        ['view','Ability to view order details'],
                        ['approve','Ability to approve orders']
                    ],
                    appsPermissions:[[1,1],[1,2],[1,3],[1,4],[1,5]],
                    usersPermissions:[[1,1,1],[1,1,2],[1,1,3],[1,1,4],[1,1,5]]
                }
                let needDB   = [];
                const editDB = [];
              
                if(basicTables){
                    
                    for(var k = 0 ; k < basicDB.length;k++){
                            const testDB  = basicDB[k];
                            const isExist = basicTables[testDB]? true: false;
                            
                            if(!isExist){
                                needDB.push(testDB);
                            }
                    }

               }else{
                needDB = basicDB;
               }
            const insertBasic = ()=>{
                for(var i = 0; i < editDB.length;i++){
                    const dbN = editDB[i];
                    if(insertDB[dbN]){
                        console.log(['insertDB',dbN]);
                        db({query:[{a:'in',n:dbN,d:insertDB[dbN]}]},dbN,callBack);
                    }
                }
            }
            const updateDBFILE = ()=>{
              
                if(editDB.length > 0){
                 
                    const basicDBPath = path.join(__dirname, 'basicDB','basicDB.json');
                        fs.readFile(basicDBPath, (err, basicDBdata) => {
                            if (err) {
                                console.log('sql basicDB.json is missing')
                                return false;
                            }else{
                                const basicDBdataJD = JD_(basicDBdata.toString())
                              
                                for(var d = 0 ; d < editDB.length; d++){
                                    
                                    const createdDBName = editDB[d]; 
                                  
                                   if(! jsonData.mysql[0].tables){
                                    jsonData.mysql[0].tables = {}
                                   }
                                    jsonData.mysql[0].tables[createdDBName] = basicDBdataJD[createdDBName];
                                }
                                const db_app = JDS_(jsonData);
                                const db_app_file =iAppFileMaker(db_app);
                                fs.writeFile(i_app_db_path, db_app_file, (err) => {
                                    if (err)
                                      console.log(err);
                                    else {
                                      console.log("db.app update");
                                      insertBasic();
                                 
                                    }
                                  });
                            }
    
                        });
            
                }
            }
            if(needDB.length > 0){
                console.log(["needDB",JSON.stringify(needDB)])
            const lastDB = needDB[needDB.length - 1];
               for(var i = 0 ; i < needDB.length; i++){
                    const dbName = needDB[i];
                     db({query:[{a:'check',n:dbName}]}, false, callBack).then(result=>{
                       if(result.length > 0){
                        editDB.push(dbName)
                        if(needDB.length == editDB.length){
                            console.log('all needed DB table Created');
                            updateDBFILE();
                           }
                       }else{
                        const sqlFileName = `${dbName}.sql`;
                        const sqlFilePath = path.join(__dirname, 'basicDB',sqlFileName);
                        fs.readFile(sqlFilePath, (err, sqlData) => {
                            if(err){
                                
                                console.log('sql file is missing '+dbName)
                            }else{
                                const sqlDataST = sqlData.toString();
                                 db({query:[{a:'create',d:sqlDataST}]}, false, callBack).then(creatResult=>{
                                    editDB.push(dbName)
                                    console.log(' DB :'+dbName+' created');
                                   
                                    if(needDB.length == editDB.length){
                                        console.log('all needed DB table Created');
                                        updateDBFILE();
                                       }
                                });
                                
                              
                            }
                       
                        });
                       }
                    }).catch(err=>{
                        console.log('err :'+err)
                    });
               
                       
               }
            }
   
      
              
        }else{
            console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app')
        }
    }

});
}
}
}
module.exports =dataBaseUpddate