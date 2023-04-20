
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');
const {getDirectoryTree, getContentType, searchFiles, iAppReader} = require('./modules/main');
const {CL_, DC_, EC_, JDS_, JD_, arToSt, stToAr,getfileName} =require('./modules/tools');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { dirname } = require('path');
const messages = {
  iappError:"Please add i.app file in your project main directory : "
}


let i_app = {};
let port = 6000
let i_app_st = "";

const Iapp = ()=>{

  const userDir = path.dirname(require.main.filename); 
  const userPublicDir  = path.join(userDir, 'public');
  const tree = getDirectoryTree(userPublicDir);
  const i_app_path = path.join(userDir, 'i.app');

/**
 * 
 * read i.app data
 * 
 */

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
      let jsonData = JD_(cleanDataSt);
      if(jsonData){
        i_app = jsonData
        port = i_app.port
        server.listen(port, () => {
          console.log(`i-app-server start listening on port ${port}`);
        });
      }else{
        CL_("wrong syntax !! in i.app")
      }
      }
    });

  }
/**
 * start i-app server 
 * 
 * 
 */

  const server = http.createServer((req, res) => {
    const fileName = getfileName(req)
    const app_file_test = fileName+".app"

    const is_app_file = searchFiles(tree,app_file_test)
 
    let filePath = path.join(userDir, 'public', req.url === '/' ? 'index.html' : req.url);
    if(is_app_file.type){
      filePath = path.join(__dirname, 'index.html');
    }else
    if (req.url === '/i.app') {
      res.writeHead(200, { 'Content-Type': 'application/app' });
      res.end(i_app_st);
    }else  if (req.url === '/i-app-ui.js') {
      filePath = path.join(__dirname, 'i-app-ui.js');
      
    }else   if (req.url === '/i-app.css') {
      filePath = path.join(__dirname, 'i-app.css');
      
    }else if (req.url === '/') {
      filePath = path.join(__dirname, 'index.html');
    }else{
      const search = req.url.split('?');
      if(search.length > 1){
        filePath = path.join(userDir,'public', search[0]);
      
      }else{
       /* if(searchFiles(tree,req.url) && searchFiles(tree,req.url).name){
    
          filePath = searchFiles(tree,).path
        }*/
        if(searchFiles(tree,fileName+".app") && searchFiles(tree,fileName+".app").name || searchFiles(tree,fileName+".json") && searchFiles(tree,fileName+".json").name){
       
          filePath = path.join(__dirname, 'index.html');
        }
      }
    }


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
});





}

module.exports =Iapp