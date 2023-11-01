
const _SERVER_START = ([_,user])=>{
          
        if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
            // very basic support for old versions.
            window.RTCPeerConnection = window.mozRTCPeerConnection;
        }
      
        if (window.DataChannel && !window.RTCDataChannel) {
            window.RTCDataChannel = window.DataChannel;
        }
        this._CON_SERVERS = []; 
        this._C_U_UT_S = [];
        this._C_R_U_UT_S = [];
        this._C_R_U_DB_S = {};
        window.app_S = new Object();
        window.localStream = new MediaStream();
        this.lcl = {};
        this.poolCon = {
            state:false,
            type:"alpha",
            no:1,
            cons:0
        };
        
        this._S_S = "u";
        this._TRY_C_R = false;
        this._CRU_S = false;
        this._M_R_SERVER="FALSE";
        this._KILLER = "FALSE";
        this._MSG_SC = "FALSE";
        this._R_S_N = "FALSE";
        this.killMe = "false";
        this.dead = [];
        this.chatAppState = false;
        var nsno =0;
        this.streamState = false;
        var Topf = 0;
        this.streamType = "v";
        this._contacts = [];
        this._MUTE_ALL = false;
        this._UP_SC_CH_TH = false;
        this._MUTE_MIC = true;
        
            const offerOptions = {
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true
                }
        
            const iceConfiguration = {
                configuration:offerOptions, 
                iceServers: [
                        {  
                            urls: "stun:stun.call.m-w-n.com:5349" 
                        }, {
                            urls: 'turn:turn.call.m-w-n.com:3478',
                            credential: 'pass',
                            username: 'mwn'
                        }
                    ],
                    sdpSemantics: "unified-plan" 
                }
                const _S_ON_OPEN = (m,w)=>{
                    CL_(["open !!!!",m,w]);
                    if(window.app_S[w]){
                    var ava;
                    if (_NT._UDA !== "FALSE" && _NT._UDA.upi !== "FALSE") {
                        ava = _NT._UDA.upi;
                    }else{
                        ava = "J_a";
                    }
                    var cc = "";
                            if(window.app_S[w].candidate){
                                cc = `,"CANDIDATE":${_.JDS_(window.app_S[w].candidate)}`;
                            }
                            var uid = _NT._UDA && _NT._UDA !== "FALSE" && _NT._UDA.id ? _NT._UDA.id :0; 
                            window.app_S[w].channel.send(`{"typ":"START","no":"${this.poolCon.no}","uid":${uid},"un":"${_NT._UD.un}","avatar":"${ava}"${cc}}`);
                      
                            if(this._KILLER == "FALSE" && window.app_S[w].str == "u"){
                            this._KILLER = w;
                            window.app_S[w].channel.send('{"typ":"KILL"}');
                        }
                    }
                }
        
            const _S_ON_CLOSE = (m,w)=>{
                        CL_(["closed !!!!",m,w]);
            
                        if(window.app_S[w]){
                            if(window.app_S[w].kill){
                                this.dead.push(window.app_S[w].ut);   
                            }
        
                        this._CON_SERVERS =this._CON_SERVERS.filter(function(e) {
                            if(e !== w){
                                return e;
                            }
                        });
                        this._C_U_UT_S =this._C_U_UT_S.filter(function(e) {
                            if(e !== window.app_S[w].ut){
                                return e;
                            }
                        });
        
                        for(var po = 0 ; po < this._contacts.length; po++){
                            var e = this._contacts[po];
                            if(e.ut == w){
                                this._contacts[po].ot = 0;
                            }
                        }
        
                        if(this.chatAppState){
                            var utr = `UCB_ICO_${window.app_S[w].ut}`;
                            var uts = `UCB_ICO_B_${window.app_S[w].ut}`;
                            D_CL([utr,"F_RE5"]);
                            A_CL(utr,"F_GRY9");
                            D_CL([uts,"F_RE5"]);
                            A_CL(uts,"F_GRY9");
                        }
        
                       
                        if(this._KILLER == w){
                            if(this._CON_SERVERS.length > 0){
                            var mw = this._CON_SERVERS[0];
                                if(window.app_S[mw]){
                                    window.app_S[mw].channel.send('{"typ":"KILL"}');
                                    }
                                }
                            }
                            
                            if(window.app_S[w].str == "rm" ){
                                C_U_R(window.app_S[w].un);
                                this._C_R_U_UT_S =this._C_R_U_UT_S.filter(function(e) {
                                    if(e !== window.app_S[w].ut){
                                        return e;
                                    }
                                });
                                if(this._C_R_U_DB_S[window.app_S[w].ut]){
                                   delete this._C_R_U_DB_S[window.app_S[w].ut]; 
                                }
                                _R_UP_U();
                            }
                            if(window.app_S[w].str == "r" || window.app_S[w].str == "ru" || window.app_S[w].str == "rur" ){
                                C_U_R(window.app_S[w].un);
                            }
                            delete window.app_S[w];
                        }
                }
        
        const _S_ON_MSG = (m,w,n)=>{
               
            var msg = _.JD_(n);
            
                if(window.app_S[w]){
                    
                    if(msg.typ == "START"){
          
                        if(msg.CANDIDATE){
                            _SERVER_CANDIDATE(w,window.app_S[w].ut,msg.CANDIDATE);
                        }
                        window.app_S[w].un = msg.un;
                        window.app_S[w].uid = msg.uid;
                        window.app_S[w].avatar = msg.avatar;
                        window.app_S[w].connect = true;
          
                        CL_(["START",w,window.app_S[w]]);
                        this._CON_SERVERS.push(w);
                        var newUt =true;
                        if(window.app_S[w].type == "ping"){
                            window.app_S[w].channel.send('{"typ":"ping"}');
                        }
          
                        if(window.app_S[w].str == "r" || window.app_S[w].str == "rm"){
                            this.streamState = true;
                        }
          
                        for(var y=0; y < this._C_U_UT_S.length;y++){
                            if( this._C_U_UT_S[y] == window.app_S[w].ut ){
                                newUt =false;
                            }
                        }
          
                        if(newUt &&  window.app_S[w].str == "u" ){
                            this._C_U_UT_S.push(window.app_S[w].ut);
                        }
                    
                        if(this.chatAppState){
                            UP_CHAT_STATE(window.app_S[w].ut);
                        }
          
          
                        CL_(["streamState >>>>>>>",this.streamState ,window.app_S[w].op]);
                            
                            if(this.streamState &&  window.app_S[w].op == "myRoom" ){
                            
                                var utut = window.app_S[w].ut;
                                
                                this._C_R_U_UT_S.push(utut);
                                this._C_R_U_DB_S[utut] = {
                                        un:window.app_S[w].un,
                                        avatar: window.app_S[w].avatar,
                                        rid: window.app_S[w].rid,
                                        uid:window.app_S[w].uid
                                    };
                                var funV1 = ()=>{
                                    _STREAM(w);
                                    _R_UP_U();
                                }
                                setTimeout(funV1,1000);
                                    
                            }
          
                            if(this.streamState &&  window.app_S[w].op == "rur" ){
                                _STREAM(w);
                            }
          
                            if(OpOf !== "FALSE"){
                                if(window.app_S[w].op !== "myRoom"|| window.app_S[w].op !== "room"){
                                    this.poolCon.state = true;
                                    this.poolCon.type  = "beta";
                                    this.poolCon.no    = msg.no + 1;
                                    this.poolCon.alpha = window.app_S[w].ut;
                                }else if(OpOf == "FALSE"){
                                    this.poolCon.state = true;
                                    this.poolCon.beta  = window.app_S[w].ut;
                                }
                            }
          
                        }else if(msg.typ == "ping"){
                            _S_PING(w);
                        }else  if(msg.typ == "rOf"){
                        if(IF_SERVER(msg.target,"rm")){
                            var ccs = _G_S_K(msg.target,"rm")
                                if(window.app_S[ccs] &&  window.app_S[ccs].connect){
                                    window.app_S[ccs].channel.send(`{"typ":"rcOf","target":"${window.app_S[w].ut}","msg":${_.JDS_(msg.msg)}}`);
                                }
                        }
                    
                        }else if(msg.typ == "rcOf"){
                                var funV2 = ()=>{
                                    _crAn(msg.target,msg.msg,"rur","rur");
                                }
                                setTimeout(funV2,1000);
                        }else if(msg.typ == "rAn"){
                            if(IF_SERVER(msg.target,"rm")){
                                var ccs = _G_S_K(msg.target,"rm");
                                var funV3 = ()=>{
                                    window.app_S[ccs].channel.send(`{"typ":"S_A","mode":"net","msg":${_.JDS_(msg.msg)}}`);
                                }
                                setTimeout(funV3,1000);
                            }
                        }else  if(msg.typ == "pong"){
                            _S_PONG(w);
                        }else  if(msg.typ == "S_A"){
                            var funV4 = ()=>{
                                _S_AN([msg.msg]);
                            }
                            setTimeout(funV4,1000);
                        }else  if(msg.typ == "KILL"){
                            window.app_S[w].kill = true;
                        }else if(msg.typ == "MSG"){
          
                            if(msg.mode && msg.mode == "user"){
                                if(this.chatAppState){
                                    UP_MSG(msg.msg,window.app_S[w].ut,window.app_S[w].un)
                                }
                            }else  if(msg.mode && msg.mode == "call") {
                                I_C_C(msg.msg,window.app_S[w].ut)
                            }else  if(msg.mode && msg.mode == "room") {
                                S_M_R(msg);
                                _SERVER_MSG_CTRL(w,window.app_S[w].un,msg.msg);
                            }else  if(msg.mode && msg.mode == "toMyRoom") {
                                _SERVER_MSG_CTRL("toMyRoom",msg.ut,msg.msg);
                            }else{
                                _SERVER_MSG_CTRL(w,window.app_S[w].un,msg.msg);
                            }
                        
                        }else if(msg.typ == "SIGNAL"){
                            CL_(["MSG SIGNAL >>>>>>>",m,w,n]);
                            _SIGNAL(w,msg.un,msg);
                        }else if(msg.typ == "RMD"){
                            this._C_R_U_UT_S = msg.RMU;
                            this._C_R_U_DB_S = msg.RMUD;
                            CL_(["RMD >>>>>>>",m,w,n]);
                        _UP_R_U();
                        }else if(msg.typ == "CLOSE"){
                            window.app_S[w].s.close();
                        }else  if(msg.typ == "MEDIA-OFFER"){
                            CL_(["MSG MEDIA-OFFER >>>>>>>",m,w,n]);
                            _SERVER_MEDIA_OFFER(w,msg.un,msg.of);
                        }else if(msg.typ == "MEDIA-ANSWER"){
                            CL_(["MSG MEDIA-ANSWER >>>>>>>",m,w,n]);
                            _SERVER_MEDIA_ANSWER(w,msg.un,msg.af);
                        }else if(msg.typ == "MEDIA-OFFER-CANDIDATE"){
                            CL_(["MSG MEDIA-OFFER-CANDIDATE >>>>>>>",m,w,n]);
                            _SERVER_MEDIA_OFFER_CANDIDATE(w,msg.un,msg.CANDIDATE);
                        }else if(msg.typ == "MEDIA-ANSWER-CANDIDATE"){
                            CL_(["MSG MEDIA-ANSWER-CANDIDATE >>>>>>>",m,w,n]);
                            _SERVER_MEDIA_ANSWER_CANDIDATE(w,msg.un,msg.CANDIDATE);
                        }
                }
            }
        const _crAn =(ut,ot,op,str)=>{
             
                let stO = {};
                stO     = _.JD_(_.EC_(ot));
                _.CL(['_crAn',stO]);
                stO.sdp = stO.sdp.replace(/_/g,'=');
                stO.sdp = _.EC_(stO.sdp);
                stO.sdp = stO.sdp.toString();
                var s   = stO.key;
                var ofown = stO.offerOwner;
                var gogo = GoAns(s,ut,op,str);
              
                if(gogo == true){
              
                     window.app_S[s] = {
                      type:"pong",
                      ut:ut,
                      op:op,
                      connect:false,
                      key:s,
                      str:str,
                      candidate:[],
                      anCandNo:0,
                      offerOwner:ofown,
                      offerAnswer:_NT._ST.MWU_un
                    };
                            
                     BombMe(s);
              
                        if(ot.i && op == "room" || ot.i && op == "rur" ){
                            window.app_S[s].rid = ot.i;
                        }
                
                    window.app_S[s].s = new RTCPeerConnection(iceConfiguration);
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
                    
                    window.app_S[s].s.createAnswer().then(an=>{
                    window.app_S[s].s.setLocalDescription(new RTCSessionDescription(an));
                    window.app_S[s].answerGR = an;
                        });
              
                    window.app_S[s].s.onicecandidate = e =>  {
                        if(e.candidate){
                            window.app_S[s].candidate.push(e.candidate);
                            window.app_S[s].anCandNo =window.app_S[s].anCandNo +1 ;
                            var ann = window.app_S[s].anCandNo ;
                            var upOf = ()=>{
                                _C_ANUP(s,ann,op,ot,ut);
                            }
                            setTimeout(upOf,300);
                        }
                    }
              }
        }
              
        const _crOf = (ut,t,op,str)=>{
                        
                CL_(["New Offer",ut,t,op,str]);
                   // BombOf(ut,str);
                    
              
                    nsno = nsno +1;
                    var s = `SERVER_${ut}`;
                    window.app_S[s] =  {
                      type:"ping",
                      ut:ut,
                      op:op,
                      connect:false,
                      str:str,
                      rtcCOffSt:1,
                      candidate:[],
                      ofCandNo:0
                    };
              
                    window.app_S[s].s = {};
                    window.app_S[s].s =  new RTCPeerConnection(iceConfiguration);
                    window.app_S[s].connectionState  = window.app_S[s].s.connectionState;
              
                    const OC = window.app_S[s].s.createDataChannel("sendChannel");
                    OC.onmessage = e =>_S_ON_MSG("Local",s,e.data);
                    OC.onopen    = e =>_S_ON_OPEN("Local",s);
                    OC.onclose   = e =>_S_ON_CLOSE("Local",s);
              
                    window.app_S[s].channel = OC;
                    window.app_S[s].s.createOffer().then((o) => { 
                        _.CL(['oo',o])
                        window.app_S[s].s.setLocalDescription(o);
                    });
                    
                    window.app_S[s].s.onicecandidate = e =>  {
                        if(e.candidate){
                            _.CL(['ee',e])
                            window.app_S[s].candidate.push(e.candidate);
                            window.app_S[s].ofCandNo =  window.app_S[s].ofCandNo + 1;
                            var ofn = window.app_S[s].ofCandNo ;
                            var upOf = ()=>{
                                _OF_CAND(s,ofn,t);
                            }
                            setTimeout(upOf,300);
                        }
                    }       
        }
        const IF_SERVER =(ut,str)=>{
            for (const [key, value] of Object.entries(window.app_S)) {
                if(value.ut == ut && value.str == str){
                    return true;
                }
            }
            return false;
            }
        
        const _G_S_K =(ut,str)=>{
            for (const [key, value] of Object.entries(window.app_S)) {
                    if(value.ut == ut && value.str == str){
                        return key;
                    }
                }
            }
        const GoAns = (s,ut,op,str)=>{
           var go = true;
           if(window.app_S[s]){
               go = false;
           }
           if(IF_SERVER(ut,str)){
                var ns = _G_S_K(ut,str);
                if(window.app_S[ns].connect){
                    go = false;
                }
           }
           return go;
        }
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
                ll.offerOwner = user.username;
        
                if(window.app_S[s].candidate){
                    ll.candidate = _.DC_(_.JDS_(window.app_S[s].candidate));
                }
        
                if(window.app_S[s].str == "u"){
                        this.MW_DNS = ll;
                        const offerToSend = _.DC_(_.JDS_(ll));
                        const serverOfferCallback = (res)=>{
                            CL_(['serverOfferCallback',res]);
                        }
                        _._POST('/api',{order:'serverOffer',dns:offerToSend},serverOfferCallback);
                        
                      //  GU_(1);
                }else  if(window.app_S[s].str == "rm"){
                        this.MW_R_DNS = ll;
                        window.app_S[s].myRoom = true;
                      //  GR_();
                }else if(window.app_S[s].str == "ru"){
                        ll.i = window.app_S[this.MW_R_S_N].rid;
                       // GRCS_(ll,window.app_S[s].ut);
                }else if(window.app_S[s].str  == "c"){
        
                    if(window.app_S[s] && window.app_S[s].connect && window.app_S[s].channel){
                        ll.op = op;
                        window.app_S[s].channel.send(`{"typ":"MSG","mode":"call","msg":${_.JDS_(ll)}}`);
                    }
                }  
            }
        }
        if(user.connect && user.connect.DT){
            const ut = user.connect.DT;
            const ot = user.connect.CT;
            _crAn(ut,ot,"OpOf","u");
            CL_(["Make Answer ???????",1,OpOf]);
        }else{
            _crOf(user.connectToken,"u","alpha","u");
            CL_(["Make offer !!!!!!!!"]);
        }
}