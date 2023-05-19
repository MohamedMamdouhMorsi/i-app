const appDir = require('../../setup/appDir');
const iAppReader = require('../toolsFN/iAppReader');
const {JDS_,CL_,JD_} = require('../../tools');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery    = require('./makeQuery');

const mysqlConnect = (body, res_, callBack) => {
  const i_app_db_path = appDir().i_app_db_path;

  fs.readFile(i_app_db_path, (err, DBfileData) => {
    if (err) {
      console.log(
        "No db.app file exists!! To connect to the MySQL DB, you need to create db.app file to store your db connection data"
      );
    } else {
      const dbConfigTx = iAppReader(DBfileData.toString());
      const dbConfig = JD_(dbConfigTx).mysql[0];
      const queryText = makeQuery(body, dbConfig.tables);

      const connection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
      });

      connection.connect((error) => {
        if (error) {
          const error_message = "Error connecting to MySQL database:"+ error.message;
          console.error(error_message);
          // You can handle the error by passing it to the callback
          callBack(error_message, res_);
      return false;
        } else {
         
          connection.query(queryText, (queryError, results, fields) => {
            if (queryError) {
              console.error("Error executing MySQL query:", queryError.message);
              // You can handle the query error by passing it to the callback
              callBack(queryError, res_);
            } else {
              callBack(results, res_);
            }
            connection.end();
            return results;
          });
        }
      });
    }
  });
};

module.exports = mysqlConnect;
