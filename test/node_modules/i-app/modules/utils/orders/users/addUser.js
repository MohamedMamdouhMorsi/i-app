const db = require('../../query/mysqlConnect');
const creatAUTH = require('../../toolsFN/createAUTH');
const addUser = (userData,res)=>{

 userData = userData.data;
 console.log(userData);
 const callBack = (res_,res)=>{
    const userId  = res_.insertId;
    const passHash = creatAUTH(userData.password);
    db({query:[{a:'in',n:'usersPasswords',d:[userId,passHash]}]},false,false);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify({ res: true}));
 }
 db({query:[{a:'in',n:'users',d:[userData.username,userData.firstname,userData.lastname,userData.email,userData.phonenumber,'1']}]},res,callBack)
}
module.exports = addUser;