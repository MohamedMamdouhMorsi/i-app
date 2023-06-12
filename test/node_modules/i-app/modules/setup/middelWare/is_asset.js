const is_asset = (url)=>{
   if(url !== '' && url !== '.app' && url !== '.json'){
    return true;
   }
    return false;
}
module.exports = is_asset