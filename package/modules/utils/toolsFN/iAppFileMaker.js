
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

 // This function takes a string and cleans it by removing comments and converting it to an object
const iAppFileMaker = (str) => {


// Convert the cleaned string to an object using the convertStrToOb function
str = convertStrToOb(str);

// Return the cleaned object
return str;
};
module.exports = iAppFileMaker