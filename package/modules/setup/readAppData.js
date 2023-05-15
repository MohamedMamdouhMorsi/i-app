const path = require('path');
const fs = require('fs');
const {JDS_,CL_,JD_} = require('../tools');
const {searchFiles,manifestMaker,createAppHead,iAppReader} = require('../main');
const appDir= require('./appDir');
const readAppData = (makeAppServer)=>{
  // basic dir appDir
const {tree,userDir,userPublicDir,i_app_path,assetArray} =appDir();

  let messages =  {
    iappError: "Please add i.app file in your project main directory",
    themeError: "Please fix style.json and make sure it's in the same directory as .css in i.app"
  };
  let i_app    = {};
  let manifest = "";
  let port     = 6000;
  let i_app_st = "";
  let htmlBody = "";
  // 
  let swScript = "";
  if(assetArray.length > 0){
    swScript = `const assete = ${JDS_(assetArray)};`;
    const swPath = path.join(__dirname,'modules','utils' ,'swTemplate.js');
      fs.readFile(swPath, (err, data) => {
              if (err) {
              CL_('swTemplateError')
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
      i_app_st = data.toString();
      let cleanDataSt = iAppReader(i_app_st)
      let jsonData    = JD_(cleanDataSt);
      if(jsonData){
        i_app = jsonData
        port = i_app.port;

        const themeColorSearch =  searchFiles(tree,'style.json');
        if(themeColorSearch.type){

            const themeColorDir = path.join( themeColorSearch.path,'style.json');
            fs.readFile(themeColorDir, (err, data) => {
                if (err) {
                  CL_(messages.themeError+" : "+themeColorDir);
                  manifest = manifestMaker(i_app,false);
                }else{
                    const style = JSON.parse(data);
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
                    htmlBody = createAppHead(i_app,PR_D.v);
                    manifest = manifestMaker(i_app,{PR_D : PR_D , PR : PR})
                    makeAppServer(port,[htmlBody,manifest,tree,userDir,i_app_st,swScript]);
                  }
              });
            }else{
              manifest = manifestMaker(i_app,false)
              makeAppServer(port,[htmlBody,manifest,tree,userDir,i_app_st,swScript])
            }
            
    
      }else{
        CL_("wrong syntax !! in i.app")
      }
      }
    });

  }
    

  
    return{
        tree:tree,
        userDir:userDir,
        userPublicDir:userPublicDir,
        i_app_path:i_app_path
    }
}
module.exports = readAppData