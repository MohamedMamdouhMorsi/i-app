{
    page:true
   css:'dev'
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
                        e:[  {
                                t:'img'
                                c:'W_40 _MR_10'
                                src:'app.png'
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
                                    }
                                }
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
                                i:'firebaseTab'
                                c:'PD_10   mR_10 mL_10  F_B pointer '
                                s:'firebase'
                                per:{data:'app' key:'users' value:true}
                                a:{
                                    fn:{
                                        _.D_CL([v.tabs.cureTab,'activeTab']);
                                        _.A_CL(v.tabs.cureBody,'D_N');
                                        _.A_CL('firebaseTab','activeTab');
                                        _.D_CL(['firebase','D_N']);
                                        v.tabs.cureTab  = 'firebaseTab';
                                        v.tabs.cureBody = 'firebase';
                                            
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
                            c:'main '

                            e:[
                    
                                {
                                    t:'t'
                                    c:'WW'
                                    i:'appInfo'
                                    a:{
                                        e:'auto'
                                        fn:{
                                            const appInfo = {
                                                name:v.app.name ? v.app.name : '',
                                                title:v.app.title ? v.app.title : '',
                                                short_name:v.app.short_name ? v.app.short_name : '',
                                                description:v.app.description ? v.app.description : '',
                                                keywords:v.app.keywords ? v.app.keywords : '',
                                                version:v.app.version ? v.app.version : '',
                                                type:v.app.type ? v.app.type : '',
                                                domain:v.app.domain ? v.app.domain :'',
                                                port:v.app.port ? v.app.port : ''
                                                
                                            };
                                            _.CR_( { e:[{t:'ti',s:'Basic Information'}] },'appInfo',false);
                                            _.CR_( { formTableObj:appInfo },'appInfo',false);
                                             _.CR_( { e:[{t:'ti',s:'Options'}] },'appInfo',false);
                                            const pwa ={
                                                e:[
                                                    {
                                                        c:'WW PD_5',
                                                        e:[
                                                            
                                                             {
                                                                t:'in',
                                                                i:'pwa',
                                                                s:'PWA',
                                                                val:v.app.pwa?true:false,
                                                                mod:'checkbox',
                                                                 a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('pwa').checked){
                                                                        
                                                                            }else{
                                                                            _.CL_('Not checked');
                                                                            }
                                                                        }
                                                                    }
                                                            },
                                                            {
                                                                t:'tx',
                                                                s:'Activating the Progressive Web Application option builds the necessary files to turn the project into a downloadable web application compatible for all devices'

                                                            }
                                                        ]
                                                    },
                                                     {
                                                        c:'WW PD_5',
                                                        e:[
                                                            {
                                                        t:'in',
                                                        i:'isUsers',
                                                        s:'users',
                                                        val:v.app.users?true:false,
                                                        mod:'checkbox',
                                                             a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('isUsers').checked){
                                                                            v.app.users = 'true';
                                                                            }else{
                                                                                _.AL_('You will  deactivate users option that will deactivate  users system and will not effect or delete your database you can take the necessary action for this')
                                                                              delete  v.app.mode;
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                t:'tx',
                                                                s:'Activate the users option, it builds a secure authentication system and permissions system including the basic databases that the system needs, create a database and make sure to put the contact data in the db.app file in your home directory '

                                                            }
                                                        ]
                                                     },
                                                     {
                                                        c:'WW PD_5',
                                                        e:[
                                                            {
                                                        t:'in',
                                                        i:'devMode',
                                                        val:v.app.mode?true:false,
                                                        s:'dev',
                                                        mod:'checkbox',
                                                             a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('devMode').checked){
                                                                             v.app.mode = 'dev';
                                                                            }else{
                                                                                _.AL_('You will switch the dev mode To return the application to development mode,  mode:dev  must be added to the i.app file')
                                                                              delete  v.app.mode;
                                                                            }
                                                                        }
                                                                    }
                                                     },
                                                     {
                                                                t:'tx',
                                                                s:'Development mode is the default when starting a project, if you are ready to deploy and use your application on the server, please make sure that development mode is deactivated'

                                                            },
                                                            {
                                                                t:'b',
                                                                c:'F_RE7',
                                                                s:'Note: To return the application to development mode,  mode:dev  must be added to the i.app file'
                                                            }
                                                        ]
                                                     }
                                                ]
                                            }
                                             _.CR_( pwa,'appInfo',false);
                                            }
                                        }
                                }
                    
                            ]
                }
                
                {
                    I:'dev_lang'
                }

                {
                            c:'main '
                            e:[
                                {
                                    t:'t'
                                    c:'WW D_N'
                                    i:'appDir'
                                    a:{
                                        e:'auto'
                                        fn:{
                                            const appDir = {
                                                src:v.app.dir.src ? v.app.dir.src : '',
                                                start:v.app.dir.start ? v.app.dir.start : '',
                                                icon:v.app.dir.icon ? v.app.dir.icon : '',
                                                db:v.app.dir.db ? v.app.dir.db : '',
                                                txt:v.app.dir.txt ? v.app.dir.txt : '',
                                                script:v.app.dir.script ? v.app.dir.script : '',
                                                css:v.app.dir.css ? v.app.dir.css : '',
                                                img:v.app.dir.img ? v.app.dir.img : '',
                                                style:v.app.dir.style ? v.app.dir.style : '',
                                                colors:v.app.dir.colors ? v.app.dir.colors : ''
                                                
                                            };
                                            _.CR_( {
                                                    formTableObj:appDir
                                                    },
                                                    'appDir',
                                                    false);
                                            }
                                        }
                                }
                            ]
                        }
                        {
                            c:'main '
                            e:[
                                {
                                    t:'t'
                                    c:'WW D_N'
                                    i:'firebase'
                                    a:{
                                        e:'auto'
                                        fn:{
                                            const appFirebase = {
                                                apiKey:v.app.fcm.apiKey ? v.app.fcm.apiKey : '',
                                                authDomain:v.app.fcm.authDomain ? v.app.fcm.authDomain : '',
                                                projectId:v.app.fcm.projectId ? v.app.fcm.projectId : '',
                                                storageBucket:v.app.fcm.storageBucket ? v.app.fcm.storageBucket : '',
                                                messagingSenderId:v.app.fcm.messagingSenderId ? v.app.fcm.messagingSenderId : '',
                                                appId:v.app.fcm.appId ? v.app.fcm.appId : '',
                                                measurementId:v.app.fcm.measurementId ? v.app.fcm.measurementId : ''
                                            };
                                            _.CR_( {
                                                    formTableObj:appFirebase
                                                    },
                                                    'firebase',
                                                    false);
                                            }
                                        }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}