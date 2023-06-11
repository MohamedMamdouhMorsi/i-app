const db = require('../../query/mysqlConnect');

const checkUser = (userData,res)=>{
 if(userData.phonenumber){
    const callback =(dbres)=>{
        if(dbres.length > 0){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false}));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: true}));
        }
    }
    db([{a:'get',n:'users',q:[[['phonenumber',userData.phonenumber,'eq']]]}],false,callback);
 }
}
module.exports = checkUser;