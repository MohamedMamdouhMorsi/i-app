const is_api = (url)=>{

    if(url == '/api'){
        return true;
    }
    return false;
}
module.exports = is_api