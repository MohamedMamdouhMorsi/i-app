const appDir = require('../../setup/appDir');
const iAppReader = require('../iAppReader');
const {JDS_,CL_,JD_} = require('../../tools');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery    = require('./makeQuery');


const mysqlConnect = (body,res_,callBack)=>{
  const i_app_db_path = appDir().i_app_db_path

    fs.readFile(i_app_db_path,(err, DBfileData)=>{

      if (err) {
        console.log("No db.app file exist !! to connect to mysql DB you need to create db.app file to store your db connection data")
      }else{
        const dbConfigTx = iAppReader(DBfileData.toString());
        const dbConfig = JD_(dbConfigTx).mysql[0];
        const queryText = makeQuery(body,dbConfig.tables);
      
        const connection = mysql.createConnection({
              host: dbConfig.host,
              user: dbConfig.user,
              password: dbConfig.password,
              database: dbConfig.database
          });
          
          connection.query(queryText, (error, results, fields) => {
              if (error) throw error;
                    callBack(results,res_);
            });
          
          connection.end();
      }

    });
}
module.exports = mysqlConnect