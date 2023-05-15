const speechSynthesisData = require('./speechSynthesisData');

const orders  =(body,res)=>{
    if(body.order === 'speechSynthesisData'){
       return speechSynthesisData(body,res)
    }
   
}
module.exports = orders