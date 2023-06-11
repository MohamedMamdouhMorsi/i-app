/* 
i-app - framework
*
@organization:https://i-app.org
*

BSD 3-Clause License

Copyright (c) 2023, MWN Software

@author:https://github.com/MohamedMamdouhMorsi
@company:https://github.com/MWN-S
*/



/*
intro:
Hello, how are you my friend !!
Thank you for your interest in reading how the i-app work,
so let me explain the project,In main headlines through 
your reading of the project.
//////////////////////////////////////////////////////
Attention: The free clean code version was made by 
shortening the MWN Software Core and simplify the 
underlying security layers to help developers to understand 
the basic process of i-app , it must be clarified 
that this copy is different from the copies that are 
issued by the company and included in its products in
the market, and to deal with commercial copies, please
refer to the policy of licenses granted by MWN Software
/////////////////////////////////////////////////////
// I-APP START >>>>>>>>>>>>>>>>
/////////////////////////////////////////////////////
i-app start by one function i-app() default with loading  
/////////////////////////////////////////////////////
*/

// This function immediately invokes itself and starts the i-app

/**
 * global functions
 */
  /**
  * Returns the element with the specified ID attribute.
  * @param {string} id - The ID of the element to retrieve.
  * @returns {(Element|false)} - The element with the specified ID or false if the element was not found.
  */
   const E_I = (id) => {
    const element = document.getElementById(id);
    return element !== null ? element : false;
  };
    /**
  * Logs a message to the console.
  * @param {*} message - The message to log.
  */
     const CL_ = (message) => {
      console.log(message);
      };
       /**
  * Creates a new element with the specified tag name.
  * @param {string} tag - The name of the tag to create.
  * @returns {Element} - The newly created element.
  */
  const CE_ = (tag) => {
    return document.createElement(tag);
    };
      /**
  * Returns an array of all elements with the specified tag name.
  * @param {string} tag - The name of the tag to search for.
  * @returns {Element[]} - An array of elements with the specified tag name.
  */
  const E_T = (tag) => {
    return document.getElementsByTagName(tag).length > 0 ? document.getElementsByTagName(tag) : [];
    };
    
  /**
   * i-app functions
   */
this.isFired = false;
const configFire = (con, lan,ty,theme,sendNumber) => {


    const loadFire = ()=>{
        if(!this.isFired){
            firebase.initializeApp(con);
            firebase.auth().languageCode = lan;
            CL_(["configFire Done"])
            this.isFired = true;
        }

        if(ty == "reC"){
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'theme':theme,
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                sendNumber();
              }
            });
            recaptchaVerifier.render();
            
        }
    }
    if(!E_I("fireSrc")){
        CL_(["No script script"]);
        const src = CE_("script");
        src.src = "https://www.gstatic.com/firebasejs/6.0.2/firebase.js";
        src.id = "fireSrc";
        E_T("head")[0].appendChild(src);
        src.onload =()=>{
          CL_(["this is script"]);
         
          setTimeout(loadFire,3000);
        }
      
    }else{
        loadFire();
    }
}

const GOS = (function(d, s, id) {
    var hh = d.getElementsByTagName('head')[0];
   
    hh.innerHTML += '<meta name="google-signin-scope" content="profile email">';
    hh.innerHTML += '<meta name="google-signin-client_id" content="94508468930-rnl3toalkm9akk5kri0qff4i6f39fcv9.apps.googleusercontent.com">';
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://apis.google.com/js/platform.js';
    fjs.parentNode.insertBefore(js, fjs)
}(document,  'script','google-jssdk'));


