
 const myMiddileware = (Iapp)=>{
    Iapp.get('/yourApiWithGet',(req,res)=>{
        const callBack = (queryData)=>{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: queryData}));
        }
        Iapp.db({
            query:[
              {
                a:'get',
                n:'users',
                q:[[[1,0,'uneq']]],
                s:["A"],
                l:'0'
                }
              ]
            },
          callBack);
     });
    
     Iapp.post('/yourApiWithPost',(req,res,postData)=>{
        const callBack = (queryData)=>{
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ res: queryData}));
        }
        Iapp.db({
            query:[
              {
                a:'get',
                n:'users',
                q:[[[1,postData.id,'eq']]],
                s:["A"],
                l:1
                }
              ]
            },
          callBack);
     });
 }
module.exports = myMiddileware