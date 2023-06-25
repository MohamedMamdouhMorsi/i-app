const {checkForSqlInjection} = require('../../tools');
const router = {
    routes: {},
    get(url, callback,data) {
      this.routes[url]= { callback,data };
    },
    match(req, res) {
      const checkInjection = checkForSqlInjection(req.url);
      if(!checkInjection){
      if (this.routes[req.url]) {
       this.routes[req.url].callback(req, res,this.routes[req.url].data);
        return true;
      } else {
        return false;
      }
    } else {
      res.statusCode = 500;
      res.writeHead('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
    }
  };
  
  module.exports = router;