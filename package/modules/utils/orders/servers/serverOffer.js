const db = require('../../query/mysqlConnect');
const routerUsers = require('../../router/routerUsers');
const creatAUTH = require('../../toolsFN/createAUTH');
const getDeviceInfo = require('../../toolsFN/getDeviceInfo');

const serverOffer = (userData,req,res)=>{
  
    db({
        query:[
            {
                a:'up',
                n:'usersSessions',
                d:[[4,userData.dns]],
                q:[[[1,req.user.id,'eq']]],
                l:1
            }
            ]
            },
                res,
                false);
}
module.exports = serverOffer;