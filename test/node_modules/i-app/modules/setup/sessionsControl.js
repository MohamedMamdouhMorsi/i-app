
const creatAUTH = require('../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../utils/toolsFN/getDeviceInfo');
const db = require('../utils/query/mysqlConnect');


const sessionsControl = async (req,res,app,data)=>{
  let userData = {id:0 };
 
    const deviceInfo = getDeviceInfo(req);
    const fingerPrint   = deviceInfo.fingerPrint;
   
    let cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];

    let deviceId ,timestamp;
    let userId = '1';
    
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
    
    if (userId && deviceId && timestamp) {
      const authSt = `${fingerPrint}-${timestamp}`;
      const cureDeviceId = creatAUTH(authSt);
      if(deviceId === cureDeviceId){
            const isUser = (res_,res)=>{
             
              if(res_.length > 0){
                userData =  res_[0];
               app(req,res,data, userData);
              }else{
                userData.notSecureDB = true;
                app(req,res,data, userData);
              }
            
            }

              db({
                query:[
                  {
                     a:'getJ',
                     n:'usersSessions',
                     q:[[[2,deviceId,'eq']]],
                     l:1,
                     j: [{
                      n: "users",
                      q: [
                          [
                              [1, { "t": "q", "d": "userId" }, "eq"]
                          ]
                      ],
                      s: ["username"],
                      l: 1
                  }]
                    }
                  ]
                },
              res,
              isUser);
                      
      }else{
        userData.notSecure = true;
        app(req,res,data, userData);
      }
    }   else{
      userData.noAuth = true;
      app(req,res,data, userData);
    }
 
   
}
module.exports = sessionsControl