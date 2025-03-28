
const {CL_, DC_, EC_, JDS_, JD_, arToSt, stToAr} =require('../../tools');
const AppReader = require('./IAppReader');
const AppFileMaker = require('./iAppFileMaker');
var funcKey = 0;
var fileName = "File Name";
var objectSt_  = [];
var QMAP       = [];
var DMAP       = [];
var QJMAP      = [];
var func_id = "";
// functions

/**
 * .app file reader
 */

const removeComments = (str)=> {
  return str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
}

const funcHandel     = (str) => {

        /**
         * encrypt avale of key  a:  
         * to handel json object
         */

        const ar = str.split('fn:');
            if (ar.length > 1) {


            
            let ls = '';
            for(let a = 0 ; a < ar.length;a++){
                if(a<1){
                ls = ar[0]
                }
                let op = 0;
            let cl = 0;
            let vv = '';
            let aft = '';
            let done = false;
                const cr = ar[a].split('');
                if(a > 0 && ar[a] !== '' ){
                for (let c = 0; c < cr.length; c++) {
                if (!done) {
                    if (cr[c] === '{') {
                    op++;
                    }
                    if (cr[c] === '}') {
                    cl++;
                    }
                }

                if (!done) {
                    if (op === cl) {
                    done = true;
                    }
                    vv += cr[c];
                } else if (done) {
                    aft += cr[c];
                }
                }
            }
            
            const strQo = updateQueryRender(vv,"fun");
            const enc = DC_(strQo);
            ls  += ` fndc: '${enc}' ${aft}`;
            }
            return ls;
            } else {
            return str;
            }
}

function escapeKeysSym(str) {
        const strArr = str.split('');
        var start = false;
        var type = '';
        var out = '';
        for(var i = 0; i < strArr.length; i++){
        const cureValue = strArr[i];
            if(cureValue == '"' ){
            if(start == true && type == cureValue){
                type = '';
                start=  false;
            }else{
                type = '"';
                start=  true;
            }
            
            }
            if(cureValue == "'"){
            if(start == true && type == cureValue){
                type = '';
                start=  false;
            }else{
                type = "'";
                start=  true;
            }
            }
            if(start && cureValue ==':' ){
            out +='aaa@aaa';
            }else{
            out +=cureValue;
        }
        }
        return out;
}

