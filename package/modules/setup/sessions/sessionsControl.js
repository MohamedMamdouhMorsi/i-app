
const creatAUTH = require('../../utils/toolsFN/createAUTH');
const getDeviceInfo = require('../../utils/toolsFN/getDeviceInfo');
const db = require('../../utils/query/mysqlConnect');
const routerUsers = require('../../utils/router/routerUsers');
const checkDB = {};

const sessionsControl = async (req,res,app,data)=>{

    let userData = {id: 0 };
    const deviceInfo      = getDeviceInfo(req);
    const fingerPrint     = deviceInfo.fingerPrint;
    const timestamp_      = new Date(Date.now());
    const expires         = new Date(Date.now() + 9000);
   
    let cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
    let deviceId , timestamp, userId;
    
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
            
          const isUser = (res_,res)=>{
                delete checkDB[deviceId];
             
                if(res_.length > 0){
               
                    if(chickUserData.id && chickUserData.id  > 0 ){
                      if(chickUserData.deviceToken ){
                        if(cureDeviceId === chickUserData.deviceToken){
                            userData =  res_[0];

                            const isUserCallback = (connectToken)=>{
                           
                              if(connectToken.length > 0){
                               
                                userData.connect = {
                                  ID: connectToken[0].userId,
                                  UT: connectToken[0].userToken,
                                  DT: connectToken[0].deviceToken,
                                  CT: connectToken[0].connectToken
                                }
                                if(connectToken[0].userId && connectToken[0].userId !== 0){
                                  db({
                                  query:[
                                      {
                                          a:'del',
                                          n:'answers',
                                          q:[[[2,connectToken[0].userId,'eq']]],
                                          l:'0'
                                      }
                                      ]
                                      },
                                      res,
                                      ()=>{});
                                    }
                                db({
                                  query:[
                                      {
                                          a:'up',
                                          n:'usersSessions',
                                          d:[[5,'FALSE']],
                                          q:[[[1,connectToken[0].userId,'eq']]],
                                          l:1
                                      }
                                      ]
                                      },
                                          res,
                                          ()=>{
                                            console.log('offer deleted')
                                          });
                              }
                              req.user = userData;
                              routerUsers.set(userData);
                             
                              app(req,res,data, userData);

                            }
                       
                            getConnection(userData.id, isUserCallback);
                          
                        }else{
                          userData.notSecure = true;
                          res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
                          res.destroySession = true;
                          app(req,res,data, userData);
                        }
                      }else{
                        app(req,res,data, userData);
                      }
                     
                  }  else{
                    userData =  res_[0];
                    const isUserCallback = (connectToken)=>{
                    
                      if(connectToken.length > 0){
                       
                          userData.connect = {
                              ID: connectToken[0].userId,
                              UT: connectToken[0].userToken,
                              DT: connectToken[0].deviceToken,
                              CT: connectToken[0].connectToken
                          }
                          if(connectToken[0].userId && connectToken[0].userId !== 0){
                            db({
                            query:[
                                {
                                    a:'del',
                                    n:'answers',
                                    q:[[[2,connectToken[0].userId,'eq']]],
                                    l:'0'
                                }
                                ]
                                },
                                res,
                                ()=>{}
                                );
                              }
                          db({
                            query:[
                                {
                                    a:'up',
                                    n:'usersSessions',
                                    d:[[5,'FALSE']],
                                    q:[[[1,connectToken[0].userId,'eq']]],
                                    l:1
                                }
                                ]
                                },
                                    res,
                                    ()=>{
                                      console.log('offer deleted')
                                    });
                      }
                      req.user = userData;
                      routerUsers.set(userData);
                      delete checkDB[deviceId];
                     
                      app(req,res,data, userData);
                    }
                    getConnection(userData.id, isUserCallback);
          
                  }
                
                }else{
                  userData.notSecure = true;
                  res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
                  res.destroySession = true;
              
                      app(req,res,data, userData);
                }
          }

          const getConnection = (id,callBack)=>{
       
            db({
                  query:[
                        {
                          a:'get',
                          n:'usersSessions',
                          q:[ 
                                [
                                  [1, id, 'uneq'],
                                  [5, 'FALSE', 'uneq']
                              ]
                            ],
                          s:["A"],
                          l:1
                          }
                    ]
              },
            res,
            callBack);
          }

          if(checkDB[deviceId]){
            app(req,res,data, userData);

          }else{
            checkDB[deviceId] = true;
            db({
              query:[
                {
                  a:'getJ',
                  n:'usersSessions',
                  q:[[[ 3, deviceId,'eq']]],
                  s:["A"],
                  l:1,
                  j: [{
                    n: "users",
                    q: [
                        [
                            [ 
                              1,
                              { 
                                "t": "q",
                                "d": "userId"
                               }, 
                                "eq"
                            ]
                        ]
                    ],
                    s: ["A"],
                    l: 1
                }]
                  }
                ]
              },
            res,
            isUser);
          }
          
      }else{
        const callBackK =()=>{
          console.log('answers deleted')
          } 
          if(userData.id && userData.id !== 0){
          db({
          query:[
              {
                  a:'del',
                  n:'answers',
                  q:[[[2,userData.id,'eq']]],
                  l:'0'
              }
              ]
              },
              res,
              callBackK);
            }

        userData.notSecure = true;
        res.setHeader('Set-Cookie',[ `deviceId=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `userId=''; Expires=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `timestamp=''; Expires=${timestamp_.toUTCString()}; HttpOnly; SameSite=Strict`, `destroy='true'; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`]);
        res.destroySession = true;
        app(req,res,data, userData);
      }
    } else {
      userData.noAuth = true;
      app(req,res,data, userData);
    }
 
   
}
module.exports = sessionsControl