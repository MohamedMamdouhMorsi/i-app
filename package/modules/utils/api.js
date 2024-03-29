const apiRes = require('./apiRes');
const {checkForSqlInjection} = require('../tools');
const destroySession = ()=>{
  console.log("test")
}

const api = (req, res,i_app_path,i_app) => {
    if (req.method === 'POST') {
      let reqBody = '';
  
      req.on('data', chunk => {
        reqBody += chunk.toString();
      });
     const checkInjection = checkForSqlInjection(reqBody);
     if(!checkInjection){
      req.on('end', () => {
        apiRes(reqBody,req,res,i_app_path,i_app);
      });
     }else{
      destroySession();
     }
     
  
    } else {
      res.statusCode = 400;
      res.writeHead('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
  }
  
  module.exports = api;
  