function convertStrToOb (str) {

  str = escapeKeysSym(str);
  str = funcHandel(str);


  str = str.replace(/(\r\n|\n|\r)/g, ''); // remove newlines

  str = str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

  str = str.toString().trim(); // convert to string and remove leading / trailing whitespace

  str = str.replace(/(\"\w+\"\s*:\s*[^,\{\[\]]+)\s*(\}|,|\])/g, '$1,$2');

  str = str.replace(/\s+/g, ' '); // replace multiple spaces with single space
 
  str = str.replace(/\t/g, ' '); // replace tabs with spaces

  str = str.replace(/\\"/g, '"'); // remove escaped quotes

  str = str.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '); // add quotes around property names

  //update string : 

  str = str.replace(/'/g, '"'); // replace single quotes with double quotes
  str = str.replace(/,\s*}/g, '}'); // remove trailing commas
 
  // Add missing commas
  str = str.replace(/" "/g, '" , "'); // missing comma
  str = str.replace(/] "/g, '] , "'); // missing comma
  str = str.replace(/} "/g, '} , "'); // missing comma
  str = str.replace(/} {/g, '} , {'); // missing comma
  str = str.replace(/" {/g, '" , {'); // missing comma
  str = str.replace(/\] \[/g, '] , ['); // missing comma
  str = str.replace(/""/g, '" , "'); // missing comma
  str = str.replace(/]"/g, '] , "'); // missing comma
  str = str.replace(/}"/g, '} , "'); // missing comma
  str = str.replace(/}{/g, '} , {'); // missing comma
  str = str.replace(/"{/g, '" , {'); // missing comma


  // handel function obj
  str = str.replace(/aaa@aaa/g, ':');                 // missing comma
  str = str.replace(/([a-z0-9A-Z_]+) "/g, '$1 , "');  // delete last comma comma
 
  str = updateQueryRender(str,"obj");
  
 
  // str = cleanStr(str);

  return str;
}

// This function takes a string and cleans it by removing comments and converting it to an object


function updateQueryRender(fileContent, per) {
    let posttxtArray = fileContent.split("_IQuery_");
    
    if (posttxtArray.length > 1) {
        let newPost = posttxtArray[0];
        
        for (let i = 1; i < posttxtArray.length; i++) {
            let model = posttxtArray[i];
            let is_query = is_query_model(model);
            
            if (is_query) {
                newPost += "_IQuery_" + getPostObj(model, funcKey, per);
            } else {
                newPost += "_IQuery_" + model;
            }
            
            funcKey += 1;
        }
        
        return newPost;
    } else {
        return fileContent;
    }
}

function is_query_model(model) {
    let openObject = false;
    let back = false;

    for (let i = 0; i < model.length; i++) {
        let car = model[i];
       
        if (car === ":") {
            openObject = true;
        }

        if (openObject && car === "[") {
            back = true;
            break;
        }

        if (car !== "[" && car !== '"' && car !== "'" && car !== ' ' && car !== ':') {
            break;
        }
    }
  
    return back;
}

function getPostObj(model, key, per) {
    let before = "";
    let after = "";
    let resultObj = "";
    let openFun = 0;
    let closeFun = 0;
    let print = false;
    let printAfter = false;
    let select = false;
    let newObj = model;

    for (let i = 0; i < model.length; i++) {
        let car = model[i];
        
        if (car === "[" && !select) {
            print = true;
            openFun++;
        }

        if (car === "]") {
            closeFun++;
        }

        if (print) {
            resultObj += car;
        } else {
            if (!printAfter) {
                before += car;
            }
        }

        if (printAfter) {
            after += car;
        }

        if (openFun > 0 && openFun === closeFun) {
            print = false;
            printAfter = true;
            select = true;
        }
    }

    if (per === "obj") {
        newObj = convertQueryObj(resultObj, key);
    } else {
        newObj = convertQueryFun(resultObj, key);
    }
  
    let stringObj = before + newObj + after;
    return stringObj;
}

function convertQueryObj(jsonString, key) {
    let toJson = JSON.parse(jsonString);
    let queryArray = [];
    if(toJson !== null){
        for (let i = 0; i < toJson.length; i++) {
            let query = toJson[i];
            let queryId = fileName + "_" + key + "_" + i + "_obj";
            
            if (func_id === queryId) {
             
                objectSt_ = query;
            }
            if (query["a"]) {
                let action = query["a"];

                if (action === "get") {
                    let QE = getInput(query["q"]);
                    let newQ = { "q": QE, "id": queryId };
                    queryArray.push(newQ);
                } else if (action === "getJ") {
                    let QE = getInput(query["q"]);
                    let QEJ = getJInput(query["j"]);
                    let newQ = { "q": QE, "j": QEJ, "id": queryId };
                    queryArray.push(newQ);
                } else if (action === "in") {
                    let QD = query["d"];
                    let newQ = { "d": QD, "id": queryId };
                    queryArray.push(newQ);
                } else if (action === "up") {
                    let QE = getInput(query["q"]);
                    let QD = dataInput(query["d"]);
                    let newQ = { "q": QE, "d": QD, "id": queryId };
                    queryArray.push(newQ);
                } else if (action === "del") {
                    let QE = getInput(query["q"]);
                    let newQ = { "q": QE, "id": queryId };
                    queryArray.push(newQ);
                }
            }  
        }
        
        if (queryArray.length > 0) {
            let backObject = JSON.stringify(queryArray);
            return backObject;
        } else {
            return jsonString;
        }
    }else {
        return jsonString;
    }
       
}

function isNumber(input) {
  return !isNaN(Number(input));
}

function fixAndParseJSON(inputString) {

    let fixedString = inputString.replace(/(?<=[:,\[\s])\b[\w.]+\b(?=[,\]\s}])/g, function(match) {
        if(match !== 'true' && match !== 'false' ){

            if (isNumber(match)) {
                return  match ;
            }else{
                return  '"${'+match+'}"' ;
            }
            
        }else{
            return  match ;
        }
       
    });

    return fixedString;
}

function convertQueryFun(jsonString, key) {
    jsonString = jsonString.replace(/'/g, '"');
    jsonString = jsonString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');

    jsonString = fixAndParseJSON(jsonString);
    let toJson = JSON.parse(jsonString);
    let queryArray = [];

    if(toJson !== null){
            for (let i = 0; i < toJson.length; i++) {
                let query = toJson[i];
                let queryId = fileName + "_" + key + "_" + i + "_fun";
                if (func_id == queryId) {
                
                    objectSt_ = query;
                    if (query["a"]) {
                        let action = query["a"];
        
                        if (action === "get") {
                            let QE = getInput(query["q"]);
                            let newQ = { "q": QE, "id": queryId };
                            queryArray.push(newQ);
                        } else if (action === "getJ") {
                            let QE = getInput(query["q"]);
                            let QEJ = getJInput(query["j"]);
                            let newQ = { "q": QE, "j": QEJ, "id": queryId };
                            queryArray.push(newQ);
                        } else if (action === "in") {
                            let QD = query["d"];
                            let newQ = { "d": QD, "id": queryId };
                            queryArray.push(newQ);
                        } else if (action === "up") {
                            let QE = getInput(query["q"]);
                            let QD = dataInput(query["d"]);
                            let newQ = { "q": QE, "d": QD, "id": queryId };
                            queryArray.push(newQ);
                        } else if (action === "del") {
                            let QE = getInput(query["q"]);
                            let newQ = { "q": QE, "id": queryId };
                            queryArray.push(newQ);
                        }
                    }  
            }

        }
        if (queryArray.length > 0) {
            let backFile = JSON.stringify(queryArray);
            return backFile;
        } else {
            return jsonString;
        }
    }else {
        return jsonString;
    }
}

function isJsVar (val){
    if(val && typeof val.split === 'function' ){
    const valAr = val.split("");
    const len = valAr.length - 1;

        if(valAr[0] == '$' && valAr[1] == '{' && valAr[len] == '}'){
            return true;
        }else{
            return false;
        }

    }else{

        return false;
        
    }
}

function getInput(QE) {
    let result = [];
    for (let or = 0; or < QE.length; or++) {
        let orOB = QE[or];
        for (let and = 0; and < orOB.length; and++) {
            let andOB = orOB[and];
            let value = andOB[1];
            if (value && value.t !== "q") {
                let position = [or, and];
                QMAP.push(position);
                result.push(value);
            }else if(isJsVar(value)){
                QMAP.push(position);
                result.push(value);
            }
        }
    }
    return result;
}

function getJInput(QEJ) {
    let result = [];
    for (let ob = 0; ob < QEJ.length; ob++) {
        let QE = QEJ[ob].q;
        for (let or = 0; or < QE.length; or++) {
            let orOB = QE[or];
            for (let and = 0; and < orOB.length; and++) {
                let andOB = orOB[and];
                let value = andOB[1];
                if (value && typeof value === "object" && value.t !== "q") {
                    let position = [ob, or, and];
                    QJMAP.push(position);
                    result.push(value);
                }else if(isJsVar(value)){
                    QJMAP.push(position);
                    result.push(value);
                }
            }
        }
    }
    return result;
}

function dataInput(QE) {
    let result = [];
    for (let i = 0; i < QE.length; i++) {
        let input = QE[i][1];
        DMAP.push(i);
        result.push(input);
    }
    return result;
}

const iAppReadQuery = (str,fileName_,id) => {
    fileName   = fileName_;
    func_id    = id;
    funcKey    = 0;
    objectSt_  = [];
    QMAP       = [];
    DMAP       = [];
    QJMAP      = [];
    str = removeComments(str);
    str = convertStrToOb(str);

   return [objectSt_,QMAP,QJMAP,DMAP];
}
module.exports = iAppReadQuery