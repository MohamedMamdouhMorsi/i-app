
const {JDS_} = require('../../../tools');
const iAppFileMaker = require('../../toolsFN/iAppFileMaker');
const fs = require('fs');
const path = require('path');
const updateTranslate = (appData,res,i_app_path,i_app)=>{

  if(i_app.dir.txt){
    const userDir = path.dirname(require.main.filename); 
    const fileName = `${appData.lang}.json`;
    const userPublicDir  = path.join(userDir, 'public',i_app.dir.txt,fileName);
    const db_app = JDS_(appData.data);

    fs.writeFile(userPublicDir, db_app, (err) => {
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
   module.exports = updateTranslate;