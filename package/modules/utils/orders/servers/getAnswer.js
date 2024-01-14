const db = require('../../query/mysqlConnect');


const getAnswer = (userData,req,res)=>{
   const token = `${req.user.deviceToken}`;
   const callBack =()=>{
    console.log('answers deleted')
    } 
   const ss = ()=> {  
   
    db({
    query:[
        {
            a:'del',
            n:'answers',
            q:[[['userId',req.user.id,'eq']]],
            l:'0'
        }
        ]
        },
        res,
        callBack);
      };
  db({
        query:[
            {
                a:'get',
                n:'answers',
                q:[[['ownerId',token,'eq']]],
                s:["A"],
                l:'0'
            }
            ]
            },
                res,
                (reso,res_)=>{
              
                  if(reso && reso.length > 0){
                   
              
                             setTimeout(() => {
                              ss()
                             }, 200);
                            res.writeHead(200, { 'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ res: reso}));
                            
                  }else{
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ res: reso}));
                  }
                  
                });
                
}
module.exports = getAnswer;