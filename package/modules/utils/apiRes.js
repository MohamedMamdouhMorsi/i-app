const orders = require('./orders/orders');

const UpdateQueryInput = require('./query/UpdateQueryInput');
const apiRes =async (body,req,res,i_app_path,i_app,userDir)=>{
   
const data = JSON.parse(body);

    if(data.order){
        // do order
       return  orders(data, req, res, i_app_path, i_app);
       
    }else if(data.query){
        // do query

    const body_ = await UpdateQueryInput(data,userDir,i_app,res);

      
    }else{
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
    
}
module.exports = apiRes