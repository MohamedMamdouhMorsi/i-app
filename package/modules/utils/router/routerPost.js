const {checkForSqlInjection,EC_} = require('../../tools');

const routerPost = {
    routes: {},
    post(url, callback,data) {

      this.routes[url]= { callback,data };
    },
  async  match(req, res) {
        const checkInjectionGET = checkForSqlInjection(req.url);
   
      if(!checkInjectionGET){
        var reqBody = '';
  
        req.on('data', chunk => {
          reqBody += chunk.toString();
        });
       
          req.on('end', () => {
            const msgArray  = reqBody.split("=");
            const msgBody   = msgArray[1];
            const msgDecode = EC_(msgBody);
            
            const checkInjectionPOST = checkForSqlInjection(msgDecode);
                if(!checkInjectionPOST){
                  const postBody = JSON.parse(msgDecode);
                    if (this.routes[req.url]) {
                          this.routes[req.url].callback(req, res,postBody,this.routes[req.url].data);
                          return true;
                      } else {
                          return false;

                      }
                } else {
                  res.statusCode = 500;
                  res.writeHead('Content-Type', 'application/json');
                  res.end(JSON.stringify({ message: 'Invalid request method' }));
                }
          });
              

          
    } else {
        res.statusCode = 500;
        res.writeHead('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invalid request method' }));
        
      }
    }
  };
  
  module.exports = routerPost;