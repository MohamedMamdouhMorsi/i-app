
const {JDS_} = require('../../../tools');
const iAppFileMaker = require('../../toolsFN/iAppFileMaker');
const fs = require('fs');

const updateAppData = (appData,res,i_app_path)=>{
  if(appData.data){
    const db_app = JDS_(appData.data);
    const db_app_file =iAppFileMaker(db_app);
    fs.writeFile(i_app_path, db_app_file, (err) => {
      if (err)
        console.log(err);
      else {

          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JDS_({ res: true }));
      }
    });

  }else{
    console.log(['appData',appData])
  }

   

 }
   module.exports = updateAppData;