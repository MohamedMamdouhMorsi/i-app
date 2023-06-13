const tools = {
    start(){
        console.log('start tools');
    }
}
const router = {
    routes: {},
    get(url, callback,data) {
        console.log(url, callback,data)
      this.routes[url]= { callback,data };
    },
    match(req, res) {
      if (this.routes[req.url]) {
       // console.log(matchingRoute)
       this.routes[req.url].callback(req, res,this.routes[req.url].data,tools);
        return true;
      } else {
       // console.log(this.routes)
        return false;
      }
    }
  };
  
  module.exports = router;