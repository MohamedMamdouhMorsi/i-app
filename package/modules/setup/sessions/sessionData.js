
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const routerUsers = require('../../utils/router/routerUsers');
const db = require('../../utils/query/mysqlConnect');
const sessionData = async (req,res,app,data)=>{
  let userData = {id:0 };
 
    const deviceInfo = getDeviceInfo(req);
    const fingerPrint   = deviceInfo.fingerPrint;
    const timestamp_    = new Date(Date.now());
    const expires       = new Date(Date.now() + 9000);

    let cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    let deviceId ,timestamp,userId;
    
    for (let cookie of cookies) {
      let [name, value] = cookie.split('=');
          if (name === 'deviceId') {
            deviceId = value;
          } else  if (name === 'timestamp') {
            timestamp = value;
          } else if (name === 'userId') {
            userId = value;
          }
    }
    
    if (userId && userId !== undefined && deviceId && deviceId !== undefined && timestamp && timestamp !== undefined) {
     
      const authSt = `${fingerPrint}-${timestamp}`;
      const cureDeviceId = creatAUTH(authSt);
      if(deviceId === cureDeviceId){
      const chickUserData = routerUsers.get(userId);
    
        if(chickUserData.id && chickUserData.id  > 0){
          if(chickUserData.deviceToken && cureDeviceId === chickUserData.deviceToken){
          userData = chickUserData;
          req.user = userData;
          app(req,res,data, userData);
        }else{
          userData.notSecure = true;
          res.destroySession = true;
          console.log(['sessionData1',deviceId])
          res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
          app(req,res,data, userData);
      }}else{
        userData = chickUserData;
        req.user = userData;
        res.darkData = 'amazing';
        app(req,res,data, userData);
      }
         
              }else{
                userData.notSecure = true;
                res.destroySession = true;
                console.log(['sessionData2',deviceId])
                res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
               
                app(req,res,data, userData);
              }
    }   else{
      userData.noAuth = true;
      app(req,res,data, userData);
    }
 
   
}
module.exports = sessionData