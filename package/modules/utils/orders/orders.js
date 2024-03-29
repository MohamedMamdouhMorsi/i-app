const speechSynthesisData = require('./speechSynthesisData');
const addUser  = require('./users/addUser');
const checkUser  = require('./users/checkUser');
const logUser  = require('./users/logUser');
const countries  = require('./countries');
const languages  = require('./languages');
const icons  = require('./icons');
const setUserOffline  = require('./users/setUserOffline');
const dataBaseReport =  require('./users/dataBaseReport');
const updateAppData =  require('./app/updateAppData');
const updateTranslate =  require('./app/updateTranslate');
const updateIcons =  require('./app/updateIcons');
const updateTxt =  require('./app/updateTxt');
const serverOffer  = require('./servers/serverOffer');
const serverAnswer  = require('./servers/serverAnswer');
const getAnswer  = require('./servers/getAnswer');

const orders  =(body,req,res,i_app_path,i_app)=>{
   if(body.order === 'countries'){
      return countries(res);
   }else if(body.order === 'languages'){
      return languages(res);
   }else  if(body.order === 'icons'){
      return icons(res);
   }else if(body.order === 'serverOffer'){
      return serverOffer(body,req,res);
   }else  if(body.order === 'serverAnswer'){
      return serverAnswer(body,req,res);
   }else   if(body.order === 'getAnswer'){
      return getAnswer(body,req,res);
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
   }else if(body.order === 'updateApp'){
      return updateAppData(body,res,i_app_path);
   }else  if(body.order === 'updateTranslate'){
      return updateTranslate(body,res,i_app_path,i_app);
   }else   if(body.order === 'updateTxt'){
      return updateTxt(body,res,i_app_path,i_app);
   }else   if(body.order === 'uploadIcons'){
      return updateIcons(body,res,i_app_path,i_app);
   }else{
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify({ res: false}));
   }
   
}
module.exports = orders