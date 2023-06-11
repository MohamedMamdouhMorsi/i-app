const apiRes = require('./apiRes');
const destroySession = ()=>{
  console.log("test")
}
function checkForSqlInjection(postData) {
  const sqlInjectionPattern = /\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?|INSERT(INTO)?|MERGE|SELECT|UPDATE)\b/i;
  
  for (const key in postData) {
    if (postData.hasOwnProperty(key)) {
      const value = postData[key];
      if (typeof value === 'string' && sqlInjectionPattern.test(value)) {
        // Potential SQL injection detected
        return true;
      }
    }
  }

  return false;
}
const api = (req, res) => {
    if (req.method === 'POST') {
      let reqBody = '';
  
      req.on('data', chunk => {
        reqBody += chunk.toString();
      });
     const checkInjection = checkForSqlInjection(reqBody);
     if(!checkInjection){
      req.on('end', () => {
        // Do something with the request body here
       
        apiRes(reqBody,res);
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
  
