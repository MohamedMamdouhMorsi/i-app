const routerUsers = require('../../router/routerUsers');
const db = require('../../query/mysqlConnect');
const setUserOffline =(body,req,res)=>{
    db({
        query:[
            {
                a:'up',
                n:'usersSessions',
                d:[[5,"FALSE"]],
                q:[[[1,req.user.id,'eq']]],
                l:1
            }
            ]
            },
                res,
                false);

    routerUsers.del(req.user.deviceToken);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ res: true}));

}
module.exports = setUserOffline