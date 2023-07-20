const db = require('../../query/mysqlConnect');
const dataBaseReport = (body,res)=>{
    db({query:[{a:'check',n:'users'}]}, false, ()=>{}).then(result=>{
        if(result.length > 0){
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: true }));
        }else{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: false }));
        }
     }).catch(err=>{
         console.log('err :'+err)
     });




}
module.exports = dataBaseReport;