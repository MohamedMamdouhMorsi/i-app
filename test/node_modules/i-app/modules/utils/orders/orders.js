const speechSynthesisData = require('./speechSynthesisData');
const addUser  = require('./users/addUser')
const countries  = require('./countries')
const orders  =(body,res)=>{
   if(body.order === 'countries'){
     
      return countries(res);
   }else  if(body.order === 'addUser'){
       return addUser(body,res);
    }else   if(body.order === 'checkUser'){
      return checkUser(body,res);
   }else if(body.order === 'speechSynthesisData'){
        return speechSynthesisData(body,res);
     }
   
}
module.exports = orders