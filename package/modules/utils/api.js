const apiRes = require('./apiRes');
const {checkForSqlInjection , DC_ , EC_,JD_ , JDS_} = require('../tools');
const destroySession = ()=>{
  console.log("test")
}
const symbol  = ['►','◄','▲','▼','я','з','л','ь','д','Ф','и','й','ч','ш','ж','я','Д','Э','Ц','щ','г','п','б','ъ','Ю','ä','ß','ü','Ü','ö','ñ','è','ê','É','à']
const keys    =['☺','☻','♥','♦','♣','♠','ф'];
const indexes = [9,8,7,6,5,4,2];
const letterToNumber = {};
const numberToLetter = {};
const zipS = async (txt)=>{

  const zAR    = txt.split(",");
 console.log(["zar",txt,zAR]);
  if(zAR.length < 8){

      return txt;

  }

  const index2 = zAR.length - 1;
  const BD2    = [];
  const BD2TX  = zAR[index2];

    for (let i = 0; i < BD2TX.length; i += 2) {
                BD2.push(BD2TX.slice(i, i + 2));
    }

    for (let i = 0; i < BD2.length; i ++) {

              const key_   = symbol[i];
              const val_   = BD2[i];
              const regex  = new RegExp(key_, "g");

              for (let x = 0; x <index2; x ++) {
                  const txtQ = zAR[x];
                  zAR[x]= txtQ.split(regex).join(val_);
              }
      }
      
      const index4     = zAR.length - 2;
      const BD4TX      = zAR[index4];
   
      const indexSymp4 = keys[5];
      const BD4        = [];
      if(BD4TX !== ''){
      for (let i = 0; i < BD4TX.length; i += 4) {
          BD4.push(BD4TX.slice(i, i + 4));
      }

      const BD4A = [];
      
      for (let i = 0; i < BD4.length; i ++) {
      
          const key_   = `${indexSymp4}${i+1}`;
          const val_   = BD4[i];
          BD4A.push([key_,val_]);
      }
      
      
      
      const BD4AR = BD4A.reverse();

      for (let i = 0; i < BD4AR.length; i ++) {
      
              const key_   = BD4AR[i][0];
              const val_   = BD4AR[i][1];
              const regex  =  new RegExp(`${key_}`, "g");

              for (let x = 0; x < index4; x ++) {
                  const txtQ = zAR[x];
                  zAR[x]= txtQ.split(regex).join(val_);
              }
      }
      
  }
      const index5 = zAR.length - 3;
      const BD5TX = zAR[index5];
      const BD5 = [];
      
      
      if(BD5TX !== ''){
      const indexSymp5 = keys[4];
      
      for (let i = 0; i < BD5TX.length; i += 5) {
              BD5.push(BD5TX.slice(i, i + 5));
          }
      
      const BD5A = [];
      for (let i = 0; i < BD5.length; i ++) {
      
          const key_   = `${indexSymp5}${i+1}`;
          const val_   = BD5[i];
          BD5A.push([key_,val_]);
      }
      const BD5AR = BD5A.reverse();

      for (let i = 0; i < BD5AR.length; i ++) {
      
              const key_   = BD5AR[i][0];
              const val_   = BD5AR[i][1];
          const regex  =  new RegExp(`${key_}`, "g");

          for (let x = 0; x < index5; x ++) {
              const txtQ = zAR[x];
              zAR[x]= txtQ.split(regex).join(val_);
          }
      }
  }
      const index6 = zAR.length - 4;
      const BD6TX = zAR[index6];
      const BD6 = [];
      
      if(BD6TX !== ''){
      
      const indexSymp6 = keys[3];
      
      for (let i = 0; i < BD6TX.length; i += 6) {
              BD6.push(BD6TX.slice(i, i + 6));
          }
      
          const BD6A = [];
          for (let i = 0; i < BD6.length; i ++) {
      
              const key_   = `${indexSymp6}${i+1}`;
              const val_   = BD6[i];
              BD6A.push([key_,val_]);
          }
          const BD6AR = BD6A.reverse();

          for (let i = 0; i < BD6AR.length; i ++) {
      
                  const key_   = BD6AR[i][0];
                  const val_   = BD6AR[i][1];
                  const regex  =  new RegExp(`${key_}`, "g");
          
          for (let x = 0; x < index6; x ++) {
              const txtQ = zAR[x];
              zAR[x]     = txtQ.split(regex).join(val_);
          }
      }
      
      const index7     = zAR.length - 5;
      const BD7        = [];
      const BD7TX      = zAR[index7];
      
      
      const indexSymp7 = keys[2];
      
      for (let i = 0; i < BD7TX.length; i += 7) {
              BD7.push(BD7TX.slice(i, i + 7));
          }

      const BD7A = [];
      for (let i = 0; i < BD7.length; i ++) {
      
          const key_   = `${indexSymp7}${i+1}`;
          const val_   = BD7[i];
          BD7A.push([key_,val_]);
      }
      const BD7AR = BD7A.reverse();

      for (let i = 0; i < BD7AR.length; i ++) {
      
              const key_   = BD7AR[i][0];
              const val_   = BD7AR[i][1];
          const regex  =  new RegExp(`${key_}`, "g");

          for (let x = 0; x < index7; x ++) {
              const txtQ = zAR[x];
              zAR[x]= txtQ.split(regex).join(val_);
          }
      }
  }

      const index8     = zAR.length - 6;
      const BD8        = [];
      const BD8TX      = zAR[index8];
      const indexSymp8 = keys[1];
      
      if(BD8TX !== ''){
      for (let i = 0; i < BD8TX.length; i += 8) {
              BD8.push(BD8TX.slice(i, i + 8));
          }
      
      const BD8A = [];
      for (let i = 0; i < BD8.length; i ++) {
      
          const key_   = `${indexSymp8}${i+1}`;
          const val_   = BD8[i];
          BD8A.push([key_,val_]);
      }
      const BD8AR = BD8A.reverse();

      for (let i = 0; i < BD8AR.length; i ++) {
      
              const key_   = BD8AR[i][0];
              const val_   = BD8AR[i][1];
          const regex  =  new RegExp(`${key_}`, "g");
  
          for (let x = 0; x < index8; x ++) {
              const txtQ = zAR[x];
              zAR[x]= txtQ.split(regex).join(val_);
          }
      }
  }
      const index9     = zAR.length - 7;
      const BD9        = [];
      const BD9TX      = zAR[index9];
      const indexSymp9 = keys[0];
      if(BD9TX !== ''){
      
      for (let i = 0; i < BD9TX.length; i += 9) {
              BD9.push(BD9TX.slice(i, i + 9));
          }

      const BD9A = [];
      for (let i = 0; i < BD9.length; i ++) {
      
          const key_   = `${indexSymp9}${i+1}`;
          const val_   = BD9[i];
          BD9A.push([key_,val_]);
      }
      const BD9AR = BD9A.reverse();

      for (let i = 0; i < BD9AR.length; i ++) {
      
              const key_   = BD9AR[i][0];
              const val_   = BD9AR[i][1];
              const regex  =  new RegExp(`${key_}`, "g");

              const txtQ = zAR[0];
              zAR[0]= txtQ.split(regex).join(val_);
          
      }
      }

      return EC_(zAR[0]);
}

const api =async (req, res,i_app_path,i_app,userDir) => {
    if (req.method === 'POST') {
      let reqBody = '';
  
      req.on('data', chunk => {
        reqBody += chunk.toString();
      });
      
     const checkInjection = checkForSqlInjection(reqBody);

     if(!checkInjection){
      req.on('end',async () => {
        const REQARR = reqBody.replace(/msg=/g,'');
 
        
        const REQB =EC_(REQARR);
   
        apiRes(REQB,req,res,i_app_path,i_app,userDir);
      });
     }else{
      destroySession();
     }
     
  
    } else {
      res.statusCode = 400;
      res.writeHead('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Invalid request method' }));
    }
  }
  
  module.exports = api;
  
