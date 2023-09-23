{
    script:{n:'tools'}
    v:{
    
        usernameIsOk:false

        
    }
    c:'WW T_C' 
    e:[
        {
            c:'WW mT_100 '
            e:[
                {
                    t:'ti'
               
                    s:'Log To Your Account'
                }
            ]
        }
       {
        c:'WW PD_5'
        e:[ {
            c:'WW ST_GRY8_1 B_R_10 PD_20  main'
            e:[
                
            
              {
            c:'main '
            i:'signFormHolder'
            e:[
                {
            c:'W_F_C MD'
            e:[
                 
               
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
                                            v.usernameIsOk = true;
                                        }else{
                                            v.usernameIsOk = false;  
                                        }
                                };
                                _._POST('/api',{order:'checkUser',username:ev},callback);
                
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
                    c:'ICO-ui-lock F_PR F_S_20'
                }
                {
                    t:'in'
                    c:'input mB_20'
                    label:true
                    i:'password'
                    mod:'password'
                    s:'Password'
                   
                }
                {
                    t:'br'
                }
                {
                    t:'bt'
                    i:'signInBtn'
                    c:'B_GRE3 B_R_5  ST_W_1 F_WHITE PD_10'
                    s:'Login'
                    a:{
                        fn:{
                             const callback = (data)=>{
                                if(data.res){
                                   window.location = '/user';
                             }
                             };
                  
                    if(!v.usernameIsOk ){
                        _.AL_("Please Insert A Valid Username");
                        return false;
                    }
              
                   _.E_I_V('username')&&
                   _.E_I_V('password')?
                    _._POST('/api',{
                    order:'logUser',
                    data:{
                        username:_.E_I_V('username'),
                        password:_.E_I_V('password')
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