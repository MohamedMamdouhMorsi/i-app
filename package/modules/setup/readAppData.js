const path = require('path');
const fs = require('fs');
const {JDS_,CL_,JD_} = require('../tools');
const {searchFiles,manifestMaker,iAppReader} = require('../main');
const appDirFn= require('./appDir');

const dbData = require('./dbData');
const readAppData =async (makeAppServer)=>{
  // basic dir appDir
  let messages =  {
    iappError: "Please add i.app file to your project main directory",
    themeError: "Please fix style.json and make sure it's in the same directory as .css in i.app",
    dbAlert:"Warning: Your project does not have the profile and connection to the database. Please add the file if you are using the user system. If your project does not need a database, please do not pay attention to this warning."

  };

  let i_app    = {};
  let manifest = "";
  let port     = 6000;
  let i_app_st = "";

  // 
  let swScript = "";

  const {tree,userDir,userPublicDir,i_app_path,assetArray,i_app_db_path} =await appDirFn();

    


if(assetArray.length > 0){
  swScript = `const assete = ${JDS_(assetArray)};`;
  const swPath = path.join(__dirname,'..','..','modules','utils' ,'toolsFN','swTemplate.js');

  fs.readFile(swPath, (err, data) => {
            if (err) {
            CL_('Service Worker Template Error');
            }else{
            swScript += data;
            }
        }
    );
}
if(!fs.existsSync(i_app_path)){
  CL_(messages.iappError+" "+userDir)
  return false;
}else{
  fs.readFile(i_app_path, (err, data) => {
    if (err) {
      CL_(messages.iappError+" "+userDir)
    }else{
    i_app_st        = data.toString();
    let cleanDataSt = iAppReader(i_app_st);
    let jsonData    = JD_(cleanDataSt);
    
    if(jsonData){
      i_app = jsonData
      port  = i_app.port;

      const themeColorSearch =  searchFiles(tree,'style.json');
      if(themeColorSearch.type){

          const themeColorDir = path.join( themeColorSearch.path,'style.json');
          fs.readFile(themeColorDir, (err, dataStyle) => {
              if (err) {
                CL_(messages.themeError+" : "+themeColorDir);
                manifest = manifestMaker(i_app,false);
              }else{
                  const style = JSON.parse(dataStyle);
                  const styleColor = style.theme == "dark"?style.dc : style.lc;
               
                  const PR = styleColor.filter(e=>{
                      if(e.k == "PR"){
                          return e.v;
                      }
                  })[0];
  
                  const PR_D = styleColor.filter(e=>{
                      if(e.k == "PR_D"){
                          return e.v;
                      }
                  })[0];
                  
                  manifest = manifestMaker(i_app,{PR_D : PR_D , PR : PR})
                  const server =   makeAppServer(port,[i_app, PR_D.v,manifest,tree,userDir,i_app_st,swScript,i_app_path]);
                    if(!fs.existsSync(i_app_db_path)){
                      console.warn(messages.dbAlert);
                    }else{
                        dbData(i_app,i_app_db_path);
                    
                    }
                    return server;
                }
            });
          }else{
            manifest = manifestMaker(i_app,false)
         const server =   makeAppServer(port,[i_app, '#000',manifest,tree,userDir,i_app_st,swScript,i_app_path]);
              if(!fs.existsSync(i_app_db_path)){
                console.warn(messages.dbAlert);
              }else{
                dbData(i_app,i_app_db_path);
              
              }
           return server;
          }
          
  
    }else{
      CL_("wrong syntax !! in i.app")
    }
    }
  });

}



return true

}
module.exports = readAppData