const routerUsers = require('../../router/routerUsers');
const setUserOffline =(body,req,res)=>{

console.log(req.user.deviceToken)
    routerUsers.del(req.user.deviceToken);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ res: true}));

}
module.exports = setUserOffline