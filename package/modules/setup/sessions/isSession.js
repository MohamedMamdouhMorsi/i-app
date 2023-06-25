
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const routerUsers = require('../../utils/router/routerUsers');

const isSession =  (req)=>{

 
    const deviceInfo = getDeviceInfo(req);
    const fingerPrint   = deviceInfo.fingerPrint;


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
        return true;
        }else{
        return false;
        }
    }
}
   
}
module.exports = isSession