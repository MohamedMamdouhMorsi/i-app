const orders = require('./orders/orders');
const query = require('./query/query');
const apiRes = (body,req,res,i_app_path,i_app)=>{

const data = JSON.parse(body);

    if(data.order){
        // do order
       return  orders(data,req,res,i_app_path,i_app);
    }else if(data.query){
        // do query
        return query(data,res);
    }else{
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
    
}
module.exports = apiRes