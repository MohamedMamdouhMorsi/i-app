
const symbol  = ["►","◄","▲","▼","я","з","л","ь","д","Ф","ф","и","й","ч","ш","ж","я","Д","Э","Ц","щ","г","п","б","ъ","Ю","ä","ß","ü","Ü","ö","ñ","è","ê","É","à"]
const keys    = ["☺","☻","♥","♦","♣","♠","~"];
const indexes = [9,8,7,6,5,4,2];
const letterToNumber = {};
const numberToLetter = {};
var valOffset = 0;
var ab = 1;
var ac = 1;

var getAnswerTime = 10;

    const i_zip =async (objAr,index,somp)=>{

        
        const map = {};
        let keyNum = 0;
        var testTxt = "";
        for(var i = 0 ; i < objAr.length; i++){
            const txt = objAr[i].txt;
            testTxt += txt;
            const txtAr = txt.split("");
            for(var i = 0 ; i < txtAr.length; i++){
                if(txtAr[i+index]){
                    var simple = "";
                    for(var x = 0 ; x < index ; x++){
                        const offset = x+i;
                        simple += txtAr[offset];
                    }
                    if(map[simple]){
                        map[simple] = map[simple] + 1;
                    }else{
                        map[`${simple}`] =  1;
                    }
                    
                }
            }
        }
        
        const valuesAr = [];
        var baseNum = 9;
        if(index == 2){
            baseNum = symbol.length;
        }
        
            for(const key in map){

                const number = map[key];
                const regex  = new RegExp(key, "g");

                if(keyNum < baseNum && number > 1){

                    const found   = testTxt.match(regex);

                    if(found && found.length > 1){

                        testTxt  = testTxt.replace(regex,"");
                        valuesAr.push({key:key , num: number });
                        keyNum = keyNum + 1;
                    }
                }
            }

            const valuesAr_ =  valuesAr.sort((a, b) => b.num - a.num);
        
            const newAr = [];
            var lastKey = "";

            for(var a = 0 ; a < valuesAr_.length; a++){
                const valObj = valuesAr_[a].key;
                lastKey += valObj;
            }
            var symbUsed = "";
            var symbBaseUsed = "";
            //, val:keyNum ,symbol:symbol[keyNum]
            for(var i = 0 ; i < objAr.length; i++){

                var txtENCODE = objAr[i].txt;
                
                    for(var a = 0 ; a < valuesAr_.length; a++){

                            const valObj = valuesAr_[a];
                            const key_   = valObj.key;
                            
                            const val_   = `${somp}${a+1}`;
                            const regex  =  new RegExp(`${key_}`, "g");
                        if(index == 2){
                            const symbb = symbol[a];    
                                txtENCODE  = txtENCODE.replace(regex,symbb);
                                symbUsed += symbb;
                                
                        }else{
                            
                            txtENCODE  = txtENCODE.split(regex).join(val_);
                            symbBaseUsed += val_;
                        }
                        
                    }

                    newAr.push({txt:txtENCODE, num:objAr[i].num, len:txtENCODE.length });
            }
    
            newAr.push({ txt:lastKey, num:index, len:lastKey.length });
        
            return newAr;
    }

    const zipJ =async (obj)=>{

        const txt    = obj;
        const txt64  = _.DC_(txt);
     
        var txtAR = [{ txt: txt64 , num:10}];

        for(var i = 0 ; i < keys.length; i++){

            const key   = keys[i];
            const index = indexes[i];

            txtAR = await i_zip( txtAR, index, key );

        }
        
        var len = 0;
        var txtObj = "";
        for(var i = 0 ; i < txtAR.length; i++){

            len     += txtAR[i].txt.length;
            txtObj  += txtAR[i].txt;

            if(i< txtAR.length -1){
                txtObj +=',';
            }

        }
        txtObj = txtObj.replace(/,,,,,,,,/g,"");
        return txtObj;
    }

    const zipS = async (txt)=>{

            const zAR    = txt.split(",");
           
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
                        const regex  = new RegExp(`${key_}`, "g");

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
        
                return _.EC_(zAR[0]);
    }




