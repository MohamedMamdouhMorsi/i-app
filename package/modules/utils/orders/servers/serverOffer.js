const db = require('../../query/mysqlConnect');

const serverOffer = (userData,req,res)=>{
  

    db({
        query:[
            {
                a:'up',
                n:'usersSessions',
                d:[[5,userData.dns]],
                q:[[[1,req.user.id,'eq']]],
                l:1
            }
            ]
            },
                res,
                ()=>{
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ res: true}));
                });
}
module.exports = serverOffer;