const fs            = require('fs');
const path          = require('path');
const {JDS_,JD_,EC_}    = require('../../tools');
const iAppReader    = require('./iAppReader');
const iAppFileMaker = require('./iAppFileMaker');
let langOB = {};
var processed = {}
const processFile = async (fileAppData,filePath)=>{

    const isKey = (i, st) => {
        const keys = ['q', 'qt', 't', 'v', 'vt', 'val', 'app', 'u'];
        const txt = st.substring(i); // Extract the substring starting from index 'i'
        
        // Use 'some' to check if any key matches the start of 'txt'
        const matchedKey = keys.find(key => txt.startsWith(`${key}.{`));
        
        return matchedKey || false; // Return the matched key or false if no match
    };
    
        
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
                    if(langOB[st] === str){
                        return st;
                    }
                }
                return false;
        }

        const newStringOb = (str)=>{
            if(typeof str === 'string'){
    
                const strAr      = str.split("");
                var Laststr      = "";
                const prag       = [];
    
                
                var isObject     = false;
                var stateType    = 'free'; 
                var objectKey = "";
                var recordObject = false;
                var recordObjectStart = 0;
 
                for(var i = 0 ; i < strAr.length; i++){
 
                 var pushedToprag       = false;
                 const alpha      = strAr[i];
                 if(isObject && alpha === '}'){
                     isObject = false;
                     Laststr = Laststr+'}';
                     
                     prag.push({t: stateType , s:`${ Laststr }`});
                     pushedToprag       = true;
 
                    
                     Laststr = "";
                     stateType = 'free';
                 }else{
                     if(isObject ){
                         Laststr = `${Laststr}${alpha}`;
                     }else{
 
                         var isKey_ = isKey(i,str);
 
                         if(stateType === 'free' && isKey_ ){
                             // if key for transalate start to record it 
                             if(isKey_ === 't' || isKey_ === 'qt' || isKey_ === 'vt'){
                                 recordObject = true;
                                 if(isKey_ === 't' ){
                                     recordObjectStart = 3;
                                 }else{
                                     recordObjectStart = 4;
                                 }
                             }
 
                                 isObject    = true;
                                 prag.push({t: stateType , s:`${ Laststr }`});
                                 pushedToprag       = true;
                                 stateType   = "fun";
                                 Laststr     = ""; 
                                 Laststr     = alpha; 
                         }else{
                            Laststr = `${Laststr}${alpha}`;
                         }
                     }
                 }
                 
                 
              
              
 
                 if(isObject && alpha !== '}' && recordObject){
                   
                     if(recordObjectStart > 0){
                        
                         recordObjectStart = recordObjectStart - 1;
 
                     }else{
                        
                         objectKey += alpha;
                     }
 
                 }else  if( alpha == '}' && recordObject){
                   
                    
                    
                     if(langOB[objectKey]){
                         processed[objectKey] = true;
                         recordObject = false;
                         objectKey = "";
                     }
                 }
 
                     
 
                     if(!pushedToprag && i == strAr.length - 1){
 
                         prag.push({t: stateType , s:`${ Laststr }`});
 
                     }
             }
                     var newStr = "";
                    
                     for(var i = 0 ; i < prag.length; i++){
                       
                         if(prag[i].t === 'free' && prag[i].s !== '' && prag[i].s !== ' ' && prag[i].s !== ' , ' ){
                            console.log(prag[i].s)
                             const isStringExist_            = isStringExist(prag[i].s);
                             console.log(isStringExist_)
                             if(isStringExist_){
                               
                                
                                 newStr += `t.{${isStringExist_}}`;
                                 processed[isStringExist_] = true;
                             }else{
 
                                 const isStr                  = prag[i].s.replace(/[^a-z]/g, '');
                                 
                                 if(isStr !== ''){
                                    
                                     const shortName          = makeShortName(isStr);
                                     
                                     langOB[shortName]        = prag[i].s;
                                     newStr                  += `t.{${shortName}}` ;
                                     processed[shortName]     = true;

                                 }else{
                                    newStr += prag[i].s ;
                                 }
                             }
                         
                         }else{
                            newStr += prag[i].s ;
                         }
                     }
                  
                 return newStr;
             }else{
                 return str;
             }
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
    const lastClean = {};

    for (const key in langOB) {
        if (processed[key]) {
            lastClean[key] = langOB[key];
        }
    }
        await fs.writeFileSync(i_app_langDir, JSON.stringify(langOB,null,2));
      
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JDS_({ res: true }));
 }
 module.exports = readAndUpdate

 //why-choose-us