
const {CL_, DC_, EC_, JDS_, JD_, arToSt, stToAr} =require('../tools');
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
          if(cr[c] !== '{' && cr[c] !== '}'){
            vv += cr[c];
          }
         
        } else if (done) {
          aft += cr[c];
        }
      }
    }
    const enc = DC_(vv);
    ls  += ` fn: '${enc}' ${aft}`;
    }
    return ls;
  } else {
    return str;
  }
}

function convertStrToOb (str) {
  str = str.replace(/(\r\n|\n|\r)/g, ''); // remove newlines

    str = funcHandel(str);
    str = str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    str = str.toString().trim(); // convert to string and remove leading/trailing whitespace

    str = str.replace(/(\"\w+\"\s*:\s*[^,\{\[\]]+)\s*(\}|,|\])/g, '$1,$2');

   
 
    str = str.replace(/\s+/g, ' '); // replace multiple spaces with single space
   
    str = str.replace(/\t/g, ' '); // replace tabs with spaces
    str = str.replace(/\\"/g, '"'); // remove escaped quotes

    str = str.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '); // add quotes around property names

    str = str.replace(/'/g, '"'); // replace single quotes with double quotes
 
    str = str.replace(/,\s*}/g, '}'); // remove trailing commas

    // Add missing commas
    str = str.replace(/" "/g, '" , "'); // missing comma
    str = str.replace(/] "/g, '] , "'); // missing comma
    str = str.replace(/} "/g, '} , "'); // missing comma
    str = str.replace(/} {/g, '} , {'); // missing comma
    // handel function obj
   
    str = str.replace(/([a-z0-9A-Z_]+) "/g, '$1 , "'); // missing comma
   // str = cleanStr(str);
    return str;
  };

 // This function takes a string and cleans it by removing comments and converting it to an object
const iAppReader = (str) => {
// Remove comments from the string using the removeComments function
str = removeComments(str);

// Convert the cleaned string to an object using the convertStrToOb function
str = convertStrToOb(str);

// Return the cleaned object
return str;
};
module.exports = iAppReader