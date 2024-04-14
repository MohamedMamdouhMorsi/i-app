const IAppReadQuery = require('../toolsFN/IAppReadQuery');
const path          = require('path');
const fs            = require('fs');
const queryFun      = require('./query');

const isUrlDevApp =(url)=>{
    const urlArr = url.split('dev_');
    if(urlArr.length  > 1){
      return true;
    }
    return false;
}

const UpdateQueryInput = async(incomeQuery, dir, i_app,res_)=> {
    const query = [];
  
    if (incomeQuery && incomeQuery.query) {
        const QQ = incomeQuery.query;
        
        for (let q = 0; q < QQ.length; q++) {
            const query_ = QQ[q];
            
            if (query_ && query_.id) {
         
                const funcId = query_.id;
                const idAr   = funcId.split("_");
               
                if (idAr[0] === 'dev' && idAr.length === 5 || idAr.length === 4) {

                    let filename = idAr[0] === 'dev' && idAr.length === 5 ? `${idAr[0]}_${idAr[1]}`:idAr[0];

                    let isDev = isUrlDevApp(filename);

                    if(idAr[0] === 'dev' && idAr.length === 4 ){

                        filename = 'dev';
                        isDev    = true;

                    }

                    const queryIndex  = idAr[1];
                    const inputIndex  = idAr[2];
                    const queryType   = idAr[3];
                    const appFileName = `${filename}.app`;
                    const dirAppMain  = i_app.dir.main;
                    const dirAppSrc   = i_app.dir.src;

                    
                   
                    const fileDirN =  path.join(dir,dirAppMain,dirAppSrc,appFileName);
                    const fileDirD =  path.join(__dirname, '..','..','..','elements',appFileName);
                   
                    const fileDir = isDev ? fileDirD : fileDirN;
                   
                    const template = fs.readFileSync(fileDir,
                        { encoding: 'utf8' });
                       
                        const object =  IAppReadQuery(template, filename, funcId);
                        
                        if(query_["limitAuto"]){
                            object[0]["limitAuto"] = query_["limitAuto"];
                        }

                        if(query_["last"]){
                            object[0]["last"] = query_["last"];
                        }
                        const updatedQuery = updateQuery(object[0], object[1], object[2], object[3], query_);
               
                
                        query.push(updatedQuery);
                  
                } else {
                    res_.writeHead(200, { 'Content-Type': 'application/json'});
                    res_.end(JSON.stringify({ res: false}));
                    
                }
            } else {
                res_.writeHead(200, { 'Content-Type': 'application/json'});
                res_.end(JSON.stringify({ res: false}));
              
            }
        }
         
            queryFun({query:query},res_);
       
       
       
    } else {
        res_.writeHead(200, { 'Content-Type': 'application/json'});
        res_.end(JSON.stringify({ res: false}));
       
    }
}

const updateQuery = (queryFile, QMAP, QJMAP, DMAP, queryData)=> {
        if (queryFile && queryFile.a) {
            const action = queryFile.a;
            
            if (action === "get") {
                if (queryFile.q && queryData.q) {
                    for (let q = 0; q < queryData.q.length; q++) {
                        const data = queryData.q[q];
                        const position = QMAP[q];
                        const or = position[0];
                        const and = position[1];
                        queryFile.q[or][and][1] = data;
                    }
                }
            } else if (action === "getJ") {
                if (queryFile.q && queryData.q) {
                    for (let q = 0; q < queryData.q.length; q++) {
                        const data = queryData.q[q];
                        const position = QMAP[q];
                        const or = position[0];
                        const and = position[1];
                        queryFile.q[or][and][1] = data;
                    }
                }
                if (queryFile.j && queryData.j) {
                    for (let q = 0; q < queryData.j.length; q++) {
                        const data = queryData.j[q];
                        const position = QJMAP[q];
                        const join = position[0];
                        const or = position[1];
                        const and = position[2];
                        queryFile.q[join][or][and][1] = data;
                    }
                }
            } else if (action === "in") {
                queryFile.d= queryData.d;
                
            } else if (action === "up") {
               
                if (queryFile.q && queryData.q) {
                    for (let q = 0; q < queryData.q.length; q++) {
                        const data = queryData.q[q];
                        const position = QMAP[q];
                        const or = position[0];
                        const and = position[1];
                        queryFile.q[or][and][1] = data;
                    }
                }
                for (let q = 0; q < queryData.d.length; q++) {
                     
                    const index = DMAP[q];
                    const data  = queryData.d[q];

                    if( queryFile.d[index] ){
                        queryFile.d[index][1] = data;
                    }
                 
                }
            } else if (action === "del") {
                if (queryFile.q && queryData.q) {
                    for (let q = 0; q < queryData.q.length; q++) {
                        const data = queryData.q[q];
                        const position = QMAP[q];
                        const or = position[0];
                        const and = position[1];
                        queryFile.q[or][and][1] = data;
                    }
                }
            }
            
            return queryFile;
        }
}


module.exports = UpdateQueryInput;
