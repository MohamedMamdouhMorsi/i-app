 {
            t:'t'
            c:'table'
            model:[
                                {
                                    t:'thead'
                                    once:true
                                    e:[
                                        {
                                            t:'tr'
                                            c:'B_W F_B'
                                           
                                            forkey:{
                                                        t:'th'
                                                        c:'PD_5'
                                                        s:'key'
                                                    }
                                        }
                                    ]
                                }
                                {
                                    t:'tr'
                                    c:'B_W F_B'
                                    forkey: {
                                            t:'td'
                                            c:'PD_5 '
                                            s:'q.{key}'
                                            attr:{
                                                model_data:'key'
                                            }
                                      
                                            
                                            }
                                    e:[
                                        {
                                           c:'POS_AB RR_0 TT_0 BBGLASS'
                                           e:[
                                            {
                                                t:'icon'
                                                c:'ICO-settings pointer'
                                                a:{
                                                    fn:{
                                                      _.SW_CL(`editIcons_${Q.id}`,"D_N");
                                                    }
                                                }
                                            }
                                            {
                                                 c:'POS_AB RR_20 TT_0 D_N BBGLASS '
                                                 q:{
                                                    s:'editIcons'
                                                    i:'id'
                                                }
                                               
                                               e:[
                                                 {
                                                        t:'icon'
                                                        c:'ICO-fountain-pen mL_10 mR_10  pointer'
                                                        a:{
                                                            fn:{
                                                                 _.E_I_S(`editBody_${Q.id}`).showModal();
                                                            }
                                                        }
                                                }
                                                {
                                                    t:'icon'
                                                    c:'ICO-ui-delete mL_10 mR_10  pointer'
                                                    a:{
                                                        e:'auto'
                                                        fn:{
                                                            _.CL_(Q);
                                                        }
                                                    }
                                                }
                                             
                                               ]
                                            }
                                               
                                           ]
                                        }
                                    ]
                                }
                                {
                                    t:'dialog'
                                    q:{
                                        s:'editBody'
                                        i:'id'
                                    }
                                    c:' B_W'
                                    e:[
                                       
                                        {
                                            t:'icon'
                                            c:'ICO-close-circled F_B F_S_20 pointer'
                                            a:{
                                                fn:{
                                                     _.E_I_S(`editBody_${Q.id}`).close();  
                                                }
                                            }
                                        }
                                         {
                                            t:'h1'
                                            c:'F_B T_C'
                                            s:'Update'
                                        }
                                          {               
                                            forkey: {
                                                        t:'in'
                                                        c:'PD_5 D_B _MR_10 input'
                                                        vq:'key'
                                                        s:'key'
                                                        q:{
                                                            s:'input_key'
                                                            i:'id'
                                                        }
                                                }
                                                notKey:['id']
                                            }
                                    ]
                                
                                }
                               
                    ]
        }