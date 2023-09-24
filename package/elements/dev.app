{
    page:true
 
    c:'PD_20  main'
    v:{
        tabs:{
            cureBody:'appInfo'
            cureTab:'infoTab'

        }
    }
    e:[
        {
            c:'WW'
            e:[
                {
                    c:'WW POS_FX TT_0 LL_0 RR_0 Ztop B_W'
                    e:[
                        {
                            c:'main'
                            e:[ 
                                {
                                    c:'WW'
                                    e:[
                                        {
                                    t:'img'
                                    c:'W_40 _MR_10'
                                    src:'logo.gif'
                                        }
                                        {
                                            c:'MW_250 D_INB LL_0 mL_20'
                                            e:[
                                                {
                                                    t:'ti'
                                                    c:' F_S_20'
                                                    s:'i-app'
                                                    e:[
                                                        {
                                                            t:'b'
                                                            c:'F_PR F_S_16  LL_0 mL_5'
                                                            s:'dev/mode'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        {
                                            t:'bt'
                                            c:'B_PR F_B PD_10 B_R_10 ST_W_2 POS_AB RR_0 TT_0 mT_10 mR_30'
                                            s:'Save'
                                            a:{
                                                fn:{
                                                       const callback = (data)=>{
                                                                        if(data.res){
                                                                        _.AL_('Please Restart Your Server ');
                                                                    }
                                                                    };
                                                    const appInfo = {
                                                            name:_.E_I_V('inputForm_name'),
                                                            title:_.E_I_V('inputForm_title'),
                                                            short_name:_.E_I_V('inputForm_short_name'),
                                                            description:_.E_I_V('inputForm_description'),
                                                            keywords:_.E_I_V('inputForm_keywords'),
                                                            version:_.E_I_V('inputForm_version'),
                                                            type:_.E_I_V('inputForm_type'),
                                                            domain:_.E_I_V('inputForm_domain'),
                                                            port:parseInt(_.E_I_V('inputForm_port')),
                                                            pwa: _.E_I_S('pwa').checked ?true : false,
                                                            users:_.E_I_S('isUsers').checked ? true : false,
                                                            mode:_.E_I_S('devMode').checked ? 'dev' : 'pro',
                                                            dir:{
                                                                    src:_.E_I_V('inputForm_src'),
                                                                    start:_.E_I_V('inputForm_start'),
                                                                    icon:_.E_I_V('inputForm_icon'),
                                                                    db:_.E_I_V('inputForm_db'),
                                                                    txt:_.E_I_V('inputForm_txt'),
                                                                    script:_.E_I_V('inputForm_script'),
                                                                    css:_.E_I_V('inputForm_css'),
                                                                    img:_.E_I_V('inputForm_img'),
                                                                    style:_.E_I_V('inputForm_style'),
                                                                    colors:_.E_I_V('inputForm_colors')
                                                                },
                                                                fcm:{
                                                                    apiKey: _.E_I_V('inputForm_apiKey'),
                                                                    authDomain:_.E_I_V('inputForm_authDomain'),
                                                                    projectId: _.E_I_V('inputForm_projectId'),
                                                                    storageBucket: _.E_I_V('inputForm_storageBucket'),
                                                                    messagingSenderId: _.E_I_V('inputForm_messagingSenderId'),
                                                                    appId:_.E_I_V('inputForm_appId'),
                                                                    measurementId:_.E_I_V('inputForm_measurementId')
                                                                }
                                                        };
                                                        _.CL_(['appInfo',appInfo]);
                                                          _._POST('/api',{
                                                            order:'updateApp',
                                                            data:appInfo
                                                            },
                                                            callback);
                                                }
                                            }
                                        }
                                    ]
                                }
                            
                            
                                {
                                
                                    c:' HOVRE POS_AB RR_0 mR_5 TT_0 mT_10 a_riseRight pointer'
                                    e:[
                                        {
                                                    t:'icon'
                                                
                                                    iconTheme:true
                                                    
                                                }
                                    ]
                                    a:{
                                                        fn:{

                                                            if(_.theme == "light"){
                                                        
                                                            _.A_CL('heroHolder', 'heroBack');
                                                            _.A_CL('theme_icon', 'ICO-moon');
                                                            _.E_I_S('heroImg').src = _.G_SRC('hero.png');
                                                            }else  if(_.theme == "dark"){
                                                        
                                                            _.D_CL(['heroHolder', 'heroBack']);
                                                            _.A_CL('theme_icon', 'ICO-sun');
                                                                _.E_I_S('heroImg').src = _.G_SRC('heroW.png');
                                                            }
                                                            _.switchTheme();
                                                        }
                                                    }
                                }
                            ]
                        }
                        {
                            c:'main ST_B_PR_2 D_FLX'
                            e:[
                                {
                                    t:'b'
                                    i:'infoTab'
                                    c:'PD_10 F_B pointer mR_10 mL_10 activeTab'
                                    s:'info'
                                    a:{
                                        fn:{
                                            _.D_CL([v.tabs.cureTab,'activeTab']);
                                            _.A_CL(v.tabs.cureBody,'D_N');
                                            _.A_CL('infoTab','activeTab');
                                            _.D_CL(['appInfo','D_N']);
                                            v.tabs.cureTab = 'infoTab';
                                            v.tabs.cureBody = 'appInfo';
                                        }
                                    }
                                }
                                {
                                    t:'b'
                                    i:'dirTab'
                                    c:'PD_10   mR_10 mL_10  F_B pointer '
                                    s:'dir'
                                    a:{
                                        fn:{
                                            _.D_CL([v.tabs.cureTab,'activeTab']);
                                            _.A_CL(v.tabs.cureBody,'D_N');
                                            _.A_CL('dirTab','activeTab');
                                            _.D_CL(['appDir','D_N']);
                                            v.tabs.cureTab = 'dirTab';
                                            v.tabs.cureBody = 'appDir';
                                        }
                                    }
                                }
                                {
                                    t:'b'
                                    i:'langTab'
                                    c:'PD_10   mR_10 mL_10  F_B pointer '
                                    s:'lang'
                                    a:{
                                        fn:{
                                            _.D_CL([v.tabs.cureTab,'activeTab']);
                                            _.A_CL(v.tabs.cureBody,'D_N');
                                            _.A_CL('langTab','activeTab');
                                                _.D_CL(['lang','D_N']);
                                            v.tabs.cureTab = 'langTab';
                                            v.tabs.cureBody = 'lang';
                                        }
                                    }
                                }
                                {
                                    t:'b'
                                    i:'themeTab'
                                    c:'PD_10   mR_10 mL_10  F_B pointer '
                                    s:'theme'
                                    a:{
                                        fn:{
                                            _.D_CL([v.tabs.cureTab,'activeTab']);
                                            _.A_CL(v.tabs.cureBody,'D_N');
                                            _.A_CL('themeTab','activeTab');
                                                _.D_CL(['theme','D_N']);
                                            v.tabs.cureTab = 'themeTab';
                                            v.tabs.cureBody = 'theme';
                                        }
                                    }
                                }
                            
                            
                                {
                                    t:'b'
                                    i:'usersTab'
                                    c:'PD_10   mR_10 mL_10  F_B pointer D_N'
                                    s:'users'
                                    perClass:{ data:'app' key:'users' value:'true'  delClass:'D_N'}
                                    a:{
                                        fn:{
                                            _.D_CL([v.tabs.cureTab,'activeTab']);
                                            _.A_CL(v.tabs.cureBody,'D_N');
                                            _.A_CL('usersTab','activeTab');
                                            _.D_CL(['users','D_N']);
                                            v.tabs.cureTab  = 'usersTab';
                                            v.tabs.cureBody = 'users';
                                                
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
               
                {
                     c:'TT_150  '
                    e:[
                        {
                            I:'dev_appInfo'
                        }
                        {
                            I:'dev_theme'
                        }
                        {
                            I:'dev_lang'
                        }
                        {
                            I:'dev_appDir'
                        }
                        {
                            I:'dev_users'
                        }
                    ]
                }
            ]
        }
    ]
}