var fcmCon = {};
const i_app = (()=>{

    'use strict';
    const I_APP_DIR = "/i.app";
    /** app connection & loading state */
    var is_online    = true;
    var first        = true;
    var desStroy     = false;
    /** app data obj */
    let app ={};
    let I_OB = {};
    const I_O = (k)=>{return I_OB[k]?I_OB[k]:false }
    const I_O_O = (op)=>{
      const ob = []
      for (const [k, v] of Object.entries(I_OB)) {
        if(v[op]){
          ob.push(I_OB[k]);
        }
        }
        return ob;
     }
    let i_app_v = {};
    let i_app_colors =[];
    let i_app_style = {};
    let i_app_theme = "light";
    let i_app_theme_colors = [];
    let selected_theme_colors = {};
    let i_app_model = {};
    let i_app_lang = {};
    let i_app_select_lang = {};
    let i_root = "start";
    let selectLang = "en";
    let selectLangDirection = "l";
    /**Functions Varibles */
    const ReturnScriptFunctions = {};
    const popJsD = {};
    const sLang = {};
    let poJSOB = [];
    this.sli_MEM = [];
    this.lastScroll = 0;
    this.S_DAY = "0";
    this.S_MONTH = "0";
    this.S_YEAR = "0";
    this.V_DAY = 0;
    this.V_MONTH = 0;
    this.V_YEAR = 0;
    this.sw = null;
    this.scrollVerison = 0;
    var mySliTimeFunc ,scollerTime;
    window.pJSDom = [];
  
    var LIN = {};
    /*
    screen
    general screen object document.body
    */
  const i_sc = {}
    // tools
  
    /**
     * not comment yet
     */
  const setDateTime =()=>{
    var crdate = "";
    var crmonth = "";
    var Now = new Date();
    var DN = Now.getDay();
    var DD = Now.getDate();
    var MM = Now.getMonth();
    var YY = Now.getFullYear();
    var hh = Now.getHours();
    var mm = Now.getMinutes();
    var ss = Now.getSeconds();
    
    if (hh >= 12) {
        var hhr = hh - 12;
    } else {
        var hhr = hh;
    }
    
    if (mm < 10) {
        mm = "0" + mm;
    }
    
    if (ss < 10) {
        ss = "0" + ss;
    }
    
    if (DD < 10) {
        crdate = "0" + DD;
    } else {
        crdate = DD;
    }
  
    this.V_TIME = hh + ':' + mm + ':' + ss;
    this.V_DATE = '' + YY + '-' + crmonth + '-' + crdate + '';
    this.V_DAY = crdate;
    this.V_MONTH = crmonth;
    this.V_YEAR = YY;
    setTimeout(setDateTime, 1000);
  }
  
  const isAr =(ar)=>{
  if(Array.isArray(ar)){
    return true;
  }else{
    return false;
  }
  }
  const stToAr = (st)=>{
  const ar  = [];
  const stAr =typeof st === 'string' && st.length > 0 ? st.split(" "):[];
  if(isAr(stAr)){
  for(let s = 0 ; s < stAr.length;s++){
    if(stAr[s] !== "" && stAr[s] !== " " && stAr[s] !== null){
      ar.push(stAr[s]);
    }
  }
  return ar;
  }
  }
  const selectStyleToOb =(ar)=>{
    const ob = {};
    for(var o = 0 ; o < ar.length; o++){
      const arOb = ar[o];
      ob[arOb.k] = arOb.v;
    }
    return ob;
  }
  const arToSt = (ar)=>{
  let st  = "";
  
  if(isAr(ar)){
  for(let a = 0 ; a < ar.length;a++){
    if(ar[a] !== "" && ar[a] !== " " && ar[a] !== null){
      st +=" "+ar[a];
    }
  }
  return st;
  }
  }
  
  
  
  
  
  

      /**
  * Returns the element with the specified I Scure .
  * @param {string} id - The ID of the element to retrieve.
  * @returns {(Element|false)} - The element with the specified ID or false if the element was not found.
  */
       const E_I_S = (id) => {
        return I_O(id)? I_O(id).i_e : false;
    
      };

 

  
  /**
  * Returns the origin of the current window.
  * @returns {string} - The origin of the current window.
  */
  const URL = () => {
  return window.location.origin;
  };
  
  /**
  * Returns the origin of the current window.
  * @returns {string} - The origin of the current window.
  */
  const URLH = () => {
  return window.location.origin;
  };
  
  /**
  * Checks if the specified value is equal to a certain string.
  * @param {*} value - The value to check.
  * @returns {boolean} - True if the value is equal to the specified string, false otherwise.
  */
  const IF_F = (value) => {
  let result = false;
  if (value == "FALSE") {
    result = true;
  }
  return result;
  };
  
  /**
  * Returns an array of elements with the specified name attribute.
  * @param {string} name - The name attribute to search for.
  * @returns {Element[]} - An array of elements with the specified name attribute.
  */
  const E_N = (name) => {
  return document.getElementsByName(name);
  };
  
  /**
  * Returns an array of elements with the specified class name.
  * @param {string} className - The class name to search for.
  * @returns {Element[]} - An array of elements with the specified class name.
  */
  const E_C = (className) => {
  return document.getElementsByClassName(className);
  };
  
  /**
  * Clears the inner HTML of the element with the specified ID attribute.
  * @param {string} id - The ID of the element to clear.
  * @returns {void}
  */
  const Clr = (id) => {
  E_I(id).innerHTML = '';
  };
  
  /**
  * Sets the inner HTML of the element with the specified ID attribute to the specified value.
  * @param {string} id - The ID of the element to set the inner HTML of.
  * @param {*} value - The value to set the inner HTML to.
  * @returns {void}
  */
  const In = (id, value) => {
  E_I(id).innerHTML = value;
  };
  
  /**
  * Sets the value of the element with the specified ID attribute to the specified value.
  * @param {string} id - The ID of the element to set the value of.
  * @param {*} value - The value to set the element's value to.
  * @returns {void}
  */
  const InV_ = (id, value) => {
  E_I(id).value = value;
  };
  
  /**
  * Hides the element with the specified ID attribute.
  * @param {string} id - The ID of the element to hide.
  * @returns {void}
  */
  const Hide = (id) => {
  E_I(id).style.display = "D_N";
  };
  /**
  
  Displays an element by setting its display property to "block".
  @param {string} mw - The element to display.
  */
  const Show = (mw) => { return E_I(mw).style.display = 'block'; }
  /**
  
  Sets an item in local storage.
  @param {string} m - The key for the item to be set.
  @param {string} w - The value to be set.
  */
  const IND = (m, w) => { return window.localStorage.setItem(m, w) }
  /**
  
  Gets an item from local storage.
  @param {string} mw - The key for the item to retrieve.
  @returns {string|null} The value of the item or null if it does not exist.
  */
  const GTD = (mw) => { return window.localStorage.getItem(mw) }
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
  const isJson = (mw) => { try { return JSON.parse(mw) ? true : false} catch (e) {  return false; } }
  /**
  
  Converts an object to a JSON string.
  @param {object} mw - The object to be converted.
  @returns {string} The resulting JSON string.
  */
  const JDS_ = (mw) => { return JSON.stringify(mw) }
  /**
  
  Displays a message in an alert box.
  @param {string} mw - The message to be displayed.
  */
  const AL_ = (mw) => {var mst =GTX(mw) == ""? mw : GTX(mw); alert(mst); }
  /**
  
  Displays a confirmation dialog box.
  @param {string} mw - The message to be displayed in the dialog box.
  @returns {boolean} True if the user clicks OK, false if the user clicks Cancel.
  */
  const CONFIRM_ = ([mw]) => {var mst =GTX(mw) == ""? mw : GTX(mw);return confirm(mst); }
  /**
  
  Inserts an element before another element in the DOM.
  @param {Element} p - The element to insert before.
  @param {Element} c - The element to be inserted.

  
  */
  const IN_B = (p,c)=>{p.parentNode.insertBefore(c,p);}
  /**
  
  Creates a deep copy of an object.
  @param {object} mw - The object to be copied.
  @returns {object} A deep copy of the object.
  */
  const COPY_OB = (mw) => {mw == undefined ? CL_(mw):'cc'; return JSON.parse(JSON.stringify(mw)) }  
  /**
  * Returns the current timestamp in milliseconds
  * @returns {number} The current timestamp in milliseconds
  */
  const time_ = () => {
  return new Date().getTime();
  }
  /**
  
  Loads a script from a given URL and optionally calls a callback function when the script has loaded.
  
  @param {string} url - The URL of the script to be loaded.
  
  @param {function} [callback] - The optional callback function to be called when the script has loaded.
  
  @param {*} [data] - Optional data to be passed to the callback function.
  
  @returns {undefined}
  */
  const L_S = (url, callback, data) => {
  // Only load the script if it hasn't already been loaded
  if (!E_I(`script_${url}`)) {
  // Create a new script element with the specified URL and append it to the <head> of the page
  const src = CE_("script");
  src.id = `script_${url}`;
  src.src = `${url}?${time_()}`;
  E_T("head")[0].appendChild(src);
  
  // If a callback function is specified, add an event listener to the script element that calls the callback when the script has loaded
  if (callback) {
  const fn = () => callback(data);
  src.addEventListener("load", fn);
  }
  }
  };
  const isString = (x) => {
    return Object.prototype.toString.call(x) === "[object String]"
  }
  const DEL_E_E = (mw) => {
    const myNode = E_I_S(mw);
    if (myNode.childNodes.length > 0) {
        for (var tc = 0; tc < myNode.childNodes.length; tc++) {
            var myNodeE = myNode.childNodes[tc];
            if (myNodeE.childNodes.length > 0) {
                while (myNodeE.firstChild) {
                    myNodeE.removeChild(myNodeE.firstChild);
                }
            }
        }
    }
  
  }
  const GTX = (txt)=>{
    return i_app_select_lang[txt] ? i_app_select_lang[txt] : txt;
  }
  const cmar = (YY) => {
    var arew = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var difY = YY - 2000;
    var difc = difY / 4;
    difc = difc + 1;
    var ttt = 2000;
    for (var sdf = 0; sdf < difc; sdf++) {
        ttt = ttt + 4;
        if (ttt == YY) {
            arew[1] = 29;
        }
    }
    return arew;
  }   
  const E_I_V = (mw) => {
    var n;
    if(I_O(mw).valsLang){
      return s_Lang();
    }
    if (E_I_S(mw)) {
        if (E_I_S(mw).value && E_I_S(mw).value !== undefined) {
            if (E_I_S(mw).nodeName == "SELECT" && E_I_S(mw).value == "0" &&
                E_I_S(mw).getAttribute("value") &&
                E_I_S(mw).getAttribute("value") !== undefined &&
                E_I_S(mw).getAttribute("value") !== "0"
            ) {
                n = E_I_S(mw).getAttribute("value");
  
            } else {
                n = E_I_S(mw).value;
            }
        } else if (E_I_S(mw).getAttribute("value")) {
            n = E_I_S(mw).getAttribute("value");
        } else {
            n = false;
        }
    } else {
      n = false;
  }
    return n;
  }
  const IN_V = (element,value)=>{
    var id = null;
    if(typeof element === 'string'){
        id = element;
    }
    if(id !== null){
      if(E_I(id)){
        E_I(id).value = value;
      }else if(E_I_S(id)){
        E_I_S(id).value = value;
      }
    }else{
      element.value = value;
    }
  }

  const elmChange = (e)=>{
 
    if(E_I(e) && E_I(e).onchange){
      E_I(e).onchange();
    }else  if(E_I_S(e) && E_I_S(e).onchange){
      E_I_S(e).onchange();
    }
  }
  const I_IN_V = (m) => {
    var dd = {};
    for (var qq = 0; qq < m.length; qq++) {
        var nm = m[qq].N;
        if (m[qq].V) {
            var val = m[qq].V;
            dd[nm] = E_I_V(val);
        } else if (m[qq].Do) {
            dd[nm] = m[qq].Do;
        }
    }
    return [dd];
  }
  
  const D_CL = ([m, w]) => {
      
    var e = isString(m) ? E_I_S(m) : m;
    if (e && e.className) {
        var cc = e.className;
        var ic = cc.split(" ");
        var kw = '';
        for (var c = 0; c < ic.length; c++) {
            if (ic[c] !== w) {
                kw = `${kw} ${ic[c]}`;
            }
        }
        e.className = "";
        kw = kw.replace(/  /g, '');
        e.className = U_CSS(kw);
    }
  }
  const A_H = (p, c) => {
    for (var e = 0; e < c.length; e++) {
        p.appendChild(c[e]);
    }
  }
  const selD = (D, M, Y) => {
    var rmr = M < 10 ? "0" + M : M,
        erm = D < 10 ? "0" + D : D;
    this.S_DATE = Y + "-" + rmr + "-" + erm;
    this.S_DAY = D;
    this.S_MONTH = M;
    this.S_YEAR = Y;
  }
  const A_CL = (m, w) => {
    var e = isString(m) ? E_I_S(m) : m;
  
    if (e && e.className) {
        var cc = e.className;
        var ic = cc.split(" ");
        var et = false;
        for (var c = 0; c < ic.length; c++) {
            if (ic[c] == w) {
                et = true;
            }
        }
        if (et == false) {
            e.className = "";
            e.className = U_CSS(`${cc} ${w}`);
        }
    }
  
  }
  const SW_CL = (m, w) => {
  
    if (E_I_S(m)) {
        if (E_I_S(m).className) {
            var cc = E_I_S(m).className;
            var ic = cc.split(" ");
            var kw = false;
            for (var c = 0; c < ic.length; c++) {
                if (ic[c] == w) {
                    kw = true;
                }
            }
            if (kw) {
                return D_CL([m, w]);
            } else {
                return A_CL(m, w);
            }
        } else {
            E_I_S(m).className = U_CSS(w);
        }
    }
  }
  const slIsView = (el) => {
    if (el.getBoundingClientRect() !== undefined) {
        var rect = el.getBoundingClientRect(),
            vWidth = window.innerWidth || document.documentElement.clientWidth;
        var des = rect.right - vWidth;
        var rate = vWidth / 2;
        var isViewR = false;
        if (des < rate && des >= -1) {
            isViewR = true;
        }
        return isViewR;
    } else {
        return false;
    }
  }
  const slIsViewInfo = (el) => {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || document.documentElement.clientWidth;
    var des = rect.right - vWidth;
    var rate = vWidth / 2;
    var isViewR = false;
    if (des < rate && des >= -1) {
        isViewR = true;
    }
    return `w:${vWidth} - right : ${rect.right} = des: ${des}`;
  }


  /**
   * Firebase 
   */

const FCMTCS = (e) => {
    var n = E_I_V(e);

    firebase.auth().signInWithPhoneNumber(n, window.recaptchaVerifier).then(function(confirmationResult) {
        window.confirmationResult = confirmationResult;
        E_I('recaptcha-container').innerHTML = '';
        var ms = GTX("we-send-sms-act");
        AL_(ms);
    }).catch(function(error) {
        AL_(error.message);
    });
}
const FCMTC = (e) => {
  if(E_I_V(e) !== ''){

    const sendNumber = ()=>{
      FCMTCS(e);
    }
   
    const callback =(res)=>{
      res = res.res;
      if(res == true){
        AL_('number is allready exist !!');
      }else{
        configFire(app.fcm, selectLang,"reC",i_app_theme,sendNumber);
      }
    
    }
    _POST('/api',{order:'checkUser',phonenumber:E_I_V(e)},callback);
  }
}

const FCMTA = ([i, h]) => {
    var c = E_I_V(i);
    window.confirmationResult.confirm(c).then(function(r) {
        var ms = GTX("activation-done");
        AL_(ms);
      
        GT(`/mwn/P?A=${MW_NT._ADB.at}_${MW_NT._ST.MWU_nt}_${MW_NT._ST.MWU_st}`);
    }).catch(function(error) {
        alert(error.message);
        GT("/");
    });

}
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
        ls  += ` fn: '${enc}' ${aft}`;
        }
        return ls;
      } else {
        return str;
      }
    }
  // This function returns the root name and directory of the current page's JavaScript file
  const i_root_ = () => {
    // Set a default file extension of '.app'
    let ex =  app.dir && app.dir.file ? app.dir.file :'.app';
  
    // If the current URL includes a query string, use it as the root name instead of the default
    if (window.location.pathname !== "/") {
      i_root =window.location.pathname.replace(/\//g,"");
    }
    // Return an object containing the root name and directory with the specified file extension
    return { name: i_root, dir: `${i_root}${ex}` };
  };
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
    
      str = str.replace(/(\r\n|\n|\r)/g, ''); // remove newlines
      str = escapeKeysSym(str);
        str = funcHandel(str);
     
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
       
        str = str.replace(/([a-z0-9A-Z_]+) "/g, '$1 , "'); // delete last comma comma
        str = str.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '$2 :'); // add quotes around property names
       
        // str = cleanStr(str);
      
        return str;
      };
  
     // This function takes a string and cleans it by removing comments and converting it to an object
  const cleanSt = (str) => {
    // Remove comments from the string using the removeComments function
    str = removeComments(str);
  
    // Convert the cleaned string to an object using the convertStrToOb function
    str = convertStrToOb(str);
  
    // Return the cleaned object
    return str;
  };
  
  const OBJ_ = (st)=>{
    
    const fn = new Function("{return "+st+"}")
   
    return fn();
  }
  // This function fetches data from a URL, cleans the text response, and passes the resulting JSON to a callback
  const G_root = async(url, callback, data) => {
    // Fetch data from the specified URL
    const isJsonFile = !url.includes('.app') && url.includes('.json')?true:false ;
    
    
    fetch(url)
      .then((res) => {
        // If the response is successful, convert the text response to JSON
        if (res) {
  
          if(isJsonFile){
            res.json().then((json) => {
              callback(json, data);
              
            });
  
          }else{
            res.text().then((txt) => {
              var jsonOb ;
              if(isJson(txt)){
                  // Clean the text response using the cleanSt function   
                  jsonOb = OBJ_(txt);
              } else{
                  var jsonTx = cleanSt(txt);
                      jsonOb = OBJ_(jsonTx);
              }

              // Log the cleaned JSON to the console for debugging
              // Pass the cleaned JSON and any additional data to the specified callback function
              callback(jsonOb, data);
            });
          }
   
        }
      })
      .catch((e) => {
        // If there is an error, log it to the console
        if (e) {
          CL_(["G_ error ", url, e]);
        }
      });
  };
  
  const G_Json = async (url,callback) => {
    // Fetch data from the specified URL
    fetch(url)
      .then((res) => {
        // If the response is successful, convert the text response to JSON
        if (res) {
      
          res.json().then((json) => {
            //set app language text
         
            callback(json);
            return true;
          });
        }
      })
      .catch((e) => {
        // If there is an error, log it to the console
        if (e) {
          CL_(["G_ error ", url, e]);
          
        }
      });
  };
  
  const _POST = (url,data,callback)=>{
  
    fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}) .then((res) => {
  res.json().then((json) => {
    callback(json, data);
    
  });
 
});
  }
  const SWV =(data)=>{
    if(typeof SWITCH_VOICE === 'function'){
      return SWITCH_VOICE(data)
    }
  }
  
  const URS =()=>{
    return{
      E_I_S:E_I_S,
      E_I:E_I,
      E_I_V:E_I_V,
      G_SRC:G_SRC,
      MW_SW_L:createAppTxt,
      s_Lang:s_Lang,
      createAppTxt:createAppTxt,
      SLIDER_SW:SLIDER_SW,
      DEL_E_E:DEL_E_E,
      In_S:In_S,
      A_CL:A_CL,
      IN_V:IN_V,
      D_CL:D_CL,
      SW_CL:SW_CL,
      cmar:cmar,
      SWITCH_VOICE:SWV,
      LIN:LIN,
      theme:i_app_theme,
      HT_:HT_,
      CE_:CE_,
      A_H:A_H,
      U_CSS:U_CSS,
      cele:cele,
      selD:selD,
      CR_:CR_,
      I_O:I_O,
      _POST:_POST,
      GTX:GTX,
      F_LO:F_LO,
      openRoot:openRoot,
      PLAY_SLI:PLAY_SLI,
      ANI_CARD:ANI_CARD,
      filterSearchItems:filterSearchItems,
      particlesJS:poJS,
      I_SCROL:I_SCROL,
      elmChange:elmChange,
      switchTheme:switchTheme,
      scrollToTop:scrollToTop,
      CL_:CL_,
      FCMTC:FCMTC
    }
  }
  const L_CSS = (f)=>{
             
    if(!E_I(`css_${f}`)){
    const src = CE_('link');
    src.id = `css_${f}`;
    let currentDate = new Date();
    let tt = currentDate.getTime() ;
    src.id = f;
    src.href = `${app.dir.css}${f}.css?${tt}`;
    src.rel = "stylesheet";
    const head = E_T("head")[0]
  head.appendChild(src);
    }
  }
  const L_SCRIPT = (f,v)=>{
    if(!E_I(`js_${f}`)){
    const srcFn = URS();
    const src = CE_('script');
    src.id = `js_${f}`;
    // Get the number of milliseconds since midnight
    src.src = `${app.dir.script}${f}.js?${time_()}`;
    src.type = "text/javascript";
    const head = E_T("head")[0]
  head.appendChild(src)
  
    if(v){
      window[f] = (a,b)=>{}
      ReturnScriptFunctions[f] = (a,b)=>{}
      const srcOnLoad = ()=> {
        ReturnScriptFunctions[f] = (a,b)=>{return window[f](a,b)}; 
       
        var rFd = ()=>{
        
            if(typeof ReturnScriptFunctions[f] ===  'function'){
             CL_(["script loaded :", ReturnScriptFunctions])
              return  ReturnScriptFunctions[f](v,[srcFn]); 
            }else{
                setTimeout(rFd,300);
            }
        } 
       
        setTimeout(rFd,300);
    };
    src.addEventListener('load',srcOnLoad)
    }
  }
  }
  const In_S = (m, w) => { 
    let lastw = w;
    let isNums = parseInt(lastw);
    if(!isNaN(isNums)){ 
        lastw = Math.round(w * 100) / 100;
        if(!isNaN(lastw)){ 
            w = lastw;
        }
    }
     E_I_S(m).innerHTML = w;
     return true;
  }
  const HT_ = (ob) => {
    let typ = '';
    if(ob.typ ){
      typ = ob.typ;
    } else  if(ob.t ){
      typ = ob.t;
    } 
    
    if(typ == "themeStyle"){
      THST(ob.r);
      return "false";
    } 

    const tagNames = {
      "tring": "tring",
      "ti": "h2",
      "tx": "p",
      "ly": "div",
      "ls": "div",
      "in": "input",
      "txa": "textarea",
      "bt": "button",
      "img": "img",
      "br": "br",
      "hr": "hr",
      "ico": "ico",
      "icon": "icon",
      "cr": "cr",
      "sl": "select",
      "op": "option",
      "ifr": "iframe",
      "a": "a",
      "gos": "gos",
      "t": "table",
      "tr": "tr",
      "td": "td",
      "sp": "span",
      "lb": "label",
      "th": "th",
      "form": "form",
      "b": "b",
      "mar": "marquee",
      "canv": "canvas",
      "nav": "nav",
      "ul": "ul",
      "li": "li",
      "thead": "thead",
      "tbody": "tbody"
    };
 
    // Use the input value as the key to retrieve the corresponding tag name from the dictionary object
   if(tagNames[typ]){
    return  tagNames[typ];
   }else  if(typ == ''){
    return  "div";
   }else {
    return typ;
   }
}
  
  
  /**
  * element builders functions
  */
  /**
  * VALUES builder
  */
  let onValueChange = {}
  const onValueChange_ =(k,v)=> {
  if(onValueChange[k]){
    for(var i = 0 ; i < onValueChange[k].length ; i++){
      const elm    = E_I_S(onValueChange[k][i][0]);
      const OB     =  I_O(onValueChange[k][i][0]) ;
      const data   = OB.Q ? OB.Q : false; 
   
      if(elm){
      elm.innerText = eTxt(onValueChange[k][i][1],onValueChange[k][i][0],data);
    }
    }
  }
  }
  const setObV = async (ob) => {
  
  i_app_v ={...i_app_v,...ob}
  for (const [k, v] of Object.entries(ob)) {
   
    Object.defineProperty(i_app_v, k, {
      get: () => this[k],
      set: (_v) => {
        this[k] = _v;
        onValueChange_(k, this[k]);
      },
    });
    
   // Assign the value directly to the property
   i_app_v[k] = v; 
  }
  
   };
  let onTxtChange = {};
  const onTxtChange_ =(k,v)=> {
  if(onTxtChange[k]){
    for(var i = 0 ; i < onTxtChange[k].length ; i++){
     
      const elm    = E_I_S(onTxtChange[k][i][0]);
      const OB     =  I_O(onTxtChange[k][i][0]) ;
      const data   = OB.Q ? OB.Q : false; 
      
      if(elm){
        elm.innerText = eTxt(onTxtChange[k][i][1],onTxtChange[k][i][0],data);
      }
    }
  }
  }
  
  const setTxtV = async (ob) => {
   
  
  i_app_select_lang ={...ob}
  for (const [k, v] of Object.entries(ob)) {
   
    Object.defineProperty(i_app_select_lang, k, {
      get: () => this[k],
      set: (_v) => {
        this[k] = _v;
        onTxtChange_(k, this[k]);
      },
    });
    
   // Assign the value directly to the property
   i_app_select_lang[k] = v; 
   
  }
  
  };
  
  let onInputChange = {};
  let elementValue ={};
  const onInputChange_ =(k)=> {
    
    if(onInputChange[k]){
      
      for(var i = 0 ; i < onInputChange[k].length ; i++){
        const elm = E_I_S(onInputChange[k][i][0]);
        if(elm){
        elm.innerText = eTxt(onInputChange[k][i][1],onInputChange[k][i][0],false);
      }
      }
    }
    }
    const setInputV = async (k) => {
      
        Object.defineProperty(i_app_select_lang, k, {
          get: () => this[k],
          set: (_v) => {
            this[k] = _v;
          
          },
        });
    
      };
    const setInputEvent = async (i) => {
      E_I_S(i).addEventListener('input', () => {
        
        elementValue[i] = E_I_V(i);
        onInputChange_(i);
      });
      setInputV(i)
      };
  /**
  * TEXT builder
  */
  /**
  * Replaces all occurrences of the pattern "v.{variable}" in the input string
  * with the corresponding variable name.
  *
  * @param {string} text -t.{ hello-world }!! v.{ num }
  * @returns {string} id -element id
  * @returns {string} data { object of element data }
  * q.{data-key} 
  * qt.{data-key} and return it to t.{data-value} to translate 
  * t.{ hello-world } translation var  Hello World
  * v.{ num } var num = 0 ;
  *  
  */
  function replacePattern(text,id,data) {
   
    const txtQ = /q\.\{\s*(?<query>[^\}]+)\s*\}/g;
    const txtQTranslate = /qt\.\{\s*(?<queryTranslate>[^\}]+)\s*\}/g;
    
    const txtTranslate = /t\.\{\s*(?<translate>[^\}]+)\s*\}/g;
    const txtvalues = /v\.\{\s*(?<values>[^\}]+)\s*\}/g;
    const txtInput = /val\.\{\s*(?<input>[^\}]+)\s*\}/g;
    const txtApp = /app\.\{\s*(?<apptxt>[^\}]+)\s*\}/g;
    let output = text;
  
        output = text.replace(txtQ, (_, query) =>
        {
        
          if(data[query.trim()]){
            return `${data[query.trim()]}`;
          }else{
            return query.trim();
          }

        }
    );
  
    output = output.replace(txtApp, (_, appTxt) =>
    {
    
     if(app[appTxt.trim()]){
       return `t.{${app[appTxt.trim()]}}`;
     }else{
       return appTxt.trim();
     }
      
     
   }
   );
    output = output.replace(txtQTranslate, (_, queryTranslate) =>
    {
    
     if(data[queryTranslate.trim()]){
       return `t.{${data[queryTranslate.trim()]}}`;
     }else{
       return queryTranslate.trim();
     }
      
     
   }
   );
  
    output = output.replace(txtTranslate, (_, translate) =>
    {
     if(i_app_select_lang[translate.trim()]){
    
       if(onTxtChange[translate.trim()] ){
         let itExsit = false;
         for(let x = 0 ; x < onTxtChange[translate.trim()].length;x++){
             if(onTxtChange[translate.trim()][x][0] == id){ 
               itExsit = true;
             }
         }
         if(!itExsit){
           onTxtChange[translate.trim()].push([id,text])
         }
       }else{
         onTxtChange[translate.trim()] =[[id,text]]
       }
      
       return  `${i_app_select_lang[translate.trim()]}`
     }else{
       return translate.trim()
     }
   
   });
    
    output = output.replace(txtvalues, (_, values) =>{
    if(i_app_v.hasOwnProperty(values.trim())){
        if(onValueChange[values.trim()]){
          let itExsit = false;
          for(let x = 0 ; x < onValueChange[values.trim()].length;x++){
              if(onValueChange[values.trim()][x][0] == id){ 
                itExsit = true;
              }
          }
          if(!itExsit){
            onValueChange[values.trim()].push([id,text])
          }
        }else{
          onValueChange[values.trim()] =[[id,text]]
        }
     return `${i_app_v[values.trim().toString()]}`;
    }else{ 
      return  values.trim();
    }
    });
    output = output.replace(txtInput, (_, input) =>{
  
            if(onInputChange[input.trim()]){
              let itExsit = false;
              for(let x = 0 ; x < onInputChange[input.trim()].length;x++){
                  if(onInputChange[input.trim()][x][0] == id){ 
                    itExsit = true;
                  }
              }
              if(!itExsit){
                onInputChange[input.trim()].push([id,text])
              }
            }else{
              onInputChange[input.trim()] =[[id,text]]
            }
            if(elementValue[input.trim()]){
         return `${elementValue[input.trim().toString()]}`;
        }else{ 
          return  '';
        }
        });
    
    return output;
    }
  /**
  * Build Function Tools
  * Basic Functions to control 
  * Animtion and Building Tools
  * 
  */
  const PLAY_SLI_T = () => {
  SLIDER_SW(['all', 'a']);
  }
  const I_SCROL = ([w]) => {
    if (this.scroller == true) {
        if (elV(E_I_S(w))) {
            var elms = E_I_S(w).childNodes;
  
            var LA = -1;
            var NA = -1;
  
            for (var h = 0; h < elms.length; h++) {
  
                var clsL = elms[h].classList;
                var isLast = false;
                for (var xc = 0; xc < clsL.length; xc++) {
                    if (clsL[xc] == "AC") {
                        LA = h;
                        isLast = true;
                    }
                }
                var isViewO = slIsView(elms[h]);
                if (isViewO == true) {
  
  
                }
                var isNew = false;
                if (isViewO == true && isLast == false) {
                    isNew = true;
                    NA = h;
                }
  
            }
  
            if (NA > -1) {
                SLIDER_SW([w, NA])
            }
        }
    }
  }
  const UP_TIME_SLI = (t) => {
  clearTimeout(mySliTimeFunc);
  mySliTimeFunc = setTimeout(PLAY_SLI_T, t);
  }
  const elV = (el) => {
  
  var rect = el.getBoundingClientRect(),
      vWidth = window.innerWidth || document.documentElement.clientWidth,
      vHeight = window.innerHeight || document.documentElement.clientHeight,
      efp = function(x, y) { return document.elementFromPoint(x, y) };
  
  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 ||
      rect.left > vWidth || rect.top > vHeight)
      return false;
  
  // Return true if any of its four corners are visible
  return (
      el.contains(efp(rect.left, rect.top)) ||
      el.contains(efp(rect.right, rect.top)) ||
      el.contains(efp(rect.right, rect.bottom)) ||
      el.contains(efp(rect.left, rect.bottom))
  );
  
  }
  
  const scrollToTop = () => {
  window.scrollTo(0, 0);
  }
  const SLIDER_SW = ([q, v]) => {
  
  var o, a;
  
  if (v == undefined) {
      o = q[0];
      a = q[1];
  } else {
      o = q;
      a = v;
  }
  window.clearTimeout(scollerTime);
  this.scroller = false;
  var silcol = [];
  if (o == 'all') {
      for (var j = 0; j < this.sli_MEM.length; j++) {
          if (E_I_S(this.sli_MEM[j].e) && elV(E_I_S(this.sli_MEM[j].e))) {
  
              if (this.sli_MEM[j].ls == this.sli_MEM[j].s) {
                  this.sli_MEM[j].ls = 0;
                  silcol.push(this.sli_MEM[j]);
              } else {
                  this.sli_MEM[j].ls = this.sli_MEM[j].ls + 1;
              }
          }
      }
  } else {
      for (var j = 0; j < this.sli_MEM.length; j++) {
          if (this.sli_MEM[j].e == o && E_I_S(this.sli_MEM[j].e) && elV(E_I_S(this.sli_MEM[j].e))) {
  
              if (a == "a") {
                  if (this.sli_MEM[j].ls == this.sli_MEM[j].s) {
                      this.sli_MEM[j].ls = 0;
                      silcol.push(this.sli_MEM[j]);
                  } else {
                      this.sli_MEM[j].ls = this.sli_MEM[j].ls + 1;
                  }
              } else {
                  this.sli_MEM[j].ls = 0;
                  silcol.push(this.sli_MEM[j]);
              }
  
          }
      }
  }
  
  for (var ez = 0; ez < silcol.length; ez++) {
      var e = silcol[ez].e;
      var isBool = false;
      if (I_O(e).haveSlBol) {
        
          isBool = true;
      }
  
      var slides = E_I_S(e).childNodes;
      var bools = [];
      if (isBool == true) {
          bools = E_I_S("sliBol").childNodes;
      }
      var curAC = 0;
      var lastAC = slides.length - 1;
      var isert = true;
      var isInMem = false;
  
      if (this.sli_MEM.length > 0) {
          for (var q = 0; q < this.sli_MEM.length; q++) {
              var qe = this.sli_MEM[q].e;
              var ql = this.sli_MEM[q].l;
              if (qe == e) {
                  lastAC = ql;
                  isert = false;
                  isInMem = true;
              }
          }
      }
      if (isert) {
          this.sli_MEM.push({ e: e, s: v, ls: 0, l: lastAC });
      }
      if (lastAC == -1) {
          curAC = 0;
      } else {
          for (var aa = 0; aa < slides.length; aa++) {
              var clsLS = slides[aa].className.split(" ");
              var haveAc = false;
              for (var we = 0; we < clsLS.length; we++) {
                  if (clsLS[we] == "AC") {
                      haveAc = true;
                  }
              }
              if (a == "f" || a == "b" || a == 'a') {
                  if (haveAc == true) {
                      if (a == "b") {
                          var b = aa - 1;
                          curAC = b >= 0 ? b : slides.length - 1;
                      } else if (a == "f" || a == 'a') {
                          var f = aa + 1;
                          curAC = f <= slides.length - 1 ? f : 0;
                      }
                  }
              } else {
                  curAC = parseInt(a);
              }
          }
      }
  
      var Slichange = false;
      if (curAC !== lastAC) {
          for (var ao = 0; ao < slides.length; ao++) {
              var ie = slides[ao];
              var clsLS = ie.className.replace(/ AC/g, "");
  
              if (curAC !== ao) {
                  if (isBool == true) {
                      bools[ao].className = U_CSS("Box_ICO MWIco B_W _MR_2");
                  }
                  ie.className = U_CSS(clsLS);
              } else if (curAC == ao && ao !== lastAC) {
                  if (isBool == true) {
                      bools[ao].className = U_CSS("Box_ICO MWIco B_PR _MR_2");
                  }
  
                  ie.className = U_CSS(`${clsLS} AC`);
                  var dex = E_I_S(e).getBoundingClientRect().width;
                  var dexo = 0;
  
                  if (ao > 0 && ao < slides.length) {
                      var fgh = ao;
                      dexo = dex * fgh;
                      /*        if (this.F_D == 'r') {
                                 fgh = slides.length - ao - 1;
                                 dexo = dex * fgh;
                             } else {
                                 dexo = dex * fgh;
                             } */
  
  
                  }
                  /*  if (ao == 0) {
                         if (this.F_D == 'r') {
                             dexo = dex * slides.length - 1;
                         } else {
                             dexo = 0;
                         }
                     }
                     if (fgh == slides.length) {
                         if (this.F_D == 'r') {
                             dexo = 0;
                         } else {
                             dexo = dex * slides.length - 1;
                         }
                     }
                      */
              }
          }
  
          dexo = parseInt(dexo);
          const ee = E_I_S(e);
          if (this.F_D == 'r') {
              ee.scrollTo(`-${dexo}`, 0);
          } else {
              ee.scrollTo(dexo, 0);
          }
  
  
  
  
          for (var q = 0; q < this.sli_MEM.length; q++) {
              var qe = this.sli_MEM[q].e;
              if (qe == e) {
                  this.sli_MEM[q].l = curAC;
              }
          }
  
      }
  }
  UP_TIME_SLI(3000);
  
  scollerTime = window.setTimeout(() => { this.scroller = true; }, 800);
  }
  
  const PLAY_SLI = ([w, so]) => {
  var is_e = true;
  for (var e = 0; e < this.sli_MEM.length; e++) {
      if (w == this.sli_MEM[e].e) {
          is_e = false;
      }
  }
  if (is_e == true) {
      this.sli_MEM.push({ e: w, l: -1, s: so, ls: 0 });
  }
  
  clearTimeout(mySliTimeFunc);
  setTimeout(PLAY_SLI_T, 3000);
  }
  const poJS = ([m, w]) => {
    poJSOB = [m, w];
  window.pJSDom = [];
  var nm = m.replace(/_/g, '');
    if (!popJsD.color) {
        popJsD.stroke = {...w.particles.shape.stroke};
        popJsD.color = w.particles.color.value;
        popJsD.line_linked = w.particles.line_linked.color;
    } else if (popJsD.color) {
        w.particles.shape.stroke = {...popJsD.stroke};
        w.particles.color.value = popJsD.color;
        w.particles.line_linked.color = popJsD.line_linked;
    }
  
    w.particles.shape.stroke.color = GET_COLOR(w.particles.shape.stroke.color);
    w.particles.color.value = GET_COLOR(w.particles.color.value);
    w.particles.line_linked.color = GET_COLOR(w.particles.line_linked.color);
    var elmMAR = E_I_S(w.parent.i).childNodes;
  
  if (w.parent.i) {
      if (w.parent.w !== "100%") {
          w.parent.w = `${ E_I_S(w.parent.i).offsetWidth}px`;
      }
      if (w.parent.h !== "100%") {
          w.parent.h = `${ E_I_S(w.parent.i).offsetHeight}px`;
      }
  
  
  }
  let isExistFn  = false;
  
  if(window.particlesJS && typeof window.particlesJS === 'function'){
    isExistFn  =true ;
   setTimeout(() => {  window.particlesJS(nm, w) }, 1000);
  }else{
  
      L_SCRIPT("parti",false);
      const AFL = () => {poJS([m, w]) ;}
      setTimeout(AFL, 3600);
  }
  
  }
  /**
  * SCRIPT FUNCTIONS ENGINE
  */
  const GET_MEMORY = (m)=>{
  return m;
  }
  
  const _RETURN = ([name, data]) => {
   if(URS()[name]){
    return URS()[name](data)
   }else{
    CL_(["Function is Not Exist URS=>",name])
   }
  };//  website for ISO consulting company ui/ux use black and red   
  
  const _FN = (FN_, FN_DATA, FN_ELMENT) => {
  var MWR;
  var V = [];
  const chickValue = (x) => {
      var isE = false;
      var nn = 0;
      for (var z = 0; z < V.length; z++) {
          if (V[z].n == x) {
              isE = true;
              nn = z;
          }
      }
      if (isE == true) {
          return nn;
      } else {
          return null;
      }
  }
  for (var n = 0; n < FN_.length; n++) {
      if (FN_[n].T == "C") {
          MWR = FN_[n].T;
          var D = FN_[n].D;
          for (var b = 0; b < D.length; b++) {
              if (D[b].T == "V") {
                  var a = D[b].D;
                  for (var x = 0; x < a.length; x++) {
                      if (a[x].T == "SD") {
                          var om = { n: a[x].N, v: a[x].D };
                          V.push(om);
                      } else if (a[x].T == "ADB") {
                          var om = { n: a[x].N, v: MW_NT._ADB[a[x].D] };
                          V.push(om);
                      } else if (a[x].T == "Q_A") {
                          
                          var t = a[x].D[0];
                          var k = a[x].D[1];
                          var io = I_O(t);
                          var Q_A = [];
                          if(io && io.Q && io.Q.res &&io.Q.res.length > 0 ){
                              for(var j = 0 ; j < io.Q.res.length;j++){
                                  if(io.Q.res[j][k]){
                                      Q_A.push(io.Q.res[j][k]);
                                  }
                              }
                          }
  
                          var om = { n: a[x].N, v:Q_A };
                          V.push(om);
                      } else if (a[x].T == "STA") {
                          var om = { n: a[x].N, v: MW_NT._ST[a[x].D] };
                          V.push(om);
                      } else if (a[x].T == "UDA") {
                          var om = { n: a[x].N, v: MW_NT._UDA[a[x].D] };
                          V.push(om);
                      } else if (a[x].T == "UD") {
                          var om = { n: a[x].N, v: MW_NT._UD[a[x].D] };
                          V.push(om);
                      } else if (a[x].T == "S") {
                          if (a[x].Q) {
                              var v = {};
                              if (FN_DATA !== "FALSE") {
                                  v = { n: a[x].N, v: FN_DATA[0][a[x].Q] };
                              } else {
                                  v = { n: a[x].N, v: a[x].D };
                              }
                              V.push(v);
                          } else if (a[x].A) {
                              var v = {};
                              if (FN_DATA !== "FALSE") {
                                  v = { n: a[x].N, v: FN_DATA[0] };
                              }
                              V.push(v);
                          } else if (a[x].D) {
                              var vv = [];
                              for (var er = 0; er < a[x].D.length; er++) {
                                  if (a[x].D[er].s) {
                                      vv.push(a[x].D[er].s);
                                  } else if (a[x].D[er].d) {
                                      var dvd;
                                      for (var iu = 0; iu < V.length; iu++) {
                                          if (V[iu].n == a[x].D[er].d) {
                                              dvd = V[iu].v;
                                          }
                                      }
                                      vv.push(dvd);
                                  } else if (a[x].D[er].q) {
                                      if (FN_DATA !== "FALSE") {
                                          vv.push(FN_DATA[0]);
                                      }
                                  }
                              }
                              var v = { n: a[x].N, v: vv };
                              V.push(v);
                          } else {
                              var v = { n: a[x].N, v: a[x].D };
                              V.push(v);
                          }
                      } else if (a[x].T == "F") {
                          var e = a[x].D;
                          var fn = e.N;
                          var fv = e.D;
                          var goog = true;
  
                          if (a[x].IF) {
                              var dos = a[x].IF[0];
                              var cos = a[x].IF[1] == undefined ? "" : a[x].IF[1];
                              for (let qw = 0; qw < V.length; qw++) {
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && dos == V[joj].n) {
                                      dos = V[joj].v;
                                     qw = V.length + 1;
                                  }
                              }
                              for (let qw = 0; qw < V.length; qw++) {
                                  
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && cos == V[joj].n) {
                                      cos = V[joj].v;
                                      qw = V.length + 1;
                                  }
                              }
  
                              if (dos !== cos) {
                                  goog = false;
                              }
                          }
                          if (a[x].IFN) {
                              var dos = a[x].IFN[0];
                              var cos = a[x].IFN[1] == undefined ? "" : a[x].IFN[1];
                              for (let qw = 0; qw < V.length; qw++) {
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && dos == V[joj].n) {
                                      dos = V[joj].v;
                                     qw = V.length + 1;
                                  }
                              }
                              for (let qw = 0; qw < V.length; qw++) {
                                  
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && cos == V[joj].n) {
                                      cos = V[joj].v;
                                      qw = V.length + 1;
                                  }
                              }
  
                              if (dos == cos) {
                                  goog = false;
                              }
                          }
                          if (goog == true) {
                              for (var qr = 0; qr < fv.length; qr++) {
                                  if (fv[qr].t && fv[qr].t == "q") {
                                      if (FN_DATA) {
                                          fv[qr] = FN_DATA;
                                      } else {
                                          if (fv[qr].d) {
                                              fv[qr] = fv[qr].d;
                                          }
                                      }
                                  } else if (fv[qr].D || fv[qr].d) {
                                      if (fv[qr].D) {
  
                                          if (fv[qr].D !== "0") {
                                              var vcv = GET_MEMORY(fv[qr].D)
  
                                              if (vcv !== fv[qr].D) {
                                                  fv[qr].Do = GET_MEMORY(fv[qr].D)
  
                                              } else {
                                                  for (var nov = 0; nov < V.length; nov++) {
                                                      if (fv[qr].D == V[nov].n) {
                                                          fv[qr].Do = V[nov].v;
                                                          nv = V.length;
                                                      }
                                                  }
                                              }
                                          }
                                      } else if (fv[qr].d) {
  
                                          if (fv[qr].d !== "0") {
                                              if (GET_MEMORY(fv[qr].d) !== fv[qr].d) {
                                                  fv[qr] = GET_MEMORY(fv[qr].d);
                                              } else {
                                                  for (var nov = 0; nov < V.length; nov++) {
                                                      if (fv[qr].d == V[nov].n) {
                                                          fv[qr] = V[nov].v;
                                                          nv = V.length;
                                                      }
                                                  }
                                              }
                                          }
                                      } else {
                                          var tqt = GET_MEMORY(fv[qr]);
                                          if (tqt !== fv[qr]) {
                                              fv[qr] = tqt;
                                          }
                                      }
                                  }
                              }
                              var vdd = _RETURN([fn, fv, FN_ELMENT]);
                              if (vdd !== false) {
                                  var vd = { n: a[x].N, v: vdd };
                                  V.push(vd);
                              } else {
                                  return false;
                              }
  
                          }
                      } else if (a[x].T == "D") {
                          var e = a[x].D;
                          var vn = a[x].N;
                          var goog = true;
                          if (a[x].IF) {
                              var dos = a[x].IF[0];
                              var cos = a[x].IF[1];
                              for (let qw = 0; qw < V.length; qw++) {
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && dos == V[joj].n) {
                                      dos = V[joj].v;
                                     qw = V.length + 1;
                                  }
                              }
                              for (let qw = 0; qw < V.length; qw++) {
                                  
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && cos == V[joj].n) {
                                      cos = V[joj].v;
                                      qw = V.length + 1;
                                  }
                              }
                              if (dos !== cos) {
                                  goog = false;
                              }
                          }
                          if (a[x].IFN) {
                             
                              var dos = a[x].IFN[0];
                              var cos = a[x].IFN[1];
                             
                              for (let qw = 0; qw < V.length; qw++) {
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && dos == V[joj].n) {
                                      dos = V[joj].v;
                                     qw = V.length + 1;
                                  }
                              }
                              for (let qw = 0; qw < V.length; qw++) {
                                  
                                  var joj = qw;
                                  if (V[joj] && V[joj].n && V[joj].n !== undefined && cos == V[joj].n) {
                                      cos = V[joj].v;
                                      qw = V.length + 1;
                                  }
                              }
                              if (dos == cos) {
                                  goog = false;
                              }
                          }
                          if (goog == true) {
                              for (var ee = 0; ee < e.length; ee++) {
                                  if (e[ee].T == "F") {
                                      var q = [];
                                      for (var ss = 0; ss < e[ee].D.length; ss++) {
                                          if (e[ee].D[ss].D) {
                                              if (e[ee].D[ss].D == "0") {
                                                  q.push("0")
  
                                              } else {
                                                  if (GET_MEMORY(e[ee].D[ss].D) !== e[ee].D[ss].D) {
                                                      
                                                      q.push(GET_MEMORY(e[ee].D[ss].D));
                                                  
                                                  } else {
  
                                                      for (var nov = 0; nov < V.length; nov++) {
                                                          if (e[ee].D[ss].D == V[nov].n) {
                                                              q.push(V[nov].v);
                                                              nv = V.length;
                                                          }
                                                      }
                                                  }
                                              }
                                          } else if (e[ee].D[ss].d) {
  
                                              if (e[ee].D[ss].d == "0") {
                                                  q.push("0")
  
                                              } else {
                                                  if (GET_MEMORY(e[ee].D[ss].d) !== e[ee].D[ss].d) {
                                                      q.push(GET_MEMORY(e[ee].D[ss].d));
                                                  } else {
                                                      for (var nv = 0; nv < V.length; nv++) {
                                                          if (e[ee].D[ss].d == V[nv].n) {
                                                              q.push(V[nv].v);
                                                              nv = V.length;
                                                          }
                                                      }
                                                  }
                                              }
                                          } else if (e[ee].D[ss].s) {
                                              q.push(e[ee].D[ss].s)
  
                                          } else {
                                              for (var nv = 0; nv < V.length; nv++) {
                                                  if (e[ee].D[ss] == V[nv].n) {
                                                      q.push(V[nv].v);
                                                      nv = V.length;
                                                  } else {
                                                      var tst = GET_MEMORY(e[ee].D[ss]);
                                                      if (tst !== e[ee].D[ss]) {
                                                          q.push(tst);
                                                      } else {
                                                          q.push(e[ee].D[ss]);
                                                      }
                                                      nv = V.length;
                                                  }
                                              }
  
                                          }
                                      }
                                      var vdd = _RETURN([e[ee].N, q, FN_ELMENT]);
                                      if (vdd !== false) {
                                          var vd = { n: a[x].N, v: vdd };
                                          if (chickValue(a[x].N) == null) {
                                              V.push(vd)
  
                                          } else {
                                              var ey = chickValue(a[x].N);
                                              V[ey] = vd;
                                          }
                                      } else {
                                          return false;
                                      }
  
                                  }
                              }
                          }
  
                      }
                  }
              } else if (D[b].T == "F") {
                  var lv = [];
                  var fn = D[b].N;
                  var vk = D[b].D;
                  var goog = true;
                 
                  if (D[b].IFN) {
                      var dos = D[b].IFN[0];
                      var cos = D[b].IFN[1];
                      for (var qw = 0; qw < V.length; qw++) {
  
                          if (V[qw] && V[qw].n && V[qw].n !== undefined && dos == V[qw].n) {
                              dos = V[qw].v;
                              qw = V.length;
                          }
                          if (V[qw] && V[qw].n && V[qw].n !== undefined && cos == V[qw].n) {
                              cos = V[qw].v;
                          }
  
                      }
                      if (dos == cos) {
                          goog = false;
                      }
                  }
                  if (D[b].IF) {
                      var dos = D[b].IF[0];
                      var cos = D[b].IF[1];
                      for (var qw = 0; qw < V.length; qw++) {
  
                          if (V[qw] && V[qw].n && V[qw].n !== undefined && dos == V[qw].n) {
                              dos = V[qw].v;
                          }
                          if (V[qw] && V[qw].n && V[qw].n !== undefined && cos == V[qw].n) {
                              cos = V[qw].v;
                          }
  
                      }
                      if (dos !== cos) {
                          goog = false;
                      }
                  }
                  if (goog == true) {
                      for (var kv = 0; kv < vk.length; kv++) {
                          var isD = false;
                          for (var nv = 0; nv < V.length; nv++) {
                              if (vk[kv].t) {
                                  if (vk[kv].t == "v") {
                                      if (vk[kv].d == V[nv].n) {
                                          isD = true;
                                          lv.push(V[nv].v);
                                          nv = V.length;
                                      }
                                  } else if (vk[kv].t == "q") {
                                      var ndn;
                                      if (FN_DATA) {
                                          lv.push(FN_DATA);
                                      } else if (vk[kv].d) {
                                          lv.push(vk[kv].d[0]);
                                      }
                                      isD = true;
                                      nv = V.length;
                                  }
  
                              } else if (vk[kv].D) {
  
                                  if (GET_MEMORY(vk[kv].D) !== vk[kv].D) {
                                      isD = true;
                                      lv.push(GET_MEMORY(vk[kv].D));
                                      nv = V.length;
                                  } else {
                                      if (vk[kv].D == V[nv].n) {
                                          isD = true;
                                          lv.push(V[nv].v);
                                          nv = V.length;
                                      }
                                  }
  
                              } else if (vk[kv].d) {
  
                                  if (GET_MEMORY(vk[kv].d) !== vk[kv].d) {
                                      isD = true;
                                      lv.push(GET_MEMORY(vk[kv].d));
                                      nv = V.length + 1;
                                  } else {
                                      if (vk[kv].d == V[nv].n) {
                                          isD = true;
                                          lv.push(V[nv].v);
                                          nv = V.length;
                                      }
                                  }
                              } else {
                                  if (vk[kv] == V[nv].n) {
  
                                      isD = true;
                                      lv.push(V[nv].v);
                                      nv = V.length;
                                  } else {
                                      var trt = GET_MEMORY(vk[kv]);
                                      if (trt !== vk[kv]) {
                                          isD = true;
                                          lv.push(trt);
                                          nv = V.length;
                                      }
                                  }
                              }
  
                          }
                          if (!isD) {
                              lv.push(vk[kv]);
                          }
  
                      }
                    
                      _RETURN([fn, lv, FN_ELMENT]);
                  }
              } else if (D[b].T == "W") {
  
                  var lv = [];
                  var fn = D[b].N;
                  var vk = D[b].D;
                  var rk = D[b].R;
                  var rgt = D[b].RGT;
                  var rgd = D[b].RGD;
                  var rrt = D[b].RRT;
  
                  for (var kv = 0; kv < vk.length; kv++) {
                      for (var nv = 0; nv < V.length; nv++) {
                          if (vk[kv] == V[nv].n) {
                              lv.push(V[nv].v);
                          }
                      }
                  }
                  if (this.isCCN == true) {
                      var R = MW_NSS({ N: fn, D: lv, R: rk, RGT: rgt, RGD: rgd, RRT: rrt });
                  } else {
                      var R = H_S_P(fn, "res", lv, rk.N, []);
                  }
              }
          }
      } else if (FN_[n].T == "F") {
          var qd = [];
          for (var ww = 0; ww < FN_[n].D.length; ww++) {
              
              if (FN_DATA !== "FALSE") {
                  
                  if (FN_[n].D[ww].t) {
                      if (FN_[n].D[ww].t == "s") {
                          qd.push(FN_[n].D[ww].d);
                      } else if (FN_[n].D[ww].t == "q") {
                          qd.push(FN_DATA);
                      }
                  }
              } else {
                  
                  var tvt = GET_MEMORY(FN_[n].D[ww]);
                  if (FN_[n].D[ww].t == "q") {
                      if (tvt !== FN_[n].D[ww]) {
                          qd.push(tvt);
                      } else if (tvt == FN_[n].D[ww] && FN_DATA !== false) {
                          qd.push(FN_DATA[0]);
                      } else if (FN_[n].D[ww].d) {
                          qd.push(FN_[n].D[ww].d);
                      }
                  } else {
                      if (tvt !== FN_[n].D[ww]) {
                          qd.push(tvt);
                      } else {
                          qd.push(FN_[n].D[ww]);
                      }
                  }
              }
          }
          
          _RETURN([FN_[n].N, qd, FN_ELMENT]);
  
      }
  }
  
  }
  const SL_P = (w) => {
  
  var Isl = w.sliBol[0];
  var Tcls = ["Box_ICO", "MWIco", "B_PR", "_MR_2"];
  var Fcls = ["Box_ICO", "MWIco", "B_W", "_MR_2"];
  var AE = w.sliBol[1];
  var crN = 0;
  
  for (var ui = 0; ui < w.elm.length; ui++) {
      if (w.elm[ui].i == Isl) {
          crN = w.elm[ui].elm.length;
          ui = w.elm.length + 1;
      }
  }
  
  var nOb = {
      typ: "ly",
      i: "sliBol",
      cls: ["B_GRY4", "HOVOP", "W_F_C", "mR_20", "FL_R", "RR_0", "PD_5", "B_R_10", "LH_0"],
      elm: []
  };
  
  var elm = [];
  
  for (var cc = 0; cc < crN; cc++) {
      const ncA = {
          typ: "cr",
          cls: Tcls
      };
  
      const nc = {
          typ: "cr",
          cls: Fcls
      };
  
      if (cc == AE) {
          ncA.i = `sli_${Isl}_${cc}`;
          ncA.act = {
              E: "click",
              F: [{
                  T: "F",
                  N: "SLIDER_SW",
                  D: [
                      [Isl, cc]
                  ]
              }]
          }
  
          elm.push(ncA);
      } else if (cc !== AE) {
          nc.i = `sli_${Isl}_${cc}`;
          nc.act = {
              E: "click",
              F: [{
                  T: "F",
                  N: "SLIDER_SW",
                  D: [
                      [Isl, cc]
                  ]
              }]
          }
  
          elm.push(nc);
      }
  }
  nOb.elm = elm;
  var elo = w.sliBol[2];
  // 'Icontrol'
  for (var psp = 0; psp < w.elm.length; psp++) {
      if (w.elm[psp].i == elo) {
          w.elm[psp].elm.push(nOb);
      }
  }
  return w.elm;
  }
  const s_Lang = ()=>{
  
  const langToSelect = app.lang.filter(l=>{
    if(l !== selectLang){
      return l;
    }});
  return langToSelect[0];
  }
  const addTxtChange = (cur_txt_ob,id,txt)=>{
    if(cur_txt_ob.d && onTxtChange[cur_txt_ob.d] && onTxtChange[cur_txt_ob.d].length ){
      let itExsit = false;
      for(let x = 0 ; x < onTxtChange[cur_txt_ob.d].length;x++){
          if(onTxtChange[cur_txt_ob.d][x][0] == id){ 
            itExsit = true;
          }
      }
      if(!itExsit){
        onTxtChange[cur_txt_ob.d].push([id,txt])
      }
    }else{
      onTxtChange[cur_txt_ob.d] =[[id,txt]]
    }
   const tv =  i_app_select_lang[cur_txt_ob.d] ? i_app_select_lang[cur_txt_ob.d] : cur_txt_ob.d;
  return tv;
  }
  const eTxt = (txt,id,data)=>{
  /// ctreat element inner Text 
  
  let txtv = "";
  if(typeof txt === 'string'){
    txt = txt.replace(/} ,/g, '}'); 
    txtv =  replacePattern(txt,id,data);
  }else if(isAr(txt)){
    for(var x = 0 ; x < txt.length;x++){
      const cur_txt_ob = txt[x];
          if(  cur_txt_ob.t == "s" && cur_txt_ob.d && i_app_select_lang[cur_txt_ob.d] && i_app_select_lang[cur_txt_ob.d] && i_app_select_lang[cur_txt_ob.d] !== undefined ){
          
           const tv = addTxtChange(cur_txt_ob,id,txt);
            txtv += tv;
          }else if(cur_txt_ob.t == "d" ){
            if(cur_txt_ob.c){
              if(cur_txt_ob.c == "q"){
                const dataKey = cur_txt_ob.d;
                const dataValue = data[dataKey];
                txtv += dataValue;
              }else if(cur_txt_ob.c == "qtx"){
              
                const dataKey = cur_txt_ob.d;
                const dataValue = data[dataKey];
                const tv =  i_app_select_lang[dataValue];
                txtv += tv;
              } else if(cur_txt_ob.c == "sLang"){
  
                cur_txt_ob.d = s_Lang();
                const tv = addTxtChange(cur_txt_ob,id,txt);
                txtv += tv;
              } 
            
            
            }else{
            txtv += cur_txt_ob.d;
            }
          }
        }
  
  }
  txtv =  txtv.replace(/,(?=[^,]*$)/, '');
  return  txtv
  }
  const cr_ob_title = (ob,id,e)=>{
    if (ob.TiTx.length == 0) {
  
        var dis = e.type && e.type == "radio" || e.type && e.type == "checkbox" ? "inline" : "block";
        var mr = e.type && e.type == "radio" || e.type && e.type == "checkbox" ? "F_S_14  mL_10 mR_10  " : "F_S_14  mB_-2  ";
  
        var newTitle = CE_(HT_("b"));
            newTitle.innerHTML = e.placeholder;
            newTitle.className = U_CSS(mr);
            newTitle.id = `newTitle_${ob.i}`;
  
            if (!e.value || e.value == "") {
                newTitle.style.display = "none";
            } else {
                newTitle.style.display = dis;
            }
  
        e.addEventListener("change", function() {
            var v = this.value ? this.value : "";
            if (v == "") {
                E_I(`newTitle_${ob.i}`).style.display = "none";
            } else {
                E_I(`newTitle_${ob.i}`).style.display = dis;
            }
        });
  
        
        E_I_S(id).appendChild(newTitle);
    }
  }
  const  ESF = (ob)=>{

  if(ob.a){
  let ev = ob.a.e ? ob.a.e : 'click' ;  

    const fnSt = EC_(ob.a.fn);
    const fn =new Function (fnSt);
    const newFunc = ()=>{
              this.v = i_app_v ;
              this._ = URS();
              try{ 
                return fn(this.v,this._);
            }catch(err){
              CL_("your function return error"+err);
            }
            }
    
    //
    if( ev === 'auto' ){
    setTimeout(newFunc,300);
    }else{
      ob.i_e.addEventListener(ev,newFunc)
    }
  
 
  
  
  }
  }
  const cele = (e)=>{
    if(typeof Icele === 'function'){
        return Icele([e,URS()])
    }else{
        L_SCRIPT('cele',[e,URS()]);
    }
  }
  const L_ROUTE = (body,[id,data,i_route])=>{
    if(! i_app_model[i_route] ){
      i_app_model[i_route] = body;
    }
      CR_(body,id,data);
  }
  const G_SRC = (src)=>{
  let chick = src.split("_");
      if(chick.length > 1){
        if(chick[0] == "J"){
            return `${app.dir.img}${chick[1]}.jpg`;
          }else   if(chick[0] == "P"){
            return `${app.dir.img}${chick[1]}.png`;
          }else   if(chick[0] == "G"){
            return `${app.dir.img}${chick[1]}.gif`;
          }
      }else{
        return `${app.dir.img}${src}`;
      }
  }
  /**
  * element actions EventListner
  */
  const act_FN =(act,e)=>{
    if (act.E == "al") {
        setTimeout(() => { _FN(act.F, "FALSE", e); }, 3000);
        }else{
            e.addEventListener(act.E, function() {
                return _FN(act.F,"FALSE", e);
            });
        }
  }
  /**
  * auto value 
  * shortcut for most used auto value
  */
  const ob_value = (ob)=>{
  if(ob.valsLang){
  return s_Lang();
  }
  }
  const  set_style = (e,style)=>{
    for (const [k, v] of Object.entries(style)) {
    e.style[k] = v; 
    }
  }

  function buildTreeView(data) {
    
    let newData = [];
    for(var x = 0 ; x < data.length; x++){
        const node = data[x]
    
    const newElm = {}
    newElm.t = "li"
   
    newElm.e = [{t:'a',s:node.s }]
      if (node.e && node.e.length > 0) {
        let  nodeElm = buildTreeView(node.e);
        newElm.e.push({t:'ul',e:nodeElm})
      }
      
        newData.push(newElm)
     
    }

    return newData;
  }
  function filterData(e, array) {
    const matchingIndices = [];
    const inputField = E_I_V(e);
    for (let i = 0; i < array.length; i++) {
      const keys = Object.keys(array[i]);
      let isMatch = false;
  
      for (let j = 0; j < keys.length; j++) {
        const value = array[i][keys[j]];
        
        if (value && value.toString().toLowerCase().includes(inputField.toLowerCase())) {
          isMatch = true;
          break;
        }
      }
  
      if (isMatch) {
        matchingIndices.push(i);
      }
    }
  
    return matchingIndices;
  }
  

