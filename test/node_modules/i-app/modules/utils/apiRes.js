const orders = require('./orders/orders');
const query = require('./query/query');
const apiRes = (body,res)=>{

const data = JSON.parse(body);
console.log(data)
    if(data.order){
        //do order
       return  orders(data,res);
    }else if(data.query){
        // do query
        return query(data,res);
    }else{
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
    
}
module.exports = apiRes