const http = require('http');
const path = require('path');
const fs = require('fs');


const getContentType = (extname) => {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'text/plain';
  }
};
const Iapp = ()=>{
  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    if (req.url === '/') {
      filePath = path.join(__dirname, 'public', 'index.html');
    }else{
      const search = req.url.split('?');
      if(search.length > 1){
        filePath = path.join(__dirname,'public', search[0]);
      
      }
    }
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);
console.log("ttt:"+fs.existsSync(filePath))
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



server.listen(3000, () => {
  console.log('i-server listening on port 3000');
});

}

module.exports =Iapp