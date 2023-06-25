
const isSession = require('./sessions/isSession');
const sessionsControl = require('./sessions/sessionsControl');
const sessionData = require('./sessions/sessionData');
const {api} = require('../main');
const {getfileName} = require('../tools');

const is_api_ = require('./middelWare/is_api');
const is_app_ = require('./middelWare/is_app');
const is_asset_ = require('./middelWare/is_asset');
const is_route_ = require('./middelWare/is_route');
const app_file = require('./middelWare/app_file');
const asset_file = require('./middelWare/asset_file');
const route_file = require('./middelWare/route_file');
const router = require('../utils/router/router');
const routerPost = require('../utils/router/routerPost');
const middleWareApp = (req,res,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript])=>{
  const url = req.url;
  const is_user = isSession(req);
  const appWare = (req,res,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript],userData)=>{
    req.user = userData;

    if (req.method === 'POST') {
      if(res.destroySession){
        console.log('res.destroySession')
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify({ res: 'destroySession' }));
      }else{
      const is_api   = is_api_(url);
      if(is_api){
        return api(req,res);
      }else{
  
        const userRouterPost =  routerPost.match(req,res);
        if(!userRouterPost){
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
        }
      }}
    }else if(req.method === 'GET'){
  
    const userRouter =  router.match(req,res);
    if(!userRouter){
  
  
      const path = require('path');
 
      const extname = path.extname(req.url);
      const is_app   = is_app_(extname);
      const is_asset = is_asset_(extname);
      const is_route = is_route_(extname);
      const fileName = getfileName(req);
  
      if(is_app){
        return app_file(req,res,extname,fileName,manifest,i_app_st,tree,userDir,i_app);
      }else if(is_asset){
        return asset_file(req,res,userDir,swScript,userData);
      }else if(is_route){
        return route_file(req,res,i_app,colorPR_D);
      }else{
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem loading the requested URL.</p>');
      }
           
  
  
    }
    }


}
  if (i_app.users ) {
    if(is_user){
      sessionData(req,res,appWare,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript]);
    }else{
      sessionsControl(req,res,appWare,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript]);
    }
  }else  {
    appWare(req,res,[i_app,colorPR_D,manifest,tree,userDir,i_app_st,swScript], {id:0,notBasic:true});
    
  }
}
module.exports = middleWareApp