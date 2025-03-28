const {searchFiles,getContentType,iAppReader} = require('../../main');
const iAppReadSave = require('../../utils/toolsFN/iAppReadSave');

const {JDS_} = require('../../tools');
const path = require('path');
const fs = require('fs');
const isUrlFilleApp =(url)=>{
  const urlArr = url.split('.app');
  if(urlArr.length  > 1){
    return true;
  }
  return false;
}

const isUrlDevApp =(url)=>{
  const urlArr = url.split('dev_');
  if(urlArr.length  > 1){
    return true;
  }
  return false;
}
const app_file =(req,res,ext,fileName,manifest,tree,userDir,i_app)=>{
    var backBody = null;
    var filePath = null;
    let isApp    = isUrlFilleApp(req.url);
    let isJson = false;
    let isDevUrl = isUrlDevApp(req.url);
  if(isDevUrl){
    const dev_ = req.url.split('/');
    let fileNamedev = dev_[dev_.length-1];
    filePath = path.join(__dirname, '..','..','..','elements',fileNamedev);
    isApp = true;
  }else   if (req.url.match(/models/)) {
      
    const model = req.url.replace(/\/models\//,'');

    filePath = path.join(__dirname, '..','..','..','lib','models',model);
    fs.readFile(filePath, (err, data) => {
      if (err) {
    
       res.writeHead(500, { 'Content-Type': 'text/html' });
       res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
      } else {
   
   
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end(data);
    
      return true;
      }
    });
    return true;
}else if (req.url === '/countryFlags.json') {

      filePath = path.join(__dirname, '..','..','..','img','flags','countryFlags.json');
      isApp = true;

}else if (req.url === '/manifest.json') {

        backBody = JDS_(manifest);
        isApp = true;
} else if (backBody == null && req.url === '/i.app') {
        backBody = JSON.stringify(i_app);
        isApp = true;
}else{

      if (req.url === '/limitAuto.app' ) {
        filePath = path.join(__dirname, '..','..','..','elements','limitAuto.app');
        isApp = true;
      }else  if (req.url === '/sl.app' ) {
        filePath = path.join(__dirname, '..','..','..','elements','sl.app');
        isApp = true;
      }else if (req.url === i_app.dir.src+"dev.app" && i_app.mode === 'dev' ) { 
        filePath = path.join(__dirname, '..','..','..','elements','dev.app');
        isApp = true;
      }else {

        if(filePath == null && backBody == null && ext === '.app'){

              if(i_app.mode  && i_app.mode == 'dev'){

                filePath = path.join(userDir,'public', req.url);
                isApp = true;

              }else{

                const app_file_test = fileName +".app";
                const is_app_file   = searchFiles(tree,app_file_test);
                      backBody = is_app_file.fileData;
                      isApp    = true;

              }

        }else  if(filePath == null && backBody == null && ext === '.json'){

                      isJson   = true;
                      filePath = path.join(userDir,'public', req.url);

        }
        
      }
    }

   
    if(backBody == null && filePath !== null){
      
        const extname     = path.extname(filePath);
        const contentType = getContentType(extname);

       fs.access(filePath, fs.constants.F_OK, (err) => {

           if (err) {

             res.writeHead(404, { 'Content-Type': 'text/html' });
             res.end(`<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);

           } else {

             fs.readFile(filePath, (err, data) => {
               if (err) {
             
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');

               } else {

                const appData = iAppReadSave(data.toString(),req.url,i_app.dir.src);

                if(isJson){

                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(data);

                }else if(appData.page || isApp){

                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(appData);

                }else{

                  res.writeHead(400, { 'Content-Type': 'text/html' });
                  res.end('<h1>400 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');

                }
               
               }
             });
           }
         });
    }else{
        if(backBody !== null){
          
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(backBody);
        }else{
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
         
        }
    }
}
module.exports = app_file