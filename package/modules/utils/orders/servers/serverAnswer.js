const db = require('../../query/mysqlConnect');


const serverAnswer = (userData,req,res)=>{
   
   db({
        query:[
                {
                    a:'in',
                    n:'answers',
                    d:[userData.oid,userData.owner, req.user.deviceToken, userData.dns]
                }
            ]
            },
                res,
                (reso,res_)=>{
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ res: true}));
                    
                  });
                
}
module.exports = serverAnswer;