const {searchFiles,getContentType} = require('../../main');
const {JDS_} = require('../../tools');
const path = require('path');
const fs = require('fs');
const app_file =(req,res,ext,fileName,manifest,i_app_st,tree,userDir,i_app)=>{
    var backBody = null;
    var filePath = null;
    if (req.url === '/manifest.json') {
    
        backBody = JDS_(manifest);
    
    } else if (backBody == null && req.url === '/i.app') {
        backBody =i_app_st;
    }else{
      if (req.url === '/sl.app' ) {
        filePath = path.join(__dirname, '..','..','..','elements','sl.app');
      }else {
        if(filePath == null && backBody == null && ext === '.app'){
          if(i_app.mode  && i_app.mode == 'dev'){
            filePath = path.join(userDir,'public', req.url);
          }else{
            const app_file_test = fileName+".app";
            const is_app_file = searchFiles(tree,app_file_test);
            backBody = is_app_file.fileData;
          }
      }else  if(filePath == null && backBody == null && ext === '.json'){
          filePath = path.join(userDir,'public', req.url);
      }
      }
        
  
      
    
    }

   
    if(backBody == null && filePath !== null){
        const extname = path.extname(filePath);
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
                
                 res.writeHead(200, { 'Content-Type': contentType });
                 res.end(data);
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