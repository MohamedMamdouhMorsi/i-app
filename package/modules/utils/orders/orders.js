const speechSynthesisData = require('./speechSynthesisData');
const addUser  = require('./users/addUser');
const checkUser  = require('./users/checkUser');
const logUser  = require('./users/logUser');
const countries  = require('./countries');
const languages  = require('./languages');
const icons  = require('./icons');
const setUserOffline  = require('./users/setUserOffline');
const dataBaseReport =  require('./users/dataBaseReport');
const orders  =(body,req,res)=>{
   if(body.order === 'countries'){
      return countries(res);
   }else if(body.order === 'languages'){
      return languages(res);
   }else  if(body.order === 'icons'){
      return icons(res);
   }else if(body.order === 'addUser'){
       return addUser(body,res);
   }else if(body.order === 'checkUser'){
      return checkUser(body,res);
   }else if(body.order === 'logUser'){
      return logUser(body,req,res);
   }else if(body.order === 'setUserOffline'){
      return setUserOffline(body,req,res);
   }else if(body.order === 'speechSynthesisData'){
      return speechSynthesisData(body,res);
   }else if(body.order === 'dataBaseReport'){
      return dataBaseReport(body,res);
   }else{
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ res: false}));
   }
   
}
module.exports = orders