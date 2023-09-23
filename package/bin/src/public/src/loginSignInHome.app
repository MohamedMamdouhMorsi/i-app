{
    c:'main'
    e:[
        {
            c:'W_P_50 D_INB PD_20 a_riseDown'
            e:[
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
            c:'W_P_50  D_INB PD_20 a_riseDown'
            e:[
                {
                    c:'WW  MW_250 MD B_PR F_WHITE PD_12 T_C HOVL pointer'
                    e:[
                        {
                            t:'b'
                            write:true
                            s:'Start ..'
                             
                        }
                        {
                            t:'icon'
                            c:'ICO-rocket F_S_35 _MR_10 a_riseUp'
                        }
                    ]
                    a:{
                                fn:{
                                    _.openRoot('signin');
                                }
                            }
                    
                }
            ]
        }
    ]
}