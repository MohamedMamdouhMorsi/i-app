const db = require('../../query/mysqlConnect');

const checkUser = (userData,res)=>{
   
 if(userData.phonenumber){
    const callback =(dbres)=>{
        if(dbres.length > 0){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: true}));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false}));
        }
    }
    db({query:[{a:'get',n:'users',l:'1',q:[[['phonenumber',userData.phonenumber,'eq']]]}]},false,callback);
 }else  if(userData.username){
    const callback =(dbres)=>{
        if(dbres.length > 0){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: true}));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false}));
        }
    }
    db({query:[{a:'get',n:'users',l:'1',q:[[['username',userData.username,'eq']]]}]},false,callback);
 }else  if(userData.email){
    const callback =(dbres)=>{
        if(dbres.length > 0){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: true}));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false}));
        }
    }

    db({query:[{a:'get',n:'users',l:'1',q:[[['email',userData.email,'eq']]]}]},false,callback);
 }
}
module.exports = checkUser;