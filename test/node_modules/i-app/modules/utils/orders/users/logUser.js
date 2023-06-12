const db = require('../../query/mysqlConnect');
const creatAUTH = require('../../toolsFN/createAUTH');
const getDeviceInfo = require('../../toolsFN/getDeviceInfo');

const logUser = (userData,req,res)=>{

 userData = userData.data;
if(typeof userData.username === 'string' && typeof userData.password === 'string'){
   const password = creatAUTH(userData.password);
   const expires  = new Date(Date.now() + 86400 * 1000);
  let userId = false;
const passwordIsTrue = (res_,res)=>{
  
   const deviceInfo    = getDeviceInfo(req);
   const fingerPrint   = deviceInfo.fingerPrint;
   const timestamp     = Date.now();
   const authDeviceSt  = `${fingerPrint}-${timestamp}`;
   const authUserSt    = `${fingerPrint}-${timestamp}-${password}`;
   const cureDeviceId  = creatAUTH(authDeviceSt);
   const cureUserId    = creatAUTH(authUserSt);
  
         if(userId && res_.length > 0){
 
       const setScureUser = (res_,res)=>{
         if(userId && res_.length > 0){ 
         db({query:[{a:'up',n:'usersSessions',d:[[2,cureDeviceId],[3,cureUserId]],q:[[[1,userId,'eq']]],l:1}]},res,false);

         res.setHeader('Set-Cookie',[ `deviceId=${cureDeviceId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=${cureUserId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=${timestamp}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
         res.writeHead(200, { 'Content-Type': 'application/json'});
         res.end(JSON.stringify({ res: true}));
      }else{
        db({query:[{a:'in',n:'usersSessions',d:[userId,cureDeviceId,cureUserId],l:1}]},res,false);
        res.setHeader('Set-Cookie',[ `deviceId=${cureDeviceId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=${cureUserId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=${timestamp}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ res: true}));
      }
       }
       db({query:[{a:'get',n:'usersSessions',q:[[['userId',userId,'eq']]],l:1}]},res,setScureUser);
         }else if(res_.length < 1){
        
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false}));

         }
   }
   const userExist = (res_,res)=>{
      if(res_.length > 0){ 
         const userData = res_[0] ;
          userId = userData.id;
       
         db({query:[{a:'get',n:'usersPasswords',q:[[['userId',userId,'eq'],['password',password,'eq']]],l:1}]},res,passwordIsTrue);
      }else{
         res.writeHead(200, { 'Content-Type': 'application/json'});
         res.end(JSON.stringify({ res: false}));
      }
      }
   db({query:[{a:'get',n:'users',q:[[['username',userData.username,'eq']]],l:1}]},res,userExist);


}
}
module.exports = logUser;