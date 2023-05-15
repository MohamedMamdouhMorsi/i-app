const apiRes = require('./apiRes');
const api = (req, res) => {
    if (req.method === 'POST') {
      let reqBody = '';
  
      req.on('data', chunk => {
        reqBody += chunk.toString();
      });
  
      req.on('end', () => {
        // Do something with the request body here
       
        apiRes(reqBody,res);
      });
  
    } else {
      res.statusCode = 400;
      res.writeHead('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
  }
  
  module.exports = api;
  
