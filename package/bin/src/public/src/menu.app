{

    css:'style'
    c:'WW TT_0 POS_FX Ztop SH'
    e:[
       
       
          {
           
         
            I:'menuMob'
        }
        {
   
    c:'WW H_85 TT_0  B_W F_PR D_FLX  pointer '
    e:[

            {
                    
                    c:'LL_0 W_120 mL_15 mT_5 mR_15 TT_0 POS_AB a_riseRight pointer'
                    e:[
                        {
                            t:'img'
                            c:'W_120 '
                            src:'logo.png'
                             a:{
                                fn:{
                                    _.openRoot('home');
                                }
                            }
                        }
                    ]
                
            }
         
            {
                c:'  MD  TT_0 mT_10 D_FLX  a_riseDown'
                e:[
                   {
                    
                    i:'homeBt'
                    c:' W_90 FF_BOLD HOV_GOLD pc D_INB PD_20 TT_0 mT_0 mL_5 mR_5 T_C H_65 menuIconBack '
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
                    c:'  POS_FX RR_0 mR_70 TT_0 mT_10  a_riseLeft'
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
                    t:'cell'
                    c:'mob POS_FX RR_0 mR_10 TT_0 mT_10 B_GOLD W_50 T_C a_riseLeft'
                    e:[
                        {
                            t:'icon'
                            c:'ICO-navigation-menu F_W F_S_20 menuBt LH_2'
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