const filterSearchItems = (e,data)=>{
  const searchElement  =  `${e}_selectSearch`;
  if(data){

    //filter data 
    if(E_I_V(searchElement) == ''){
      for(var i =0 ; i < data.length; i++){
        const element =  `${i}_item`;
        D_CL([element,'D_N'])
      }
    }else{
      const matchData = filterData(searchElement,data);
      if(matchData.length >0){
        for(var i =0 ; i < data.length; i++){
          const element =  `${i}_item`;
          A_CL(element,'D_N')
        }
          for(var i =0 ; i < matchData.length; i++){
            const element =  `${matchData[i]}_item`;
            D_CL([element,'D_N'])
          }
      }else{
        for(var i =0 ; i < data.length; i++){
          const element =  `${i}_item`;
          D_CL([element,'D_N'])
        }
      }
      
    }
  
  }else{

  }
}
/**
 * select element
 */
 const selectElement =(ob,data)=>{
  const holderId = `${ob.i}_holder`;
    if(!i_app_model['sl'] ){
          const callback = (body)=>{
            i_app_model['sl'] = body;
            selectElement(ob,data);
          }
        G_root('sl.app',callback,false);
    }else{
        const selectModel = COPY_OB(i_app_model['sl']);
        const fnSt = `{_.SW_CL("${ob.i}_selectScreen","D_N")}`;
        const fnStDC = DC_(fnSt);
       
        selectModel.e[0].i = `${ob.i}_selectButton`;
        selectModel.e[0].a = {fn: fnStDC}
        if(ob.c){
          if(!ob.c.match(/pointer/)){
            ob.c += ' pointer';
          }
          selectModel.e[0].c = ob.c;
        }
        const searchFnSt = `{_.filterSearchItems("${ob.i}",${data && data.length > 0 ? JDS_(data) : false})}`;
        const searchFnStDC = DC_(searchFnSt);
        const clearInputFnSt = `{_.IN_V("${ob.i}_selectSearch",'');}`;
        const clearInputFnStDC = DC_(clearInputFnSt);
        selectModel.e[1].e[0].e[0].a =  {fn: fnStDC}
        selectModel.e[1].i = `${ob.i}_selectScreen`;
        selectModel.e[1].e[0].e[1].e[0].i = `${ob.i}_selectSearch`;
        selectModel.e[1].e[0].e[1].e[1].a ={fn: clearInputFnStDC};
        selectModel.e[1].e[0].e[1].e[0].s = `Search Your Country Code (+00)`;
        selectModel.e[1].e[0].e[1].e[0].a = {e:'input',fn:searchFnStDC};
        selectModel.e[1].e[0].e[2].i = `${ob.i}_selectItems`;
        selectModel.e[1].e[0].e[2].e =[];
        if(ob.e && ob.e.length > 0){

          selectModel.e[1].e[0].e[2].e =[...ob.e];
          for(var i = 0; i < selectModel.e[1].e[0].e[2].e.length;i++){
            if(selectModel.e[1].e[0].e[2].e[i].v || selectModel.e[1].e[0].e[2].e[i].val){
              const val =selectModel.e[1].e[0].e[2].e[i].v?selectModel.e[1].e[0].e[2].e[i].v: selectModel.e[1].e[0].e[2].e[i].val;
              const fnStItem = `{_.IN_V("${ob.i}","${val}");_.SW_CL("${ob.i}_selectScreen","D_N");_.elmChange('${ob.i}');}`;
              const fnStItemDC = DC_(fnStItem);
                    selectModel.e[1].e[0].e[2].e[i].a = {fn:fnStItemDC};
                    selectModel.e[1].e[0].e[2].e[i].i = `${i}_item`;
            }
          
          }
          selectModel.e[0].s = selectModel.e[1].e[0].e[2].e[0] && selectModel.e[1].e[0].e[2].e[0].s ?selectModel.e[1].e[0].e[2].e[0].s : 'No Items';
          CR_(selectModel,holderId,data);
        }else if(data){
          if(ob.mod == 'phonecode'){
            for(var i = 0 ; i < data.length ; i++){
             
          
              const lowerCode  = data[i].code.toLowerCase();
              const imgSrc     = `flags/${lowerCode}.png`;
              const fnStItem   = `{
                _.IN_V("${ob.i}","${data[i].dialCode}");
                _.SW_CL("${ob.i}_selectScreen","D_N");
                _.elmChange('${ob.i}_dialCode');
                _.E_I_S('${ob.i}_flag').src = _.G_SRC('${imgSrc}');
                _.E_I_S('${ob.i}_code').innerText = '${data[i].dialCode}';
              }`;
              //CL_(fnStItem)
              const fnStItemDC = DC_(fnStItem);

              const selectItem = {
                c:'WW ST_B_GRY8_1 pointer PD_4',
                i: `${i}_item`,
                e:[
                  {
                    t:'img',
                    c:'W_20',
                    src:imgSrc
                  },
                  {
                    t:'sp',
                    s:'q.{dialCode} ',
                    c:'F_GRY7 W_50 mL_10 '
                  },{
                    t:'sp',
                    s:'q.{name} ',
                    c:'F_S_12 '
                  },{
                    t:'sp',
                    s:' ( q.{originalName} )',
                    c:'F_S_12 '
                  }
                ],
                Q:data[i] ,
                a:{fn:fnStItemDC}
            }
            selectModel.e[1].e[0].e[2].e.push(selectItem);
            }
            const firstLowerCode  = data[0].code.toLowerCase();
            const firstImgSrc     = `flags/${firstLowerCode}.png`;
            selectModel.e[0].e =[{t:'img',i:`${ob.i}_flag`,src: firstImgSrc ,c:'W_20'},{t:'sp',i:`${ob.i}_code`,s: data[0].dialCode ,c:'mL_5'},{t:'icon',c:'ICO-caret-down mL_5'}];
            CR_(selectModel,holderId,false);
          }
         
        }
       
        
    }
 }

  /**
   * create elment
   * from i-app object
   * 
   * @param {object} body 
   * @param {string} id 
   * @param {array} data 
   * 
   */

  const dataQuery = (ob)=>{
     ////
   
      const callback = (res,data)=>{
        res = res.res;
        var models = [];
        if(ob.model){
          models = [...ob.model];
          CL_(['callback',models])
        }else{
          if(ob.t && ob.t == 'sl'){
            models = [{t:'op',vq:ob.vq,s:'q.{name}'}]
          }
          
        }
        const elmId = ob.i;
        
         for(var i = 0; i < res.length ; i++){
           const obData = res[i];
           for(var m =0 ; m < models.length;m++){
             const model = models[m];
             const toElm = model.to ? model.to : elmId;
          
             CR_(model,toElm,obData);
           }
         }

         if(ob.t && ob.t == 'sl' && ob.mod && ob.mod == 'phonecode'){
          selectElement(ob,res);
         }
       }
       if(ob.data.order){
        _POST('/api',{order:ob.data.order},callback);
      }else{
      _POST('/api',{query:ob.data},callback);
    }
  
  }
  const CR_ =async (body,id,data)=>{

    if(!i_app_lang[selectLang]){
      const reload = ()=>{
        CR_(body,id,data);
      }
      setTimeout(reload,1000)
      return false;
    }
  let body_ = body;
  const holder ={};
  /**
  * Basic app Sittings 
  */
  
  /**
   *  website for new full frame work ui/ux
  * BASIC FONTS
  */
  
  if(body.fonts){
    app.fonts = body.fonts;
    S_FONT();
  }
  
  if(body.default){
  body_ = body.default.body;
  }else if(body.body){
  body_ = body.body;
  }
  const ob = COPY_OB(body_);

  if(data){
   ob.Q = data;   
  }else  if(ob.Q){
    
    data = ob.Q ;  
  }
  let ob_type = null ,ob_css = null,ob_css_list = [];
  /// set ob_type
  
  if(ob.t){
  ob_type = ob.t;
  }else if(ob.typ){
  ob_type = ob.typ;
  }
  if(ob.treeView){
    
    ob.e=[{t:"ul",e: buildTreeView(ob.e)}];
  
    }
  if(ob_type == null ){
  ob_type = "ly";
  ob.typ = "ly";
  ob.t = "ly";
  }
  //set ob_css 
  if(ob.c){
  ob_css = ob.c;
  }else if(ob.cls){
  ob_css = ob.cls;
  }
  
  if(ob_css !== null){
  if(typeof ob_css === 'string'){
    ob_css = ob_css.replace(/,/g, '');
    ob_css_list = stToAr(ob_css);
  }else  if(typeof ob_css === 'object'){
    ob_css_list = ob_css;
    ob_css = arToSt(ob_css_list);
  }
  }
  
 
  /// element type options
  
  let isI_APP = false;
  let isHideElement = false;
  /// set element type option
  /// if i-app element baisc dev
  
  if(id == "i-app" && ob.offset == undefined){
  isI_APP = true;
  ob.offset = 0;
  }
  
  // script options 
  if(ob.script){
  L_SCRIPT(ob.script.n,ob.script.v)
  }
  // css style options
  if(ob.css){
    L_CSS(ob.css)
    }
  
 
  
  // autoBool
  // it one of slider options for to make circle toggel buttons to control silder 
  if (ob.sliBol && !ob.sliBolDone) {
  ob.elm = SL_P(ob);
  ob.sliBolDone = true;
  }
  //// isHideElement hide elemnent cases 
  //// when want use element with out render it
  //// or when want use it as back element for anther widget element 
  //// i-app select system case we replace the normal html select element
  //// like select widget with dynamic search ui/ux  
  
  if(ob_type == "in" ){
  //input type
  if(ob_css_list.includes("D_N")){
  isHideElement =true;
  }
  if(ob.mod && ob.mod == 'phone'){
    const updateInputFnST =`{
      const code= _.E_I_V("${ob.i}_dialCode");
       const num =_.E_I_V('${ob.i}_view'); 
        const st =code +''+num;_.IN_V('${ob.i}','');
        if(num !== ''){
          _.IN_V('${ob.i}',st);
        }
      }`; 
    const updateInputFnSTDC = DC_(updateInputFnST);
    const countryCode = {t:'sl',vq:'dialCode',i:`${ob.i}_dialCode`,c:'input F_PR F_S_12',mod:'phonecode',a:{e:'change',fn:updateInputFnSTDC}}
   CR_(countryCode,id,false);
   const viewInput = COPY_OB(ob);
   viewInput.i = `${ob.i}_view`;
   viewInput.a ={e:'input',fn:updateInputFnSTDC}
   viewInput.mod = 'tel'
   CR_(viewInput,id,false);
   isHideElement =true;
  }
  }
  
  if(ob_type == "sl"){
    // select type
   
      if(ob.mod == 'phonecode'){
        ob.data = {order:'countries'}
      }
     isHideElement =true;
        holder.t = 'span';
        holder.i = `${ob.i}_holder`;
  }
  /// create HTML Element
  const e = CE_(HT_(ob));
  ///  object id can be public by using id: key 
  ///  or privte by using i or q  auto {string_idkey} 
  ///  for element query data
  ///  first layout options basic app div
   //img options
   if(ob.src){
    e.src = G_SRC(ob.src)
    }
  if(isI_APP){
  
  /// set global varabils
  
  if(ob.v){
    await setObV(ob.v);
  }
  
  // set basic id
  
    e.id =id;
    ob.i = id;
    ob.id = id;
  }
  
  //  childern elements id 
  if(ob.q && ob.q.i && ob.q.s){
    if(data.length > 0){
      ob.i = `${ob.r.s}_${data.d[ob.r.i]}`;
    }
  }else{
    if(ob.I){
      ob.i =ob.i? ob.i : `${id}_${ob.I}`;
      
    }
    if( ob.i == undefined && ob.id !== undefined){
        ob.i = ob.id;
        e.id = ob.id;
    }else  if( ob.i  == undefined && ob.id == undefined){
        ob.i =  `${id}_${ob.offset ?ob.offset:0 }`;
    }
  
  }
  if(ob.data){
    if(!data){
      dataQuery(ob);
    }
  }
  if(ob.IRoute || ob.I){
    const IROUTE = ob.IRoute ? ob.IRoute : ob.I;
    if(! i_app_model[IROUTE] ){
    G_root(`${app.dir.dir}${IROUTE}.${app.dir.file ? app.dir.file :'app'}`,L_ROUTE,[ob.i,data]);
    }else{
        CR_(i_app_model[IROUTE],ob.i,data)
    }
  }
  
  // up = make is the element appended to parent
  let up = false;

  // handel element text
  if(ob.s || ob.txt){
  const st = ob.s ? ob.s : ob.txt
  const txt = eTxt(st,ob.i,data);
    if(ob_type == "in" ){
      e.placeholder = txt !== undefined ? txt : '';
    }else{
      e.innerText = txt;
    }
  }

  if(ob_type == "in"){
    if(ob.mod){
        e.type = ob.mod;
    }
  
  }
  if(ob.val){
    e.value = ob.val;
}else   if(ob.vq){
  e.value = data[ob.vq]?data[ob.vq]:e.vq;
}else   if(ob.value){
  e.value = ob_value(ob);
}
  if(ob.hr){
    if(ob.hr.http ){
    
      e.href = `http://${ob.hr.http}`;
    }else if(ob.hr.https){
      e.href = `http://${ob.hr.https}`;
    }else if(ob.hr.tel){
      e.href = `tel:${ob.hr.tel}`;
    }else if(ob.hr.mailto){
      e.href = `mailto:${ob.hr.mailto}`;
    }else{
      e.href = ob.hr;
    }
    
  }
 
  /// handel element style
  if(ob.style){
    set_style(e,ob.style);
  }
  if(ob.iconTheme){
    let iconTheme =i_app_theme === 'light'?'ICO-moon':'ICO-sun';
    ob_css = ob_css + " "+iconTheme; 
  }
  if(ob_css !== null){
  e.className = U_CSS(ob_css);
  }
  /**
  * before append options 
  */
  if (ob.name) {
    e.setAttribute("name", ob.name);
  }
  if ( ob.TiTx) {
  cr_ob_title(ob,id,e);
  }
  if (ob.col) {
    e.setAttribute("colspan", ob.col);
  }
  
  if (ob.row) {
    e.setAttribute("rowspan", ob.row);
  }
  if (ob.spellcheck) {
    e.setAttribute("spellcheck", ob.spellcheck);
  }
  if (ob.contenteditable) {
    e.setAttribute("contenteditable", ob.contenteditable);
  }
  if (ob.role) {
    e.setAttribute("role", ob.role);
  }
  if (ob.dir) {
    e.setAttribute("dir", ob.dir);
  }
  if(e.type == 'tel'){
    e.setAttribute("pattern","[0-9]{3}-[0-9]{2}-[0-9]{3}");
  }

  var HolderElement = null;
  if(holder.t){
     HolderElement = CE_(HT_(holder));
     HolderElement.setAttribute("i", holder.i);
  }
  /**
  * append child to parent
  */
  
  if(isI_APP){
  //set the basic screen object i_sc
  i_sc.e = e;
  // append to html body

  document.body.appendChild(e);
  
  if(holder.t){
    document.body.appendChild(HolderElement);

  }

  
  up = true;
  
  }else if(id && E_I(id)){
  // append to element have public id
  if(!isHideElement){
  E_I(id).appendChild(e);
  }
  if(holder.t){
  E_I(id).appendChild(HolderElement);
  }
  up =true;
  
  }else if(id && E_I_S(id)){
  // append to element have privte id
  if(!isHideElement){
  E_I_S(id).appendChild(e);
  }
  if(holder.t){
    CL_(['holde',holder.t]);
    E_I_S(id).appendChild(HolderElement);
  }
  up =true;
  
  }
  
   /**
  * 
  * ob options 
  * to create new elm
  * 
  */
  
    e.setAttribute('i',ob.i);//for develope {{{delete me for porduction}}}
    ob.i_e = e;// link html elm to the ob 
    I_OB[ob.i] = ob;//set the ob in i-app objects tree define by i 
    if(isHideElement){
      if(ob_type == "sl"){
        if(ob.mod && ob.mod == 'phonecode'){

        }else{
          selectElement(ob,data);
        }
       
        if(holder.i){
          holder.i_e = HolderElement
          I_OB[holder.i]  = holder;
        }
      }
    }
     /// handel element event function
  if(ob.a){
    
    ESF(ob)
    }
    if(ob.act){
      act_FN(ob.act,e)
    }
  /**
  * if elm have childs
  */
  if(ob.e || ob.elm){
  const elm = ob.e ? ob.e : ob.elm;
  if(up){
          if(Array.isArray(elm)){
            for(let i = 0 ; i < elm.length;i++){
              const ch = COPY_OB(elm[i]);
              ch.offset = i;
              CR_(ch,ob.i,data);
            }
          }
  }
  }
  /**
   * input value update
   * ralted text ev.{}
   */
   if(ob_type == "in" ){
    setInputEvent(ob.i);
  }
  // auto elm create
  // while key = static data for each data index in while array
  //  create elm own index data row 
  if(ob.while){
  for(let i = 0 ; i < ob.while.length;i++){
    const dataOb = COPY_OB(ob.while[i]);
    const model = COPY_OB(ob.whileElm);
    model.offset = i;
    CR_(model,ob.i,dataOb);
  }
  }
 
  }

  
  const F_LO = ([i_route]) => {
  
    window.history.pushState({ page: window.location.pathname }, window.location.pathname, i_route);
    I_OB = {};
    scrollToTop();
    E_I("i-app").remove();
    if(i_app_model[i_route]){
        i_sc.ob = i_app_model[i_route]
       CR_(i_app_model[i_route],"i-app",false)
    }else{
        
        G_root(`${app.dir.dir}${i_route}.${app.dir.file ?app.dir.file :'app' }`,L_ROUTE,["i-app",false]);
    }
  }
  const openRoot = (i_route) => {
  
    window.history.pushState({ page: window.location.pathname }, window.location.pathname, i_route);
    I_OB = {};
    scrollToTop();
    E_I("i-app").remove();
    if(i_app_model[i_route]){
        i_sc.ob = i_app_model[i_route]
       CR_(i_app_model[i_route],"i-app",false)
    }else{
        
        G_root(`${app.dir.dir}${i_route}.${app.dir.file ?app.dir.file :'app' }`,L_ROUTE,["i-app",false]);
    }
  }
     //i-app engine
  
  

  ///////////////// TEXT BUILD SECTION
  const getBrowserLang = ()=>{
    let browserLangData = navigator.languages;
    let browserLang = browserLangData[1];
    return browserLang;
  }
  const createAppTxt =async(lang)=>{
  
    if(!lang){
      if(GTD('lang')){
        selectLang =GTD('lang');
      }else{
      let browserLang = getBrowserLang();
          if(app.lang.includes(browserLang)){
            selectLang = browserLang;
          }else{
            selectLang = app.lang[0]
          }
      }
    }else if(lang && lang !== undefined){
      selectLang =  isAr(lang) ? lang[0] : lang;
    }
    
    if( i_app_lang[selectLang] && i_app_lang[selectLang] !== undefined){
     setTxtV(i_app_lang[selectLang]);
    
     }else{
     
      let url =`${app.dir.txt}${selectLang}.json`; 
         G_Json(url,(l)=>{ i_app_lang[selectLang] ={...l}; setTxtV(l); });
     
     } 
    if(selectLang == "ar" || selectLang == "he"){
      selectLangDirection = "r";
     document.body.style.direction = "rtl";
    }else{
      selectLangDirection = "l";
      document.body.style.direction = "ltr";
    }
  
  
  var BL = 'left';
  var BR = 'right';
  if (selectLangDirection == 'r') {
      BL = 'right';
      BR = 'left';
  }
  var newDir = `:root {
    --DirL: ${BL};
    --DirR:  ${BR};
    --WH__ :${window.innerHeight}px;
    --WW__ :${window.innerWidth}px;
    }`;  
    var autoDir  = '',
        autoDirP = '';
  
        for (var at = 0; at < 1001; at++) {
            autoDir += `.A_L_${at} { ${BL}:${at}px} `;
            autoDir += `.A_R_${at} { ${BR}:${at}px} `;
            if (at < 101) {
                autoDirP += `.A_L_P_${at} { ${BL}:${at}%} `;
                autoDirP += `.A_R_P_${at} { ${BR}:${at}px} `;
            }
        }
  
        E_I("STYLE_DIR").innerHTML = newDir;
        E_I("AUTO_DIR").innerHTML = autoDir + ' ' + autoDirP; 
      return true;
  }
  
  //////////////// STYLE BUILD SECTION
  /**
  * 
  * @param cs // This function takes in a string representing a CSS class and returns CSS styles based on the class name.
  // It can handle various types of classes, including those for background color, font color, font size, line height, border radius, opacity, and transformations such as scaling and hexagon shapes.
  // The function splits the input string based on underscores and uses the resulting array to determine the type of class and generate appropriate CSS styles.
  // If the class is not recognized or invalid, the function returns null.
  *@return {css class}
  */
  
  
  const G_CSS = (cs) => {
  const c = cs.split("_");
  let borderProps, borderStyle;
  switch(c[0]){
      case "sc":
    if (c.length === 3) {
      return `.${cs} {transform: scale(${c[1]}.${c[2]});} `;
    }
    break;
  case "XO":
    if (c[1] !== "ST") {
      let cc = c[1];
      if (c.length === 3 && c[1] === "PR" && c[2] === "D") {
        cc = "PR_D";
      }
      const ssB = `.XO_${cc}{ width: 100%; height: 100%; background: transparent;}`;
      const ssC = `.XO_${cc}::before { content: ""; clip-path: polygon(100% 50%, 88% 81%, 0% 82%, 0% 81%,87.7% 80%,99% 50.00%,87.7% 19%, 0% 19%,0% 18%, 88% 18%); background:var(--${cc}); width: 50%; height: 100%; position: absolute; left: 0;}`;
      const ssD = `.XO_${cc}::after { content: ""; clip-path: polygon(0% 50%, 12% 82%, 100% 82%, 100% 81%,12.3% 80%,0.8% 50.00%,12.3% 19%, 100% 19%,100% 18%, 12% 18%); background:var(--${cc}); width: 50%; height: 100%; position: absolute; left: 50%;}`;
      return [ssB, ssC, ssD];
    }
    break;
  case "hex":
    if (c[1] !== "ST") {
      let cc = c[1];
      if (c.length === 3 && c[1] === "PR" && c[2] === "D") {
        cc = "PR_D";
      }
      const ssA = `.hex_${cc} { content: ""; clip-path: polygon(16.67% 50.00%, 33.33% 78.87%, 66.67% 78.87%, 83.33% 50.00%, 66.67% 21.13%, 33.33% 21.13%); background:var(--${cc}); width: 100%; height: 100%;}`;
      return ssA;
    }
    break;
  case "OPC":
          if(c.length === 2) return `.${cs} {opacity: 0.${c[1]};} `;
          break;
  case "B":
          if(c[1] == "R") {
            /**
             * border radius
             * B_R_B_R_5
             */
            if(c.length === 3) return `.${cs} {border-radius: ${c[2]}px}  `;
            else if(c.length === 5) {
              switch(c[2]+c[3]) {
                case "TL":
                  return `.${cs} {border-top-left-radius: ${c[4]}px;} `;
                case "TR":
                  return `.${cs} {border-top-right-radius: ${c[4]}px;} `;
                case "BL":
                  return `.${cs} {border-bottom-left-radius: ${c[4]}px;} `;
                case "BR":
                  return `.${cs} {border-bottom-right-radius: ${c[4]}px;} `;
              }
            }
          } else {
            if(c.length === 2) {
              const cc = (cs === "B_B_") ? "B_" : cs.replace(/B_/g, "");
              if(selected_theme_colors[cc] ){
               
              return `.${cs} {background-color: var(--${cc});}  `;
              }else{
                return  false;
              }
            }else  if(c.length === 3 && cs === "B_PR_D") {
              return `.${cs} {background-color: var(--PR_D);}  `;
            }
          }
              break;
  case "LH":
              if(c.length === 2) return `.${cs} { line-height:  ${c[1]};} `;
              break;
  case "F":
              if(c[1] == "S") {
                
                if(c.length === 3) return `.${cs} { font-size:${c[2]}px;}  `;
              
              } else {
                const cc = cs.replace(/F_/g, "");
                
                if(selected_theme_colors[cc] ){
                
                  return `.${cs} {color: var(--${cc});}  `;
                
                }else{
                
                  return false;
                
                }
              }
              break;
  case "PD":
              if(c[1] == "P") {
              
                if(c.length === 3) return `.${cs} { padding:${c[2]}%;}  `;
                  
              } else if(c.length === 2) {
              
                return `.${cs} { padding:${c[1]}px;}  `;
              
              }
              break;
  case "":
                  if (c[1] === "MR" && c.length === 3) {
                    return `.${cs} { margin:${c[2]}px;} `;
                  }
                  break;
  case "H":
                  if (c[1] === "P" && c.length === 3) {
                    return `.${cs} {height:${c[2]}%;}   `;
                  }else  if (c.length === 2) {
                    return `.${cs} {height:${c[1]}px;}  `;
                  }
                  break;
  case "W":
                  if (c[1] === "P" && c.length === 3) {
                    return `.${cs} {width:${c[2]}%;}   `;
                  }else   if (c.length === 2) {
                    return `.${cs} {width:${c[1]}px;}  `;
                  }
                  break;
  case "MHP":
    if (c.length === 2) {
                    return `.${cs} {max-height:${c[1]}%;} `;
                  }
                  break;
  case "MWP":
                  if (c.length === 2) {
                    return `.${cs} {max-width:${c[1]}%;}  `;
                  }
                  break;
  case "NHP":
                  if (c.length === 2) {
                    return `.${cs} {min-height:${c[1]}%;}  `;
                  } else if (c.length === 2) {
                    return `.${cs} {min-width:${c[1]}%;} `;
                  }
                  break;
  case "Line":
                  if (c[1] === "H" && c[2] === "P" && c.length === 4) {
                    return `.${cs} {line-height:${c[3]}%;}  `;
                  }
                  break;
  case "Z":
                  if (c[1] === "I" && c.length === 3) {
                    return `.${cs} {z-index:${c[2]};} `;
                  }
                  break;
  case "Box":
                  if (c.length === 2) {
                    return `.${cs} {width:${c[1]}px;height:${c[1]}px;} `;
                  }
                  break;
  case "pT":
                  if (c.length === 2) {
                    return `.${cs} {padding-top:${c[1]}px;} `;
                  } else if (c[1] === "P" && c.length === 3) {
                    return `.${cs} {padding-top:${c[2]}%;}  `;
                  }
                  break;
  case "pB":
                    if (c.length === 2) {
                      return `.${cs} {padding-bottom:${c[1]}px;} `;
                    } else if (c[1] === "P" && c.length === 3) {
                      return `.${cs} {padding-bottom:${c[2]}%;}  `;
                    }
                    break;
  case "pL":
                  if (c.length === 2) {
                    return `.${cs} {padding-left:${c[1]}px;} `;
                  } else if (c[1] === "P" && c.length === 3) {
                    return `.${cs} {padding-left:${c[2]}%;}  `;
                  }
                  break;
  case "pR":
                  if (c.length === 2) {
                    return `.${cs} {padding-right:${c[1]}px;} `;
                  } else if (c[1] === "P" && c.length === 3) {
                    return `.${cs} {padding-right:${c[2]}%;}  `;
                  }
                  break;
  case "MH":
                    if (c.length === 2) {
                      return `.${cs} {max-height:${c[1]}px;}  `;
                    }
                    break;
  case "MW":
                    if (c.length === 2) {
                      return `.${cs} {max-width:${c[1]}px;}  `;
                    }
                    break;
  case "NH":
                    if (c.length === 2) {
                      return `.${cs} {min-height:${c[1]}px;}  `;
                    }
                    break;
  case "NW":
                    if (c.length === 2) {
                      return `.${cs} {min-width:${c[1]}px;}  `;
                    }
                    break;
  case "mT":
                    if (c.length === 2) {
                      return `.${cs} {margin-top:${c[1]}px;} `;
                    }
                    break;
  case "mL":
                    if (c.length === 2) {
                      return `.${cs} {margin-left:${c[1]}px;} `;
                    }
                    break;
  case "mR":
                    if (c.length === 2) {
                      return `.${cs} {margin-right:${c[1]}px;} `;
                    }
                    break;
  case "mB":
                    if (c.length === 2) {
                      return `.${cs} {margin-bottom:${c[1]}px;} `;
                    }
                    break;
  case "mP":
                    if (c.length === 2) {
                      return `.${cs} {margin:${c[1]}%;} `;
                    }
                    break;
  case "mTP":
                    if (c.length === 2) {
                      return `.${cs} {margin-top:${c[1]}%;} `;
                    }
                    break;
  case "mLP":
                    if (c.length === 2) {
                      return `.${cs} {margin-left:${c[1]}%;} `;
                    }
                    break;
  case "mRP":
                    if (c.length === 2) {
                      return `.${cs} {margin-right:${c[1]}%;} `;
                    }
                    break;
  case "mBP":
                    if (c.length === 2) {
                      return `.${cs} {margin-bottom:${c[1]}%;} `;
                    }
                    break;
  case "TT":
                      return (c.length === 2) ? `.${cs} {top:${c[1]}px;}` :
                        (c[1] === "P" && c.length === 3) ? `.${cs} {top:${c[2]}%;}` :
                        '';
  case "LL":
                      return (c.length === 2) ? `.${cs} {left:${c[1]}px;}` :
                        (c[1] === "P" && c.length === 3) ? `.${cs} {left:${c[2]}%;}` :
                        '';
  case "RR":
                      return (c.length === 2) ? `.${cs} {right:${c[1]}px;}` :
                        (c[1] === "P" && c.length === 3) ? `.${cs} {right:${c[2]}%;}` :
                        '';
  case "BB":
                      return (c.length === 2) ? `.${cs} {bottom:${c[1]}px;}` :
                        (c[1] === "P" && c.length === 3) ? `.${cs} {bottom:${c[2]}%;}` :
                        '';
  case "BG":
        switch (c[2]) {
          case "W":
            return (c.length === 3) ? `.${cs} {background-image: linear-gradient(to right, var(--${c[1]}) 0%, #ffffff 51%, var(--${c[1]}) 100%)}` : '';
          case "B":
            return (c.length === 3) ? `.${cs} {background-image: linear-gradient(to right, var(--${c[1]}) 0%, #000000 51%, var(--${c[1]}) 100%)}` : '';
          case "BL":
            return (c.length === 3) ? `.${cs} {background-image: linear-gradient(to right, var(--${c[1]}) 0%, #0300c0 51%, var(--${c[1]}) 100%)}` : '';
          case "YL":
            return (c.length === 3) ? `.${cs} {background-image: linear-gradient(to right, var(--${c[1]}) 0%, #f7fb00 51%, var(--${c[1]}) 100%)}` : '';
          case "GR":
            return (c.length === 3) ? `.${cs} {background-image: linear-gradient(to right, var(--${c[1]}) 0%, #04ff00 51%, var(--${c[1]}) 100%)}` : '';
          default:
            return '';
          }
  case "V":
    if (c[1] === "B" && c.length === 3) {
      return `.V.${cs} {border-color: var(--${c[2]}) transparent transparent transparent;} `;
    } else if (c[1] === "B" && c[2] === "PR" && c[3] === "D" && c.length === 4) {
      return `.V.V_B_PR_D {border-color: var(--PR_D) transparent transparent transparent;} `;
    }
    break;
  case "ST":
    if ( c.length == 4 && c[3] == "D") {
      return `.${cs} { border:${c[2]}px var(--${c[1]}) dotted;} `;
  } else  if ( c.length == 3) {
        return `.${cs} { border:${c[2]}px var(--${c[1]}) solid;} `;
    } else if ( c[1] == "T" && c.length == 4) {
        return `.${cs} { border-top:${c[3]}px var(--${c[2]}) solid;} `;
    } else if ( c[1] == "L" && c.length == 4) {
        return `.${cs} { border-left:${c[3]}px var(--${c[2]}) solid;} `;
    } else if ( c[1] == "R" && c.length == 4) {
        return `.${cs} { border-right:${c[3]}px var(--${c[2]}) solid;} `;
    } else if ( c[1] == "B" && c.length == 4) {
        return `.${cs} { border-bottom:${c[3]}px var(--${c[2]}) solid;} `;
    } else if ( c[1] == "T" && c[3] !== "D" && c[4] == "D" && c.length == 5) {
        return `.${cs} { border-top:${c[3]}px var(--${c[2]}) dotted;} `;
    } else if ( c[1] == "L" && c[3] !== "D" && c[4] == "D" && c.length == 5) {
        return `.${cs} { border-left:${c[3]}px var(--${c[2]}) dotted;} `;
    } else if ( c[1] == "R" && c[3] !== "D" && c[4] == "D" && c.length == 5) {
        return `.${cs} { border-right:${c[3]}px var(--${c[2]}) dotted;} `;
    } else if ( c[1] == "B" && c[3] !== "D" && c[4] == "D" && c.length == 5) {
        return `.${cs} { border-bottom:${c[3]}px var(--${c[2]}) dotted;} `;
    } else if ( c[1] == "PR" && c[2] == "D" && c.length == 4) {
        return `.${cs} { border:${c[3]}px var(--PR_D) solid;} `;
    } else if ( c[1] == "T" && c[2] == "PR" && c[3] == "D" && c.length == 5) {
        return `.${cs} { border-top:${c[4]}px var(--PR_D) solid;} `;
    } else if ( c[1] == "L" && c[2] == "PR" && c[3] == "D" && c.length == 5) {
        return `.${cs} { border-left:${c[4]}px var(--PR_D) solid;} `;
    } else if ( c[1] == "R" && c[2] == "PR" && c[3] == "D" && c.length == 5) {
        return `.${cs} { border-right:${c[4]}px var(--PR_D) solid;} `;
    } else if ( c[1] == "B" && c[2] == "PR" && c[3] == "D" && c.length == 5) {
        return `.${cs} { border-bottom:${c[4]}px var(--PR_D) solid;} `;
    } else if ( c[1] == "T" && c[1] == "PR" && c[3] == "D" && c[5] == "D" && c.length == 6) {
        return `.${cs} { border-top:${c[5]}px var(--PR_D) dotted;} `;
    } else if ( c[1] == "L" && c[1] == "PR" && c[3] == "D" && c[5] == "D" && c.length == 6) {
        return `.${cs} { border-left:${c[5]}px var(--PR_D) dotted;} `;
    } else if ( c[1] == "R" && c[1] == "PR" && c[3] == "D" && c[5] == "D" && c.length == 6) {
        return `.${cs} { border-right:${c[5]}px var(--PR_D) dotted;} `;
    } else if ( c[1] == "B" && c[1] == "PR" && c[3] == "D" && c[5] == "D" && c.length == 6) {
        return `.${cs} { border-bottom:${c[5]}px var(--PR_D) dotted;} `;
    }
    break;
    default:
      return false;
  }
  }
  
  const GET_COLOR = (colorKey) => {
  
  var colorVal = "";
  for (var k = 0; k < i_app_theme_colors.length; k++) {
      if (i_app_theme_colors[k].k == colorKey) {
          colorVal = i_app_theme_colors[k].v;
      }
  }
  return colorVal;
  }
  
  const CREATE_COLOR_ROOT_VAR = async(colors,styleElm) => {
  
  var myRoot = '';
  for (const color of colors) {
      myRoot += `--${color.k} : ${color.v};`;
  }
  
  E_I(styleElm).innerHTML = `:root { ${myRoot} }`;
  return true;
  }
  const makeAiTime = () => {
  
  var res = '';
  
  for (var w = 1; w < 101; w++) {
      var r = w + 0.5;
      res +=
          `.aniT_${w} {animation-duration: ${w}s;}   .aniT_${w}_5 {animation-duration: ${r}s;}  
      `;
  }
  return res;
  }
  const S_FONT = () => {
  
  var iHead         = E_T("head");
  var iHeadChild    = iHead[0].childNodes;
  var io = 0;
  for (var o = 0; o < iHeadChild.length; o++) {
      if (iHeadChild[o].id == "S_FONT") {
          io = o;
      }
  }
  
  var fontsArray = app.fonts ?app.fonts : [];
  var cFReq = '';
  for (var g = 0; g < fontsArray.length; g++) {
      var ec = DC_(fontsArray[g].src);
      if(!E_I(ec)){
      var cFSrc = `${fontsArray[g].src}`;
      cFReq += `'${fontsArray[g].req}'`;
      cFReq += g < fontsArray.length - 1 ? ',' : '';
      var cLink = CE_("link");
      cLink.href = cFSrc;
      cLink.id = ec;
      cLink.rel = "stylesheet";
  
      iHead[0].insertBefore(cLink, iHeadChild[io]);
  }
  }
  if (cFReq !== '') {
      var iFont = `h1,h2,h3,h4,h5,h6,p,button,input,table,th,td,nav,div,table,a,b,tr,ul,li,tbody,select,svg,textarea,title {font-family: ${cFReq};}`;
      E_I("S_FONT").innerHTML = iFont;
  }
  }
  const P_CLS = (c) => {
    var co = c.replace(/ /g, '');
    var res = c;
    var ca = co.split("-");
    if (ca[0] == "ICO") {
        if (ca[1] == "arrow" && ca[2] == "auto") {
  
            if (selectLangDirection == "l") {
  
                res = "ICO-curved-right";
            } else if (this.F_D == "r") {
                res = "ICO-curved-left";
            }
        }
        if (ca[1] == "arrow" && ca[2] == "autoT") {
  
            if (selectLangDirection== "l") {
  
                res = "ICO-curved-left";
            } else if (selectLangDirection == "r") {
                res = "ICO-curved-right";
            }
        }
    }
    if (c == "vertical") {
        if (selectLangDirection== "l") {
            res = "verticalL";
        } else if (selectLangDirection== "r") {
            res = "verticalR";
        }
    }
    return res;
  }
  const C_CSS = (c) => {
    var isNew = true;
    
    for (const style of document.styleSheets) {
  
        if (style.ownerNode && style.ownerNode.id && style.ownerNode.id == "F_ASS") {
            var testW = "testW"
            for (const rule of style.rules) {
                testW =rule.selectorText 
                if (rule.selectorText == `.${c}`) {
                    isNew = false;
                }
            }
   
            if (isNew) {
                var cssT = G_CSS(c);
               
                var cssAR = [];
                if (cssT && cssT !== undefined) {
                    if (Array.isArray(cssT)) {
                        cssAR = cssT;
                    } else {
                        cssAR.push(cssT);
                    }
                    for (const cssC of cssAR) {
                        if (style.cssRules) {
                            style.insertRule(cssC, style.cssRules.length);
                        } else {
                            style.insertRule(cssC, 0);
                        }
                    }
  
  
                }
  
            }
        }
    }
  
  }
  
  
  const scrollDir = () => {
  var lastSc = this.lastScroll;
  var crD = window.scrollY;
  var dir = "up";
  if (lastSc < crD) {
      dir = "down";
  }
  this.lastScroll = crD;
  return dir;
  }
  const rotateY = (element) => {
    let start;
    const step = (timestamp) => {
  
        if (start === undefined) {
            start = timestamp;
            element.style.transform = 'rotateY(180deg)';
        }
  
        const elapsed = timestamp - start;
        var deg = Math.max(0.2 * elapsed, 90) - 180;
        // `Math.min()` is used here to make sure that the element stops at exactly 200px.
        element.style.transform = 'rotateY(' + deg + 'deg)';
  
        if (elapsed < 1000 && deg !== 0) { // Stop the animation after 2 seconds
            window.requestAnimationFrame(step);
        } else if (deg == 0) {
            window.cancelAnimationFrame(step);
        }
    }
  
    window.requestAnimationFrame(step);
  
  }
  const ANI_CARD = ([ic]) => {
      const tes = window.requestAnimationFrame(() => {
      const boxes = document.querySelectorAll(".lazyCards");
      const fullUPGREEN = document.querySelectorAll(".F_UP_GRE");
      const oYH = document.querySelectorAll(".rotateCard");
      const oYHX = document.querySelectorAll(".rotateCardX");
      if (boxes.length > 0 || fullUPGREEN.length > 0 || oYH.length > 0 || oYHX.length > 0) {
  
          function getIntersectionRatio(i) {
              const a = [window.scrollY, window.scrollY + window.innerHeight];
              const b = [boxes[i].offsetTop, boxes[i].offsetTop + boxes[i].clientHeight];
              const max = Math.max(a[0], b[0]);
              const min = Math.min(a[1], b[1]);
  
              return Math.max(0, (min - max) / (b[1] - b[0]));
          }
  
          const onScroll = () => {
            
              if (ic !== "" && E_I_S(ic)) {
                  var crTop = E_I_S(ic).getBoundingClientRect().top;
                  var EpTop = crTop < window.pageYOffset ? window.pageYOffset + crTop : crTop;
  
                  const boxes = document.querySelectorAll(".lazyCards");
                  for (let i = 0; i < boxes.length; i += 1) {
                      const top = boxes[i].offsetTop - window.pageYOffset < 0;
  
                      if (crTop < boxes[i].getBoundingClientRect().height) {
                          const intersection = getIntersectionRatio(i);
                          boxes[i].firstChild.style.cssText = `
                              transform-origin: ${top ? "center center" : "top center"};
                              position: ${top ? "fixed" : "absolute"};
                              transform: scale(${intersection});
                              opacity: ${intersection > 0.5? 1 : intersection };
                              `;
                      } else {
                          boxes[i].firstChild.style.cssText = `
                              transform-origin: top center;
                              position: absolute;
                              transform: scale(1);
                              opacity: 1;
                      `;
  
                      }
                  }
              }
              //  window.requestAnimationFrame(onScroll);
              var scrDir = scrollDir();
  
              if (scrDir == "up") {
                  this.scrollVerison = this.scrollVerison > 0 ? this.scrollVerison - 5 : 0;
              } else if (scrDir == "down") {
                  this.scrollVerison = this.scrollVerison < 150 ? this.scrollVerison + 5 : 150;
              }
  
              const fullUPGREEN = document.querySelectorAll(".F_UP_GRE");
              for (var iPD = 0; iPD < fullUPGREEN.length; iPD += 1) {
                  var crRR = fullUPGREEN[iPD].getBoundingClientRect();
                  var isUp = crRR.top < window.innerHeight / 2 ? true : false;
                  if (elV(fullUPGREEN[iPD]) && isUp == false) {
  
                      fullUPGREEN[iPD].style.cssText = `
                  background-image: linear-gradient(to top, #1b7c00 0%, #ffffff ${this.scrollVerison}%);
                  `;
                  } else if (elV(fullUPGREEN[iPD]) && isUp == true) {
                      fullUPGREEN[iPD].style.cssText = `
                      background-image: linear-gradient(to top, #1b7c00 0%, #ffffff 150%);
                      `;
                  }
              }
  
              const oYH = document.querySelectorAll(".rotateCard");
             
              for (var p = 0; p < oYH.length; p += 1) {
                  var curView = elV(oYH[p]);
                  if (!oYH[p].isView || oYH[p].isView == undefined) {
                      oYH[p].isView = curView == true ? "isView" : "isHide";
                  }
  
                  if (oYH[p].isView == "isHide" && curView == true) {
                      rotateY(oYH[p].firstChild);
                  }
                  oYH[p].isView = curView == true ? "isView" : "isHide";
  
              }
  
              const oYHX = document.querySelectorAll(".rotateCardX");
              for (var p = 0; p < oYHX.length; p += 1) {
                  var curView = elV(oYHX[p]);
                  if (!oYHX[p].isView || oYHX[p].isView == undefined) {
                      oYHX[p].isView = curView == true ? "isView" : "isHide";
                  }
  
                  if (oYHX[p].isView == "isHide" && curView == true) {
                      rotateX(oYHX[p].firstChild);
                  }
                  oYHX[p].isView = curView == true ? "isView" : "isHide";
  
              }
  
  
          }
  
          //  onScroll();
          window.addEventListener('scroll', onScroll);
      } else {
          window.cancelAnimationFrame(tes);
          setTimeout(tes, 3000);
      }
  
  });
  
  }
  const G_C = (mw) => {
  
  var ret = "";
  for (var k = 0; k < this.colorAr.theme.length; k++) {
      if (this.colorAr.theme[k].k == mw) {
          ret = this.colorAr.theme[k].v;
      }
  }
  if (ret == "") {
      for (var k = 0; k < this.colorAr.color.length; k++) {
          if (this.colorAr.color[k].k == mw) {
              ret = this.colorAr.color[k].v;
          }
      }
  }
  return ret;
  }
  const U_CSS = (cs) => {
    // use css class
    // auto class libary
    let csAr = [];
    if (Array.isArray(cs)) {
        csAr = cs;
    } else {
      
       csAr = stToAr(cs);
    }
    for (var w = 0; w < csAr.length; w++) {
      /// clean class name string for auto fix 
      let cleanStr_class =csAr[w];//csAr[w].replace(/PR_D/g, "PRD");
        cleanStr_class  = P_CLS(cleanStr_class);
        /// create css class if not exist
        C_CSS(cleanStr_class);
    }
    return cs;
  }
  
  const createAppTheme =async (theme)=>{
  
  if(!theme){
    if(GTD('theme')){
      i_app_theme =GTD('theme');
    }else{
      i_app_theme = i_app_style.theme;
    }
  }else{
  
    i_app_theme = theme;
  }
  i_app_theme_colors = [];
  var selectThemeColors = i_app_theme == "light" ? 
  i_app_style.lc :
  i_app_style.dc;
 
 
  i_app_theme_colors = [...selectThemeColors,...i_app_colors];
  selected_theme_colors = selectStyleToOb(i_app_theme_colors);

  let w = "";
  let b = "";
  
  for (var l = 0; l < selectThemeColors.length; l++) {
      if (selectThemeColors[l].k == "W") { w = selectThemeColors[l].v; }
      if (selectThemeColors[l].k == "B") { b = selectThemeColors[l].v; }
  }
  let newCss = `:root {
      --W: ${w};
      --B: ${b};
      --BODYB: ${w};
      --BODYF: ${b};
  }`;
  /**
   * create and update Head Tag
   */
   if(!theme){
 
  await  CREATE_COLOR_ROOT_VAR(i_app_theme_colors,"TC_ASS");
  await  CREATE_COLOR_ROOT_VAR(i_app_theme_colors,"T_ASS");
  E_I("PASSSTYLE").innerHTML = newCss; 
  E_I("F_ASSB").innerHTML = makeAiTime();
  createAppTxt();
  }else{
  await  CREATE_COLOR_ROOT_VAR(i_app_theme_colors,"TC_ASS");
  await  CREATE_COLOR_ROOT_VAR(i_app_theme_colors,"T_ASS");
  E_I("PASSSTYLE").innerHTML = newCss;
  }
  }
  const updateThemeIcon =()=>{
    const themeIconElm =I_O_O('iconTheme');
  for(let t = 0 ; t < themeIconElm.length; t++){
   let i = themeIconElm[t].i;
   if(i_app_theme == "light"){
    A_CL(i,"ICO-moon");
    D_CL([i,"ICO-sun"]);
   } else  if(i_app_theme == "dark"){
    A_CL(i,"ICO-sun");
    D_CL([i,"ICO-moon"]);
   } 
  }
  }
  const switchTheme  = ()=>{
  
    if(i_app_theme === "light"){
      i_app_theme = "dark";
      createAppTheme("dark");
      updateThemeIcon();
      IND("theme","dark");
    }else  if(i_app_theme === "dark"){
      i_app_theme = "light";
      createAppTheme("light");
      updateThemeIcon();
      IND("theme","light");
    }
    if(poJSOB.length > 0){
      poJS(poJSOB)
    }
  }
  const createAppContent = (i_app_OB) => {
    i_sc.ob = i_app_OB
    CR_(i_app_OB,"i-app",false)
    };
  const createApp = async()=>{
    /**
     * load bassc app colors
     * i.app dir{css:'/css/'}
     */
    let urlColors =`${app.dir.css}colors.json`;
    let urlStyle =`${app.dir.css}style.json`;
    G_Json(urlColors,(c)=>{i_app_colors =c;G_Json(urlStyle,(s)=>{i_app_style =s;createAppTheme();});});
    return true;
    
  }
  
  
  const i_app_load = async(i_a) => {
    //setDateTime
    setDateTime();
    // If the current root name is 'start', load the 'start.app' file
    app = i_a;
    /**
     * load PWA services worker 
     * if app mode ist not developing mode
     * i.app { mode : ""}
     */
     if(app.mode !== "dev"){
      startSw();
    }
    await createApp();
    if (i_root == "start") {
      G_root(`${app.dir.dir}${app.dir.start}`, createAppContent);
  
    } else {
      // Otherwise, load the file for the current root name and directory
      G_root(`${app.dir.dir}${i_root_().dir}`, createAppContent);
    }
  };
  const startSw = ()=>{
    if(!E_I("divTools")){
     
        if ('serviceWorker' in navigator) {
            this.sw =  navigator.serviceWorker.register('/sw.js');

          window.addEventListener('appinstalled', () => {

            // Hide the app-provided install promotion
            hideInstallPromotion();
            // Clear the deferredPrompt so it can be garbage collected
            deferredPrompt = null;
            // Optionally, send analytics event to indicate successful install
         
          });
        }
      }
  }
  // This function loads the app data and starts the i-app
  const i_app_start = () => {
    /** 
     * Load app data to start
     * Make sure 'i.app' is available and 
     * update the public project directory with your app info.
     * This is the basic config file to start the i-app.
     */
  
    // If the app directory is defined, load the i-app
    if (app.dir) {
      i_app_load();
    } else {
      // Otherwise, load the app directory data using the G_root function
      G_root(I_APP_DIR, i_app_load);
    }
  };
  
    const _=()=>{
        i_root = i_root_().name;
        i_app_start();
        CL_("i-app Start...")
      }
    _();
  })();
  
  
  