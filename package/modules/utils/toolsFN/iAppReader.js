
const {CL_, DC_, EC_, JDS_, JD_, arToSt, stToAr} =require('../../tools');
  // functions

  /**
   * .app file reader
   */
   const removeComments = (str)=> {
    return str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  }

const funcHandel = (str) => {
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
    const enc = DC_(vv);
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

    str = str.replace(/""/g, '" , "'); // missing comma
    str = str.replace(/]"/g, '] , "'); // missing comma
    str = str.replace(/}"/g, '} , "'); // missing comma
    str = str.replace(/}{/g, '} , {'); // missing comma
    str = str.replace(/"{/g, '" , {'); // missing comma

  
    // handel function obj
    str = str.replace(/aaa@aaa/g, ':');                 // missing comma
    str = str.replace(/([a-z0-9A-Z_]+) "/g, '$1 , "');  // delete last comma comma

    
   
    // str = cleanStr(str);
  
    return str;
  };

 // This function takes a string and cleans it by removing comments and converting it to an object

 const iAppReader = (str) => {

      str = removeComments(str);

      str = convertStrToOb(str);

      return str;
  };
module.exports = iAppReader