const _SERVER_START = ([_,user])=>{
          
    if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
        // very basic support for old versions.
        window.RTCPeerConnection = window.mozRTCPeerConnection;
    }
  
    if (window.DataChannel && !window.RTCDataChannel) {
        window.RTCDataChannel = window.DataChannel;
    }



    window.app_S = new Object();
    window.localStream = new MediaStream();

 

    var offerNo = 0;
 
    var waitAnswer    = false;
    const connectionDeviceToken = [];
    const offerOptions = {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
    }
    
    const iceConfiguration = {
        configuration:offerOptions, 
        iceServers: [
                        {  
                            urls: "stun:stun.call.m-w-n.com:5349" 
                        },
                        {
                            urls: 'turn:turn.call.m-w-n.com:3478',
                            credential: 'pass',
                            username: 'mwn'
                        }
                    ],
        sdpSemantics: "unified-plan" 
    }

    /**
     * tools and genral functions
     */

     const IF_SERVER =(dt,str)=>{
        for (const [key, value] of Object.entries(window.app_S)) {

            if(value.dt == dt && value.str == str){
                return true;
            }
        }
        return false;
    }
    /**
     * serverSystem
     */

    const serverSystem = (msg)=>{

        const type = msg.typ;

        if(type == 'transfer'){
            // transfer for direct connection 
            var directConnection = false;
            for(var i = 0 ; i < connectionDeviceToken.length ; i++){
                if(connectionDeviceToken[i].target == msg.target){
                    directConnection = true;
                }
            }
            if(directConnection){
                sendMsg(msg.target , msg);
            }else{
                sendMsg(connectionDeviceToken[0] , msg);
            }
            // transfer for next user 
            
        }else if(type == 'notification'){
            
        }
    }

    const _G_S_K =(dt,str)=>{
        for (const [key, value] of Object.entries(window.app_S)) {
                if(value.dt == dt && value.str == str){
                    return key;
                }
            }
    }

    /**
     *  candidate handler
     */
    const TrueAddCandidate =()=>{
            // CL_(["TrueAddCandidate"])
    }
         
    const FalseAddCandidate =(e)=>{
            //  CL_(["FalseAddCandidate",e])
    }

    /**
     * send msg
     */

    const sendMsg =async (token,msgData)=>{
        
        const res = await zipJ(msgData);
       
        window.app_S[token].channel.send(res);
    }

    /**
     * ping & pong
     */
    
    const _S_PING =(token)=>{
                if(window.app_S[token]){
        
                    var pingoc = ()=>{
                        if(window.app_S[token]){
                            window.app_S[token].s.close();
                        }
                    }

                    var pingo = ()=>{
                        const msgData = '{"typ":"pong"}';
                        sendMsg(token,msgData);
                        window.app_S[token].ping =  setTimeout(pingoc,60000);
                    
                    }

                    if(window.app_S[token].ping){
                        window.clearTimeout(window.app_S[token].ping);
                    }
                    setTimeout(pingo,30000);
                
            }
    } 

    const _S_PONG =(token)=>{
        if(window.app_S[token]){

            var pingoc = ()=>{
                if(window.app_S[token]){
                window.app_S[token].s.close();
                }
            }

            var pingo = ()=>{
                
                const msgData = '{"typ":"ping"}';
                sendMsg(token,msgData);
                window.app_S[token].pong =  setTimeout(pingoc,60000);
                
            }

            if(window.app_S[token].pong){
                window.clearTimeout(window.app_S[token].pong);
            }

            setTimeout(pingo,30000);
            
        }
    }

    /**
     * msg handler
     */

        const _S_ON_OPEN  = (m,w)=>{
            CL_(["open !!!!",m,w]);

            if(window.app_S[w]){
            var ava;

            if (user && user.upi && user.upi !== "FALSE") {
                ava = user.upi;
            }else{
                ava = "img/user.jpg";
            }

                        var uid = user && user.id && user.id !== "FALSE" && user.id  ?  user.id :0; 
                        const msgData =`{"typ":"START","uid":${uid},"un":"${user.username}","avatar":"${ava}"}`;
                        sendMsg(w,msgData);
                  
            }
        }
        
        const _S_ON_CLOSE = (m,w)=>{
                CL_(["closed !!!!",m,w]);
    
                if(window.app_S[w]){
                    delete window.app_S[w];
                }
        }

        const _S_ON_MSG   = async (m,w,n)=>{
         
                const set = await zipS(n);
                _.CL(['set>>>>>>>',set]);
                var msg = _.JD_(set);

                if(window.app_S[w]){
                
                    if(msg.typ == "START"){

                            window.app_S[w].un      = msg.un;
                            window.app_S[w].uid     = msg.uid;
                            window.app_S[w].avatar  = msg.avatar;
                            window.app_S[w].connect = true;
                
                            CL_(["START",w,window.app_S[w]]);

                            if(window.app_S[w].type == "ping"){
                                const msgData = '{"typ":"ping"}';
                                sendMsg(w,msgData);
                            }   

                    }else if(msg.typ == "ping"){

                        _S_PING(w);
                    // the next connection 
                    var s = `SERVER_${user.deviceToken}`;
                    if(!window.app_S[s]){
                        _crOf("u", "alpha");
                    }
                    }else if(msg.typ == "pong"){

                        _S_PONG(w);
                        

                    }else if(msg.typ == "system"){
                        serverSystem(msg);
                    }else if(msg.typ == "user"){

                    }
            }
        }

    /**
     * contracts handler
     */

        /**
         * offer
         */

        // Create Offer

            const _crOf = (typ,op)=>{
                
                    const dt = user.deviceToken;
                    const ut = user.userToken;
                    offerNo = offerNo + 1;
                    var s = `SERVER_${dt}`;

                    window.app_S[s] =  {
                    type:"ping",
                    dt: dt ,
                    ut: ut ,
                    op: op ,
                    connect: false ,
                    str: typ ,
                    rtcCOffSt: 1 ,
                    candidate: [] ,
                    ofCandNo: 0
                    };
            
                    window.app_S[s].s                = {};
                    window.app_S[s].s                =  new RTCPeerConnection();
                    window.app_S[s].connectionState  = window.app_S[s].s.connectionState;
            
                    const OC     = window.app_S[s].s.createDataChannel("sendChannel");
                    OC.onmessage = e =>_S_ON_MSG("Local",s,e.data);
                    OC.onopen    = e =>_S_ON_OPEN("Local",s);
                    OC.onclose   = e =>_S_ON_CLOSE("Local",s);
            
                    window.app_S[s].channel = OC;
                    window.app_S[s].s.createOffer().then((o) => { 
                       
                        window.app_S[s].s.setLocalDescription(o);
                    });
                    
                    window.app_S[s].s.onicecandidate = e =>  {
                        if(e.candidate){
                     
                            window.app_S[s].candidate.push(e.candidate);
                            window.app_S[s].ofCandNo =  window.app_S[s].ofCandNo + 1;
                            var ofn = window.app_S[s].ofCandNo ;
                            var upOf = ()=>{
                                _OF_CAND(s,ofn,typ);
                            }
                            setTimeout(upOf,300);
                        }
                    }       
            }

        // Create Candidate

        const _OF_CAND = (s,ofn,t)=>{

            if(
                window.app_S[s] &&
                window.app_S[s].ofCandNo == ofn && 
                window.app_S[s].s.localDescription && 
                window.app_S[s].s.localDescription.sdp
                ){ 

            var ll  = {};
                ll.sdp  = _.DC_(window.app_S[s].s.localDescription.sdp);
                ll.type = window.app_S[s].s.localDescription.type;    
                ll.key  = s;
                ll.ownerDeviceTokken  = window.app_S[s].dt;
                ll.offerOwner = user.username;

                if(window.app_S[s].candidate){
                    ll.candidate = _.DC_(_.JDS_(window.app_S[s].candidate));
                }

                if(window.app_S[s].str == "u"){

                        this.MW_DNS = ll;
                        const offerToSend = _.DC_(_.JDS_(ll));
                        const serverOfferCallback = (res)=>{
                                setTimeout(getAnswer,6000);
                            
                        }
                        _._POST('/api',{ order:'serverOffer', dns:offerToSend}, serverOfferCallback);
                        
                    //  GU_(1);
                }
            }
        }

        const  getNewOffer = (s)=>{
            
                const lastS = window.app_S[s];
                connectionDeviceToken.push(lastS.dt);

                const serverOfferCallback = ()=>{

                    console.log("Data Offer");
                    
                }

            _._POST('/api',{ order:'getNewOffer', dts: connectionDeviceToken}, serverOfferCallback);
        }
        
        // Get Answer  

        const getAnswer = (x)=>{
            if(!x){
                const callBack = (x)=>{
                    const inCallBack = ()=>{
                        getAnswer(x);
                    }
                    setTimeout(inCallBack,6000);
                }
                _._POST('/api',{order:'getAnswer'},callBack);
            }else{
                if(x.res && x.res.length > 0){
                _S_AN(x.res);
                }else{
                const callBack = (x)=>{
                    const inCallBack = ()=>{
                        getAnswer(x);
                    }
                    setTimeout(inCallBack,10000);
                }
                const checkAnswer = ()=>{
                    _._POST('/api',{order:'getAnswer'},callBack);
                }

                        if(getAnswerTime > 0){

                            checkAnswer();
                            getAnswerTime = getAnswerTime -1;

                        }else{

                            getAnswerTime = 10;
                            setTimeout(checkAnswer,900000);
                        }
                
                }
                
            }
        }

        // Sign Answer 

        const _S_AN = (ca)=>{

            if(ca.length > 0){

            for(var tu = 0 ; tu < ca.length; tu++){

                const answerBody    = ca[tu];
                const textAnswer    = _.EC_(answerBody.answer);
                const ObjectAnswer  = _.JD_(textAnswer); 
                var dt   = ca[tu].dt; 

                if(window.app_S[ObjectAnswer.key]){
                    CL_(["SIGN ANSWER >>>>>>>",ObjectAnswer.ans]);
                        window.app_S[ObjectAnswer.key].s.setRemoteDescription(new RTCSessionDescription(ObjectAnswer.ans));
                        window.app_S[ObjectAnswer.key].dt = dt;
                                
                        if(ObjectAnswer.candidate){
                            for(var t = 0 ; t < ObjectAnswer.candidate.length;t++){
                                let candidate = new RTCIceCandidate(ObjectAnswer.candidate[t]);
                                window.app_S[ObjectAnswer.key].s.addIceCandidate(candidate,TrueAddCandidate,FalseAddCandidate);
                            }
                        }

                        if(window.app_S[ObjectAnswer.key].str == "u" ){
                            getNewOffer(ObjectAnswer.key);
                        }

                        if(window.app_S[ObjectAnswer.key].str == "rm"){
                            window.app_S[ObjectAnswer.key].rid = ObjectAnswer.rid;
                        }
                        if(window.app_S[ObjectAnswer.key].str == "ru"){
                            window.app_S[ObjectAnswerv.key].rid = ObjectAnswer.rid;
                        }
                }
                    
                }
                
            }
        }

        /**
         * Answer
         */
        
        // Create Answer

        const GoAns = (s,dt,op,str)=>{
            var go = true;
            if(window.app_S[s]){
                go = false;
            }
            if(IF_SERVER(dt,str)){
                 var ns = MW_G_S_K(dt,str);
                 if(window.app_S[ns].connect){
                     go = false;
                 }
            }
            return go;
         }

        const _crAn =(connect,op,str)=>{

                const dt = connect.DT;
                const ot = connect.CT;
                const ut = connect.UT;
                const idt = connect.ID;
                    let stO = {};
                    stO     = _.JD_(_.EC_(ot));
                   
                    stO.sdp   = stO.sdp.replace(/_/g,'=');
                    stO.sdp   = _.EC_(stO.sdp);
                    stO.sdp   = stO.sdp.toString();
                   
                    var s     = stO.key;
                    var ofown = stO.offerOwner;
                    var gogo  = GoAns(s,dt,op,str);
                
                    if(gogo == true){
                
                        window.app_S[s] = {
                        type:"pong",
                        dt:dt,
                        ut:ut,
                        oid:idt,
                        op: op,
                        connect: false,
                        key: s,
                        str: str,
                        candidate: [],
                        anCandNo: 0,
                        ownerDeviceTokken: stO.ownerDeviceTokken,
                        offerOwner: ofown,
                        offerAnswer: user.username
                        };
                                
                        // BombMe(s);
                
                            if(ot.i && op == "room" || ot.i && op == "rur" ){
                                window.app_S[s].rid = ot.i;
                            }
                    
                        window.app_S[s].s = new RTCPeerConnection();
                        window.app_S[s].s.setRemoteDescription(stO).then(a=>console.log("done"))
                        window.app_S[s].s.ondatachannel = e => {
                            const RC     = e.channel;
                            RC.onmessage = e => _S_ON_MSG("Remote",s,e.data);
                            RC.onopen    = e => _S_ON_OPEN("Remote",s) ;
                            RC.onclose   = e => _S_ON_CLOSE("Remote",s);
                            window.app_S[s].channel = RC;
                
                        }
                
                        if(stO.candidate){
                
                                stO.candidate = stO.candidate.replace(/_/g,'=');
                                stO.candidate = _.EC_(stO.candidate);
                                stO.candidate = _.JD_(stO.candidate);
                
                                for(var l = 0 ; l < stO.candidate.length;l++){
                                    var stCan = stO.candidate[l];
                                    let candidate = new RTCIceCandidate(stCan);
                                    window.app_S[s].s.addIceCandidate(candidate,TrueAddCandidate,FalseAddCandidate);
                                }
                        }
                        
                        window.app_S[s].s.createAnswer().then( an=>{ 
                        window.app_S[s].s.setLocalDescription(new RTCSessionDescription(an));
                        window.app_S[s].answerGR = an;
                            });
                
                        window.app_S[s].s.onicecandidate = e =>  {
                            if(e.candidate){
                                window.app_S[s].candidate.push(e.candidate);
                                window.app_S[s].anCandNo =window.app_S[s].anCandNo +1 ;
                                var ann = window.app_S[s].anCandNo ;
                                var upOf = ()=>{
                                    
                                    _C_ANUP(s);
                                }
                                setTimeout(upOf,300);
                            }
                        }
                }
            }
        
        
            // Up Answer

        const _C_ANUP = (s)=>{
            
            const serverAnswerCallback = ()=>{
                CL_(['serverAnswerCallback'])
            }
            var ans =  {};
            ans.ans = window.app_S[s].answerGR ;
            ans.candidate = window.app_S[s].candidate;
            ans.key = window.app_S[s].key;
           
            _._POST('/api', {
                order:'serverAnswer',
                dns:_.DC_(_.JDS_(ans)),
                owner:window.app_S[s].ownerDeviceTokken,
                oid:window.app_S[s].oid
            },
            serverAnswerCallback
            );
        
        }  

        /**
         * General function 
         */

        if(user.connect && user.connect.DT){
          
            _crAn(user.connect,"OpOf","u");
            CL_(["Make Answer ??????? "]);
        }else{
            _crOf("u","alpha");
            CL_(["Make Offer !!!!!!!! "]);
        }
}
