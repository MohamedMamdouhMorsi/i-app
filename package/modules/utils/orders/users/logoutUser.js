const routerUsers = require('../../router/routerUsers');
const db = require('../../query/mysqlConnect');
const logoutUser =(req,res)=>{
    if(req.user && req.user.deviceToken){
        console.log("is logout" )
    const timestamp_      = new Date(Date.now());
    db({
        query:[
            {
                a:'up',
                n:'usersSessions',
                d:[[3,"FALSE"]],
                d:[[5,"FALSE"]],
                q:[[[1,req.user.id,'eq']]],
                l:1
            }
            ]
            },
                res,
                false);

    routerUsers.del(req.user.deviceToken);
    res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`]);
        }  
   return res;

}
module.exports = logoutUser