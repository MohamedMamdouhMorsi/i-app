{
    script:{n:'tools'}
    v:{
        emailIsOk:false
        usernameIsOk:false
        passwordMatch:false
        
    }
    c:'WW T_C' 
    e:[
        {
            c:'WW mT_100 '
            e:[
                {
                    t:'ti'
                
                    s:'Create Your Free Account'
                }
            ]
        }
       {
        c:'WW PD_5'
        e:[ {
            c:'WW ST_GRY8_1 B_R_10 PD_20  main'
            e:[
                
              {
                c:'WW'
                i:'phonenumber-input-holder'
                e:[
                     {
                    t:'in'
                    c:'input mB_20'
                    label:true
                    mod:'phone'
                    i:'phonenumber'
                    s:'Phone Number'
                }
                {
                    t:'bt'
                    c:'B_GRE3 B_R_5 PD_5 ST_W_1 F_WHITE'
                    s:'Send SMS'
                    a:{
                        fn:{
                            _.FCMTC('phonenumber','phonenumber-input-holder','phonenumber-active-holder');
                        }
                    }
                }
                 {
                    t: "form"
                    e: [
                        {
                        c: "W_F_C MD"
                        id: "recaptcha-container-tx"
                       
                    }
                    {
                        c: "W_F_C MD"
                        id: "recaptcha-container"
                       
                    }]
                }
                {
                    t:'hr'
                }
                {
                    t:'ti'
                    s:'OR'
                }
                 {
                    t:'br'
                }
                  {
                    c:'WW MW_250 MD B_PR_D F_WHITE PD_12 T_C HOVL pointer'
                    
                      e:[
                        {
                            t:'b'
                             write:true
                           s:'Login ..'
                        }
                          {
                            t:'icon'
                            c:'ICO-ui-lock F_S_35 _MR_10 a_riseUp'
                        }
                    ]
                        a:{
                                fn:{
                                    _.openRoot('login');
                                }
                            }
                }
                ]
              }
              {
                i:'phonenumber-active-holder'
                c:'D_N WW'
                e:[
                 {
                    t:'in'
                    label:true
                    c:'input mB_20'
                    i:'activeCode'
                    s:'SMS code'
                }
                {
                    t:'bt'
                    c:'B_GRE3 B_R_5 PD_5 ST_W_1 F_WHITE'
                    s:'Activate'
                    a:{
                        fn:{
                            _.FCMTA('activeCode','phonenumber-active-holder','signFormHolder');
                        }
                    }}
                ]
              }
              {
            c:'main D_N'
            i:'signFormHolder'
            e:[
                {
            c:'W_F_C MD'
            e:[
                 
                {
                    t:'icon'
                    c:'ICO-email F_PR F_S_20'
                }
                {
                    t:'in'
                    label:true
                    c:'input mB_20'
                    i:'email'
                    mod:'mail'
                    s:'Email'
                          a:{
                        e:'input'
                        fn:{
                               const ev = _.E_I_V('email');
                                if(ev && ev !== null && ev !== '' ){
                                      if(_.IS_EMAIL(ev)){
                                       
                                             const callback = (res)=>{
                                                        res = res.res;
                                                        if(res){
                                                            v.emailIsOk = false;
                                                            _.E_I_S('emailCallback').innerHTML = "email exist";
                                                                _.E_I_S('emailCallback').innerHTML = "";
                                                            const accept = {c:'WW',e:[{t:'p',s:'email exist',c:'F_RE4  F_S_10 D_INB'},{t:'icon',c:'ICO-ui-close F_RE4 _MR_5'}]};
                                                            _.CR_(accept,'emailCallback',false);
                                                        }else{
                                                            v.emailIsOk = true;
                                                            _.E_I_S('emailCallback').innerHTML = "";
                                                            const accept = {c:'WW',e:[{t:'p',s:'Valid Email',c:'F_GRE4  F_S_10 D_INB'},{t:'icon',c:'ICO-ui-check F_GRE4 _MR_5'}]};
                                                            _.CR_(accept,'emailCallback',false);
                                                        }

                                                };
                                            _._POST('/api',{order:'checkUser',email:ev},callback);
                          
                                      }else{
                                         _.E_I_S('emailCallback').innerHTML = "please insert valid email";
                                        _.E_I_S('emailCallback').innerHTML = "";
                                        const accept = {c:'WW',e:[{t:'p',s:'please insert valid email',c:'F_RE4  F_S_10 D_INB'},{t:'icon',c:'ICO-ui-close F_RE4 _MR_5'}]};
                                        _.CR_(accept,'emailCallback',false);
                                      }
                                }
                        }
                    }
                }
                {
                    t:'p'
                    i:'emailCallback'
                }
                {
                    t:'icon'
                    c:'ICO-star F_PR F_S_20'
                }
                {
                    t:'in'
                    c:'input mB_20'
                    label:true
                    i:'username'
                    s:'User Name'
                    a:{
                        e:'input'
                        fn:{
                        const ev = _.E_I_V('username');
                        if(ev && ev !== null && ev !== '' ){
                            if(_.IS_USERNAME(ev)){
                            
                                const callback = (res)=>{
                                        res = res.res;
                                        if(res){
                                            v.usernameIsOk = false;
                                                _.E_I_S('usernameCallback').innerHTML = "";
                                            const accept = {c:'WW',e:[{t:'p',s:'username exist',c:'F_RE4 F_S_10 D_INB'},{t:'icon',c:'ICO-ui-close F_RE4 _MR_5'}]};
                                            _.CR_(accept,'usernameCallback',false);
                                        }else{
                                            v.usernameIsOk = true;
                                            _.E_I_S('usernameCallback').innerHTML = "";
                                            const accept = {c:'WW',e:[{t:'p',s:`Valid username (${_.IS_USERNAME(ev)})` ,c:'F_GRE4 F_S_10 D_INB'},{t:'icon',c:'ICO-ui-check F_GRE4 _MR_5'}]};
                                            _.CR_(accept,'usernameCallback',false);
                                        }

                                };
                                _._POST('/api',{order:'checkUser',username:ev},callback);
                
                            }else{

                            _.E_I_S('usernameCallback').innerHTML = "";
                            const accept = {c:'WW',e:[{t:'p',s:'please insert valid username min 5 max 25 [a-z][0-9]',c:'F_RE4 F_S_10 D_INB'},{t:'icon',c:'ICO-ui-close F_RE4 _MR_5'}]};
                            _.CR_(accept,'usernameCallback',false);
                            }
                        }
                        }
                    }
                }
                {
                    t:'p'
                    i:'usernameCallback'
                }
                {
                    t:'br'
                }
                {
                    t:'icon'
                    c:'ICO-ui-user F_PR F_S_20'
                }
                {
                    t:'in'
                    c:'input mB_20'
                    label:true
                    i:'firstname'
                    s:'First Name'
                }
                {
                    t:'br'
                }
                {
                    t:'icon'
                    c:'ICO-ui-user F_PR F_S_20'
                }
                {
                    t:'in'
                    label:true
                    c:'input mB_20'
                    i:'lastname'
                    s:'Last Name'
                }
                {
                    t:'br'
                }
                {
                    t:'icon'
                    c:'ICO-ui-lock F_PR F_S_20'
                }
                {
                    t:'in'
                    label:true
                    c:'input mB_20'
                    i:'passwordE'
                    mod:'password'
                    s:'Password'
                     a:{
                        e:'input'
                        fn:{
                           const checkMatch = passwordMatch(_,'passwordE','passwordMatch') ;
                             
                            if(checkMatch === 1){
                                _.E_I_S('passMatchResult').innerText = 'match';
                                v.passwordMatch=true;
                            }else if(checkMatch === 2){
                                 v.passwordMatch=false;
                               _.E_I_S('passMatchResult').innerText = 'not match';
                            }else{
                                  v.passwordMatch=false;
                                   _.E_I_S('passMatchResult').innerText = '';
                            }
                        }
                    }
                }
                 {
                    t:'br'
                }
                {
                    t:'icon'
                    c:'ICO-ui-lock F_PR F_S_20'
                }
                {
                    t:'in'
                    c:'input mB_20'
                    label:true
                    i:'passwordMatch'
                    mod:'password'
                    s:'Repeat Password'
                    a:{
                        e:'input'
                        fn:{
                         
                            const checkMatch = passwordMatch(_,'passwordE','passwordMatch') ;
                            if(checkMatch === 1){
                                 v.passwordMatch=true;
                                _.E_I_S('passMatchResult').innerText = 'match';
                            }else if(checkMatch === 2){
                                v.passwordMatch=false;
                               _.E_I_S('passMatchResult').innerText = 'not match';
                            }else{
                                v.passwordMatch=false;
                                   _.E_I_S('passMatchResult').innerText = '';
                     
                            }
                        }
                    }
                }
                {
                    t:'br'
                }
                {
                    t:'b'
                    i:'passMatchResult'
                }
                {
                    t:'br'
                }
                {
                    t:'bt'
                    i:'signInBtn'
                    c:'B_GRE3 B_R_5  ST_W_1 F_WHITE PD_10'
                    s:'Create Account'
                    a:{
                        fn:{
                             const callback = (data)=>{
                                if(data.res){
                                   _.openRoot('login');
                             }
                             };
                  
                  if(!v.usernameIsOk ){
                    _.AL_("Please Insert A Valid Username");
                    return false;
                  }
                    if( !v.emailIsOk ){
                    _.AL_("Please Insert A Valid Email");
                     return false;
                  }
                    if(! v.passwordMatch){
                    _.AL_("Please Insert A Match Password");
                     return false;
                  }
                   _.E_I_V('username')&&
                   _.E_I_V('firstname')&&
                   _.E_I_V('lastname')&&
                   _.E_I_V('email')&&
                   _.E_I_V('phonenumber')&&
                   _.E_I_V('passwordE')?
                    _._POST('/api',{
                    order:'addUser',
                    data:{
                        username:_.E_I_V('username'),
                        firstname:_.E_I_V('firstname'),
                        lastname:_.E_I_V('lastname'),
                        email:_.E_I_V('email'),
                        phonenumber:_.E_I_V('phonenumber'),
                        accountType:0,
                        password:_.E_I_V('passwordE')
                        
                    }
                    },
                    callback) : _.AL_("please insert all data");
                        }
                    }
                }

            ]
        }
            ]
        }
            ]
        }]
       }
        
    ]
}