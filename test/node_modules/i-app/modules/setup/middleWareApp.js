const path = require('path');
const fs = require('fs');
const sessionsControl = require('./sessionsControl');
const {searchFiles,getContentType,api,createAppHead} = require('../main');
const {JDS_,CL_,JD_,getfileName} = require('../tools');
let red = 0;

   
const middleWareApp =(req,res,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript])=>{
    const userData = sessionsControl(req,res,i_app);
    const fileName = getfileName(req);
    const app_file_test = fileName+".app";
    const is_app_file = searchFiles(tree,app_file_test);
    const htmlBody = createAppHead(i_app,colorPR_D,userData);
    let backBodyError = `<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`;
    let backBody = backBodyError;
    let contentType = 'text/html';
    let filePath = null;

    if(req.url === '/api'){
        return api(req,res);
    }else
    if(is_app_file.type || req.url === '/'){
        backBody = htmlBody;
    }else if (req.url === '/manifest.json') {
        contentType =  'application/json';
        backBody = JDS_(manifest);
    }else if (req.url === '/sw.js') {
        contentType =  'text/javascript';
        backBody = swScript;
    }else if (req.url === '/i.app') {
        contentType =  'application/json';
        backBody =i_app_st;
    }else if (req.url === '/i-app-ui.js' ) {
        filePath = path.join(__dirname, '..','..','i-app-ui.js');
    }else if (req.url === '/icofont.css') {
        filePath = path.join(__dirname,'..','..','css', 'icofont.css');
    }else if (req.url === '/i-app.css' ) {
        filePath = path.join(__dirname,'..','..','css', 'i-app.css');
    }else{
        const search = req.url.split('?');
        if(search.length > 1){
          let fileNameSearch = search[0];
          fileNameSearch = fileNameSearch.replace(/\//g,'');
  
              if(fileNameSearch == "" || searchFiles(tree,fileNameSearch+".app") && searchFiles(tree,fileNameSearch+".app").name || searchFiles(tree,fileNameSearch+".json") && searchFiles(tree,fileNameSearch+".json").name){
                backBody = htmlBody;
              }else{
                filePath = path.join(userDir,'public', search[0]);
              }
  
        }else{
          if(searchFiles(tree,fileName+".app") && searchFiles(tree,fileName+".app").name ||
           searchFiles(tree,fileName+".json") && searchFiles(tree,fileName+".json").name){
            backBody = htmlBody;
          }else{
            filePath = path.join(userDir,'public', req.url);
          }
  
        }
       
    }
    if(filePath !== null){
        const extname = path.extname(filePath);
         contentType = getContentType(extname);
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
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(backBody);
    }

}
module.exports = middleWareApp