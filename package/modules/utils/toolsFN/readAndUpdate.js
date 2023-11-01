const fs            = require('fs');
const path          = require('path');
const {JDS_,JD_,EC_}    = require('../../tools');
const iAppReader    = require('./iAppReader');
const iAppFileMaker = require('./iAppFileMaker');
let langOB = {};
const processFile = async (fileAppData,filePath)=>{

        const isKey = (sto)=>{
            if(sto == 'q' || sto == 'qt' || sto == 't' || sto == 'v' || sto == 'vt' || sto == 'val' || sto == 'app' || sto == 'u' ){
                return true;
            }else{
                return false;
            }
        }
        
        const makeShortName = (str)=>{

            str    = str.replace(/(\r\n|\n|\r)/g, ''); 
            str    = str.toLowerCase();
            str    = str.replace(/ /g,'-');
            
            const strDataG      = str.replace(/[^a-z-]/g, '');
            const strDataL      = strDataG.replace(/--/g, '-');
            const crNo          = strDataL.split("").length;
            let count           = crNo >  20 ? 20 : crNo;
            const strDataR      = strDataL.substring(0,count);
            let strData         = strDataR;

            while (langOB[strData]) {
                    if(count <= crNo){
                        strData = strData.substring(0,count);
                    }else{
                        strData = `${strData}_${count}`;
                    }
                    count++;
            }

            if (strData.startsWith("-")) {
                strData = strData.substring(1);
               
              }
            
            return strData;
        }

        const isStringExist = (str)=>{
                for(const st in langOB){
                    if(langOB[st] == str){
                        return st;
                    }
                }
                return false;
        }

        const newStringOb = (str)=>{
           if(typeof str === 'string'){

           }else{
            return str;
           }
            const strAr = str.split("");
            var Laststr = "";
            var objectIsOpen = false;
            const prag = [];
            var render       = true;
            var isObject     = false;
            var cutAndUp     = false;
            var stateType    = 'free'; 
            for(var i = 0 ; i < strAr.length; i++){

         
                const alpha      = strAr[i];
                const betaIndex  = i + 1;
                const gammaIndex = i + 2;
                const isKey_     = isKey(alpha);

                if(isKey_ && strAr[betaIndex] && strAr[gammaIndex]){
                   
                    const beta       = strAr[betaIndex];
                    const gamma      = strAr[gammaIndex];

                    if(beta === '.' && gamma === '{' && Laststr !== ''){

                        isObject    = true;
                        prag.push({t:stateType,s:`${Laststr}`});
                        Laststr     = alpha; 

                    }
               
                }

                    if( alpha == '}'){

                        stateType = 'fun';
                        isObject  = false;
                        cutAndUp  = true;

                    }

                    if(i == strAr.length - 1){

                        cutAndUp = true;

                    }

                    if(render){
                        Laststr = `${Laststr}${alpha}`;

                        if(cutAndUp){

                            prag.push({t:stateType,s:Laststr});
                            Laststr       = "";
                            cutAndUp      = false;

                            if(stateType == 'fun'){
                                stateType = 'free';
                            } 

                        }
                    }

            }
                    var lastStr = "";
                  
                    for(var i = 0 ; i < prag.length; i++){
                        if(prag[i].t == 'free'){

                            const isStringExist_            = isStringExist(prag[i].s);

                            if(isStringExist_){

                                lastStr += `t.{${isStringExist_}}`;

                            }else{

                                const isStr                  = prag[i].s.replace(/[^a-z]/g, '');

                                if(isStr !== ''){

                                    const shortName          = makeShortName(prag[i].s);
                                    langOB[shortName]        = prag[i].s;
                                    lastStr                 += `t.{${shortName}}` ;

                                }else{
                                    lastStr += prag[i].s ;
                                }
                            }
                        
                        }else{
                            lastStr += prag[i].s ;
                        }
                    }
                 
                return lastStr;
        }

        const newArStringOb = (ar)=>{
           if(Array.isArray(ar)){
                for(var i = 0 ; i < ar.length ; i++){
                    if(ar[i].s && ar[i].t !== 'code'){
                        ar[i].s = newStringOb(ar[i].s);
                    }else if(ar[i].e){
                        ar[i].e = newArStringOb(ar[i].e);
                    }
                }
           }
        
            return ar;
        }
        
        if(fileAppData.s){
            fileAppData.s = newStringOb(fileAppData.s);
        }else if(fileAppData.e){
            fileAppData.e = newArStringOb(fileAppData.e);
        }
    
        return fileAppData;
}

const data = [];

