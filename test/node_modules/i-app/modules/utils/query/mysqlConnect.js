
const iAppReader = require('../toolsFN/iAppReader');
const {JD_,COPY_OB} = require('../../tools');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery    = require('./makeQuery');
const mysqlConnect = async (body, res_, callBack) => {
 
  const userDir = path.dirname(require.main.filename); 
  const i_app_db_path = path.join(userDir, 'db.app');
  

//  try {
    const DBfileData = await fs.readFileSync(i_app_db_path);
    const dbConfigTx = iAppReader(DBfileData.toString());
    const dbConfig = JD_(dbConfigTx).mysql[0];
    const queryText = await makeQuery(body, dbConfig.tables);
    const connection = mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
    });

    connection.connect();

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
  callBack(backResult, res_);
}

    return backResult;
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
