{

    i:'menuMobHolder'
       c:' TT_0  WW B_PR_D F_WHITE  POS_FX mT_70 D_N'
    e:[
        {
            c:'WW H_30'
        }
        {
            c:'WW PD_10 pointer'
            s:'t.{home}'
            a:{
                fn:{
                    _.openRoot('home');
                }
            }
        }
       
          {
            c:'WW'
           e:[
                 {
                    c:'WW PD_10 pointer '
                    s:'t.{services}'
                    a:{
                        fn:{
                            _.SW_CL('services-holder','D_N');
                        }
                    }
                    e:[
                        {
                            i:'services-holder'
                            c:'WW D_N ST_L_PR_2'
                            e:[
                              
                                {
                                    c:'WW PD_10 '
                                    s:'t.{serv-ti-1}' 
                                    a:{
                                        fn:{
                                            _.openRoot('serv1');
                                        }
                                    }
                                }
                                {
                                    c:'WW PD_10 '
                                    s:'t.{serv-ti-2}' 
                                    a:{
                                        fn:{
                                            _.openRoot('serv2');
                                        }
                                    }
                                }
                                {
                                    c:'WW PD_10 '
                                    s:'t.{serv-ti-3}' 
                                    a:{
                                        fn:{
                                            _.openRoot('serv3');
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