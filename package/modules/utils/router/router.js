const {checkForSqlInjection} = require('../../tools');


const router = {
    routes: {},
    get(url, callback,data) {
      this.routes[url]= { callback,data };
    },
   async match(req, res) {
      const checkInjection = checkForSqlInjection(req.url);

      if(!checkInjection){
        const urlArr = req.url.split("?");
        var url_ = req.url;
        const getQ = {};
              
        if(urlArr.length > 0){
          url_ = urlArr[0];

          if(urlArr[1] && urlArr[1] !== ""){
            const getQF = urlArr[1].split("&");
              if(getQF && getQF.length > 0){
                for(var i = 0 ; i < getQF.length;i++){
                  const getQFR = getQF[i].split("=");
                  if(getQFR[0] && getQFR[1]){
                      const key = getQFR[0] ;
                      const val = getQFR[1] ;
                      getQ[key] = val;
                  }
                }
              }

          }
         
        }else{
          return false;
        }

      if (this.routes[url_]) {
          
        return await this.routes[url_].callback(req, res,getQ,this.routes[url_].data);
     
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