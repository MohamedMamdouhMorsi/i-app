const {JDS_,JD_} = require('../../tools');
function convertStrToOb (str) {
  str = str.replace(/(\r\n|\n|\r)/g, ''); // remove newlines


    str = str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    str = str.toString().trim(); // convert to string and remove leading/trailing whitespace

    str = str.replace(/(\"\w+\"\s*:\s*[^,\{\[\]]+)\s*(\}|,|\])/g, '$1,$2');

   
 
    str = str.replace(/\s+/g, ' '); // replace multiple spaces with single space
   
    str = str.replace(/\t/g, ' '); // replace tabs with spaces
    str = str.replace(/\\"/g, '"'); // remove escaped quotes

    str = str.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '$2: '); // add quotes around property names

    str = str.replace(/"/g, "'"); // replace single quotes with double quotes
 

    // Add missing commas
    str = str.replace(/,/g, ' '); // missing comma

    return str;
  };
const fixString = (str)=>{

  const strOb = typeof str === 'string' ? JSON.parse(str) : str;
  for(const key in strOb){
    if(typeof strOb[key] === 'string'){
      strOb[key] = strOb[key].replace(/:/g, '_.ACOMA._');
    }else{
      strOb[key] =JD_(fixString(strOb[key]));
    }
  }
  return JDS_(strOb);
}
 // This function takes a string and cleans it by removing comments and converting it to an object
const iAppFileMaker = (str) => {

str = fixString(str);
// Convert the cleaned string to an object using the convertStrToOb function
str = convertStrToOb(str);
str = str.replace(/_.ACOMA._/g, ':');
str = str.replace(/  /g, ' \n');
str = str.replace(/: {/g, ': { \n');
// Return the cleaned object
return str;
};
module.exports = iAppFileMaker