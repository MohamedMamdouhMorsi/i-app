  /**
  * Logs a message to the console.
  * @param {*} message - The message to log.
  */
   const CL_ = (message) => {
    console.log(message);
    };
    

/**

Decodes a base64-encoded string.
@param {string} mw - The string to be decoded.
@returns {string|false} The decoded string or false if there was an error.
*/
const EC_ = (mw) => { var n; try{ n= atob(mw);return n;}catch(e){ CL_(["error EC_ => ",n]); return false; }}
/**

Encodes a string to base64.
@param {string} mw - The string to be encoded.
@returns {string} The encoded string.
*/
const DC_ = (mw) => { var n = btoa(unescape(encodeURIComponent(mw))); return n; }
/**

Parses a JSON string.
@param {string} mw - The JSON string to be parsed.
@returns {object|false} The parsed object or false if there was an error.
*/
const JD_ = (mw) => { try { return JSON.parse(mw) } catch (e) { CL_(["ERROR Jseon Pare JD_: ", mw,e]); return false; } }
/**

Converts an object to a JSON string.
@param {object} mw - The object to be converted.
@returns {string} The resulting JSON string.
*/
const JDS_ = (mw) => { return JSON.stringify(mw) }


// Convert a string to an array of words
const stToAr = (st) => {
    const ar = [];
  
    // Split the string into an array of words
    const stAr = typeof st === 'string' && st.length > 0 ? st.split(" ") : [];
  
    // Check if the resulting array is valid
    if (isAr(stAr)) {
      // Loop through the array and add non-empty words to the output array
      for (let s = 0; s < stAr.length; s++) {
        if (stAr[s] !== "" && stAr[s] !== " " && stAr[s] !== null) {
          ar.push(stAr[s]);
        }
      }
      return ar;
    }
  }
  
  // Convert an array of words to a string
  const arToSt = (ar) => {
    let st = "";
  
    // Check if the input array is valid
    if (isAr(ar)) {
      // Loop through the array and add non-empty words to the output string
      for (let a = 0; a < ar.length; a++) {
        if (ar[a] !== "" && ar[a] !== " " && ar[a] !== null) {
          st += " " + ar[a];
        }
      }
      return st;
    }
  }
  
  // Check if a value is an array
  const isAr = (value) => {
    return Array.isArray(value);
  }
  const getfileName = (req)=>{
    const reqUrl = req.url;
  
    const reqStAr = reqUrl.split("/")
   
    if(reqStAr.length > 1){
     
  return reqStAr[reqStAr.length - 1]
    }
  }

  
module.exports = {
    CL_,
    DC_,
    EC_,
    JDS_,
    JD_,
    arToSt,
    stToAr,
    getfileName

}