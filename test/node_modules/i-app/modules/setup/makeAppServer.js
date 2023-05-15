const http = require('http');
const middleWareApp = require('./middleWareApp');
const makeAppServer = (port,data)=>{
    const server =new http.createServer((req, res) => {
        middleWareApp(req,res,data)
    });
    server.listen(port, () => {
        console.log(`i-app-server start listening on port ${port}`);
      });
}
module.exports = makeAppServer;