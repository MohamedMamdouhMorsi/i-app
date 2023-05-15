const mysqlConnect = require('./mysqlConnect');


const query = (body,res_)=>{
   
    const callBack = (data,res)=>{
       
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ res: data }));
    }

    mysqlConnect(body,res_,callBack);

}

module.exports = query