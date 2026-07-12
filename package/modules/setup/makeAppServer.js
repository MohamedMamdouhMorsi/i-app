const http = require('http');
const middleWareApp = require('./middleWareApp');

const makeAppServer = (port,data,get)=>{
    const domain = data[0].domain;
    
    const server =new http.createServer((req, res) => {
     
        middleWareApp(req,res,data);
     
    });
    server.listen(port, () => {
        console.log(`> i-app-server start `);
        console.log(`> listening on port ${port}`);
        console.log(`> Open App Link (Ctrl + Click) http://${domain}`);
    });
      return {close(){server.close()}};
}
module.exports = makeAppServer;