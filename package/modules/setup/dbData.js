const fs = require('fs');
const {JD_} = require('../tools');
const {iAppReader} = require('../main');
const dbConfigFn = require('../utils/query/dbConfig');
const dataBaseUpddate = require('./dataBaseSetup/dataBaseUpdate');
const dbData = (i_app,i_app_db_path)=>{
    fs.readFile(i_app_db_path, (err, data) => {
        if (err) {
            console.log('Please add db.app to your project main directory with your Database conifguration or delete or comment users key from i-app'+i_app_db_path)
            return false;
        }else{
        
            let dbSt            = data.toString();
            let cleanDataSt     = iAppReader(dbSt)
            const jsonData      = JD_(cleanDataSt);
            if(jsonData && jsonData.mysql && jsonData.mysql.length > 0){
                dbConfigFn.set(jsonData.mysql[0]);
                dataBaseUpddate(i_app);
            }
        }});
}
module.exports = dbData