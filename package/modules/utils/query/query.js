const mysqlConnect = require('./mysqlConnect');


const query = (body,res_)=>{
   
    const callBack = (data,res,upTime,Qsize)=>{
        var Qsize_ = 0;
        if(typeof Qsize === 'number'){
            Qsize_ = Qsize;
       }else{
        Qsize_ = Qsize.length;
    }
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ res: data, upTime:upTime,Qsize:Qsize_}));
    }

    return   mysqlConnect(body,res_,callBack);

  

}

module.exports = query