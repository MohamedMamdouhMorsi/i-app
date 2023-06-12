const {createAppHead} = require('../../main');
const route_file =(req,res,i_app,colorPR_D,userData)=>{
    const htmlBody = createAppHead(i_app,colorPR_D,userData);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlBody);
}
module.exports = route_file