{

    css:'style'
    c:'WW TT_0 POS_FX Ztop SH'
    e:[
       
       
          {
           
         
            I:'menuMob'
        }
        {
   
    c:'WW H_65 TT_0  B_W F_PR D_FLX  pointer '
    e:[

            {
                    
                    c:'LL_0  mL_15 mT_5 mR_15 TT_0 POS_AB a_riseRight pointer'
                    e:[
                        {
                            t:'img'
                            c:'W_50 ml-2 mr-2'
                            src:'logo.png'
                            
                        }
                         {
                            t:'b'
                            c:'F_S_20 POS_AB F_B TT_10 LL_60 W_M_C '
                            writeWait:true
                            s:'app.{title}'
                        }
                    ]
                     a:{
                                fn:{
                                    _.openRoot('home');
                                }
                            }
                
            }
         
            {
                c:'  MD  TT_0 mT_10 D_FLX  a_riseDown'
                e:[
                   {
                    
                    i:'homeBt'
                    c:'  FF_BOLD HOV HOVW pc D_INB PD_10 TT_0 mT_0 mL_5 mR_5 T_C   '
                    s:'t.{home}'
                    a:{
                        fn:{
                            _.openRoot('home');
                        }
                    }
                }
               
                 {
                        c:'pc Drop'
                    I:'servicesMenuBtn'
                    }
                   
          
                ]
            }
            {
                    
                I:'users/dashboard/seLang' ,Q:{langKey:'menuLang'}
            }
            
            {  
                    c:'  POS_FX RR_0 mR_90 TT_0 mT_10  a_riseLeft'
                    e:[
                        {
                            t:'sp'
                            s:'t.{lang}'
                            c:'T_BOLD '
                        }
                    ]
                    a:{
                            fn:{
                            
                            _.createAppTxt(_.s_Lang());
                            }
                        }
                }
                {  
                    
                    c:'mob POS_FX RR_0 mR_10 TT_0 mT_10  W_50 T_C a_riseLeft'
                    e:[
                        {
                            t:'icon'
                            c:'ICO-navigation-menu F_S_20 menuBt LH_2'
                        }
                    ]
                    a:{
                        fn:{
                        
                            _.SW_CL('menuMobHolder','D_N');
                        }
                    }
                }

        
       
       
       
    ]

}
    ]
    a:{
        e:'auto'
        fn:{
            _.A_CL(Q.activeRoot,'menuActive');
       
           
        }
    }
}