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
                            c:'main'
                            e:[
                                {
                                    t:'b'
                                    i:'infoTab'
                                    c:'PD_10 F_B pointer _MR_10 activeTab'
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
                                    c:'PD_10   F_B pointer _MR_10'
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
                            ]
                        }
                    ]
                }
               
                {
                    c:'main '
                    e:[
               
                {
                    t:'t'
                     c:'TT_0 mT_100 '
                    i:'appInfo'
                    a:{
                        e:'auto'
                        fn:{
                            const appInfo = {
                                name:v.app.name,
                                title:v.app.title,
                                short_name:v.app.short_name,
                                description:v.app.description,
                                keywords:v.app.keywords,
                                version:v.app.version,
                                type:v.app.type,
                                domain:v.app.domain,
                                port:v.app.port
                                
                            };
                            _.CR_( {
                    
                   formTableObj:appInfo
                    
                },'appInfo',false);
                        }
                    }
                }
             
                    ]
                }
                   {
                    
                    i:'lang'
                    c:'TT_0 mT_100 D_N'
                    e:[
                        {
                            i:'langh'
                        }
                        {
                                t:'sl'
                                s:'q.{name}'
                                mod:'languages'
                                vq:'code'
                                i:'langSelect'
                                a:{
                                    e:'change'
                                    fn:{
                                        _.CL_(_.E_I_V('langSelect'));
                                    }
                                }
                                model:[
                                    {
                                        t:'op'
                                        vq:'code'
                                        s:'q.{name}'
                                    }
                                    ]
                                }
                    ]
                    a:{
                        e:'auto'
                        fn:{
                            const appLang = v.app.lang;
                            const langHolder ={
                                i:'langHolder',
                                e:[]
                            }
                            for(var i = 0 ; i < appLang.length;i++){
                                langHolder.e.push({t:'b',s:appLang[i]})
                            }
                            _.CR_(langHolder,'langh',false);
                            
                        }
                    }
                }
            ]
        }
    ]
}