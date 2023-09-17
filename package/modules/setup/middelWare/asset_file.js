const path = require('path');
const fs = require('fs');
const {getContentType} = require('../../main');

const asset_file =(req,res,userDir,swScript,userData)=>{

    var filePath = null;
    var backBody = null;
    var contentType = null;
    var isUiJs = false;
    
    if (req.url === '/sw.js') {
      contentType =  'text/javascript';
      backBody = swScript;
    }else  if (req.url.match(/\/img\/flags\//)) {
        const img = req.url.replace(/\/img\/flags\//,'');
        filePath = path.join(__dirname, '..','..','..','img','flags',img);
    }else if (req.url === '/i-app-ui.js' ) {
        filePath = path.join(__dirname, '..','..','..','i-app-ui.js');
        isUiJs = true;
    }else  if (req.url === '/i-app-ui.min.js' ) {
      filePath = path.join(__dirname, '..','..','..','i-app-ui.min.js');
      isUiJs = true;
  }else if (req.url === '/icofont.css') {
        filePath = path.join(__dirname,'..','..','..','css', 'icofont.css');
    }else  if (req.url === '/app.png') {
      filePath = path.join(__dirname,'..','..','..','img', 'app.png');
    }else if (req.url === '/i-app-basic.css' ) {
        filePath = path.join(__dirname,'..','..','..','css', 'i-app-basic.css');
    }else  if (req.url === '/i-app-basic.min.css' ) {
      filePath = path.join(__dirname,'..','..','..','css', 'i-app-basic.min.css');
  }else  if (req.url === '/face-api.min.js' ) {
    filePath = path.join(__dirname,'..','..','..','lib', 'face-api.min.js');
}else  {

      let is_get = false;
      let lastUrl = req.url;
      let getBody = '';
      const urlArr = req.url.split('?');

      if(urlArr.length > 1){

        lastUrl  = urlArr[0];
        is_get   = true;
        getBody  = urlArr[1];
        filePath = path.join(userDir,'public', lastUrl);
      
      }else{

          if(filePath == null && backBody == null){
              filePath = path.join(userDir,'public', lastUrl);
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
                 if(isUiJs){
                  const userDataSt = `const userData = ${JSON.stringify(userData)}`;
                  const regex = /\/\/\*\*userDataArea\*\*\/\/?\n?/g;
                  data = data.toString().replace(regex,userDataSt);
                 }
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(data);
                }
              });
            }
          });
    }else{
      if(backBody !== null){
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(backBody);
      }else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<h1>404 Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
     
      }

    }

}
module.exports = asset_file