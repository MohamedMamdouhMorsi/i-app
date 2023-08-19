const iAppReader = require('../toolsFN/iAppReader');
const {JD_,COPY_OB} = require('../../tools');
const path = require('path');
const fs = require('fs');
const dbConfig = {
    db: {},
   get() {
    if(this.db.database){
        return this.db;
    }else{
        console.log("No DBConfig data")
    }
         
    },
     set(dbConfigJD) {
       
            this.db.host= dbConfigJD.host;
            this.db.user= dbConfigJD.user;
            this.db.password= dbConfigJD.password;
            this.db.database =  dbConfigJD.database;
            this.db.tables =  dbConfigJD.tables;
        
        return true;
    }
  };
  
  module.exports = dbConfig;