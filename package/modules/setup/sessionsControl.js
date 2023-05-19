const sessions = {}
const creatAUTH = require('../utils/toolsFN/createAUTH')
const db = require('../utils/query/mysqlConnect');
const setNewSession  = (res,userIP,expires)=>{
    const newSessionId = creatAUTH(expires.toUTCString());
    res.setHeader('Set-Cookie', `sessionId=${newSessionId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`);
    sessions[newSessionId] = {ip:userIP};
   }

const sessionsControl =(req,res,appData)=>{
   
    let sessionId = req.headers.cookie && req.headers.cookie.split('=')[1]? req.headers.cookie.split('=')[1] : false;
    const expires = new Date(Date.now() + 86400 * 1000);
    const userIP = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
    req.socket.remoteAddress;
    
    if(req.url === '/'){
        if(appData.uesrs){
       if(sessionId ){
                db({a:'get',n:'usersSessions',q:[[[2,sessionId,'eq']]],l:1},false,(userData)=>{
                    
                        if(userIP == sessions[sessionId].ip){
                            console.log(userData);
                            res.setHeader('Set-Cookie', `sessionId=${sessionId}; Expires=${expires.toUTCString()}; HttpOnly; SameSite=Strict`);
                        }else{
                            setNewSession(res,userIP,expires);
                        }

                        return userData;
                });
    
         }else{
            setNewSession(res,userIP,expires);
           }
         }
        }
      
}
module.exports = sessionsControl