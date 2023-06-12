const is_app = (url)=>{

   if(url === '.app' || url === '.json'){
    return true;
   }
    return false;
}
module.exports = is_app