const readFiles = async (srcFiles)=>{
    
    for(var x = 0 ; x < srcFiles.length; x++){

        const fileOb = srcFiles[x];

        if(fileOb.path && fileOb.type == 'file' && fileOb.ext == 'app'){
            
            const filePath              = path.join(fileOb.path,fileOb.name);
            const fileData              = await fs.readFileSync(filePath, 'utf8');
            const fileAppData           = iAppReader(fileData);
            const fileAppDataJson       = JSON.parse(fileAppData);
            const processFileData       = await processFile(fileAppDataJson,filePath);
            const toJson                = JSON.stringify(processFileData);
            const processFileDataApp    = iAppFileMaker(toJson);
       
            data.push({path:filePath, data:processFileDataApp});
            
        
        }else if(fileOb.children){

            await readFiles(fileOb.children);
            console.log(' process > ' + fileOb.children.length);
        }
    }
    
    return data;
}
function isCharacterNumber(char) {
    // Use parseInt to attempt to convert the character to a number
    // isNaN() checks if the conversion was successful
    return !isNaN(parseInt(char));
  }
function prettyPrint(obj) {
    const tabSize = 2; // Number of spaces for each level of indentation
    let indentLevel = 0;
    let result = '';
    let result1 = '';
    obj = obj.replace(/\t/g ,  "");
    obj = obj.replace(/     /g ,  "");
    obj = obj.replace(/\n/g ,  "");
    obj = obj.replace(/"/g,"'");
    
    var isStringOpenKey = false;
    
    for(var i = 0 ; i < obj.length; i++){
        const char = obj[i];
        if(!isStringOpenKey && char === "'"){
            isStringOpenKey = true;
        }else  if(isStringOpenKey && char === "'"){
            isStringOpenKey = false;
        }
        const isNum = isCharacterNumber(char);
        if(!isStringOpenKey){
            if(obj[i-1] && obj[i-1] == ' '){
                if(
                    isNum ||
                    char === '{' ||
                    char === '[' || 
                    char === '}' || 
                    char === ']' || 
                    char === ':' || 
                    char === ' ' ||
                    char === 't' && 
                    obj[i+1] && obj[i+1] === 'r' &&
                    obj[i+2] && obj[i+2] === 'u' &&
                    obj[i+3] && obj[i+3] === 'e' ||
                    char === 'f' && 
                    obj[i+1] && obj[i+1] === 'a' &&
                    obj[i+2] && obj[i+2] === 'l' &&
                    obj[i+3] && obj[i+3] === 's' &&
                    obj[i+4] && obj[i+4] === 'e' 

                    ){
                    result1 += char;
                }else{
                    result1 += '.!'+char;
                }
            }else{
                result1 += char;
            }
        }else{
            result1 += char;
        }
    }
    var isStringOpen = false;
    for (let i = 0; i < result1.length; i++) {
      const char = result1[i];
        if(!isStringOpen && char === "'"){
            isStringOpen = true;
        }else  if(isStringOpen && char === "'"){
            isStringOpen = false;
        }
      if (char === '{' || char === '[') {
        result += char;
        if(!isStringOpen){
            indentLevel++;
            result += '\n' + ' '.repeat(indentLevel * tabSize);
        }

      } else if (char === '}' || char === ']') {
        if(!isStringOpen){
        indentLevel--;
        result += '\n' + ' '.repeat(indentLevel * tabSize);
        }
        result += char;
      } else if (char === '!' && result1[i -1] === '.')  {
        result += char;
        if(!isStringOpen){
        result += '\n ' + ' '.repeat(indentLevel * tabSize);
        }
      } else {
        result += char;
      }
    }

    result = result.replace(/.!/g ,  "");
    const txt = /fndc:'(?<query>[^']+)'/g;

    let output = result;
    output = result.replace(txt, (_, query) =>
    {
        let  testData = query.trim();

        if(testData){
            return `fn:${EC_(testData)}`;
        }else{
            return query.trim();
        }

    }
    );
    return output;
  }
 
  const readAndUpdate = async (srcFiles,txtData,i_app_langDir,res)=>{
    
    langOB  = txtData;

    const data = await readFiles(srcFiles);

    for(var i = 0 ; i < data.length ; i++){
        const filePath           = data[i].path;
        const processFileDataApp = data[i].data;
        const pretty             = prettyPrint(processFileDataApp);
        
        await fs.writeFileSync(filePath, pretty);
        console.log('saved > '+filePath);
    }
        await fs.writeFileSync(i_app_langDir, JSON.stringify(langOB,null,2));
    console.log(data.length);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JDS_({ res: true }));
 }
 module.exports = readAndUpdate