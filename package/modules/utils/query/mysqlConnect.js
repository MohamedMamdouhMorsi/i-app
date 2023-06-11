const appDir = require('../../setup/appDir');
const iAppReader = require('../toolsFN/iAppReader');
const {JDS_,CL_,JD_} = require('../../tools');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery    = require('./makeQuery');
const mysqlConnect = async (body, res_, callBack) => {
  const i_app_db_path = appDir().i_app_db_path;

  try {
    const DBfileData = await fs.promises.readFile(i_app_db_path);
    const dbConfigTx = iAppReader(DBfileData.toString());
    const dbConfig = JD_(dbConfigTx).mysql[0];
    const queryText = makeQuery(body, dbConfig.tables);

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

    callBack(results, res_);
    return results;
  } catch (err) {
    console.log(
      "No db.app file exists!! To connect to the MySQL DB, you need to create db.app file to store your db connection data"
    );
    callBack(err.message, res_);
    return false;
  }
};

module.exports = mysqlConnect;
