const http = require('http');
const middleWareApp = require('./middleWareApp');

const makeAppServer = (port,data,get)=>{
    const server =new http.createServer((req, res) => {

        middleWareApp(req,res,data);
     
    });
    server.listen(port, () => {
        console.log(`i-app-server start listening on port ${port}`);
      });
      return {close(){server.close()}};
}
module.exports = makeAppServer;