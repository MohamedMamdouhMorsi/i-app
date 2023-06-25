const {checkForSqlInjection} = require('../../tools');

const routerPost = {
    routes: {},
    post(url, callback,data) {

      this.routes[url]= { callback,data };
    },
  async  match(req, res) {
        const checkInjectionGET = checkForSqlInjection(req.url);
   
      if(!checkInjectionGET){
        let reqBody = '';
  
        req.on('data', chunk => {
          reqBody += chunk.toString();
        });
        const checkInjectionPOST = checkForSqlInjection(reqBody);
        if(!checkInjectionPOST){
                if (this.routes[req.url]) {
                
                        req.on('end', () => {
                            this.routes[req.url].callback(req, res,reqBody,this.routes[req.url].data);
                            return true;
                        });
                    
                } else {
                    return false;
                }
    } else {
        res.statusCode = 500;
        res.writeHead('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invalid request method' }));
      }
    } else {
        res.statusCode = 500;
        res.writeHead('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Invalid request method' }));
      }
    }
  };
  
  module.exports = routerPost;