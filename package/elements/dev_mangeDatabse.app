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
                                notKey:['id' 'accountType' 'typeName' 'activate']
                            }
                             {
                                 q:{
                                            s:'activateHolder'
                                            i:'id'
                                        }
                                e:[
                                    {
                                        t:'sl'
                                         c:'WW D_B ST_PR_2'
                                        vq:'activate'
                                        s:'q.{activate}'
                                        q:{
                                            s:'activate'
                                            i:'id'
                                        }
                                        e:[
                                            
                                            {
                                                t:'op'
                                                val:'0'
                                                s:'Deactive'
                                            }
                                            {
                                                t:'op'
                                                val:'1'
                                                s:'Active'
                                            }
                                        ]

                                    }
                                ]
                            }
                            {
                                 q:{
                                            s:'usersTypeHolder'
                                            i:'id'
                                        }
                                e:[
                                    {
                                        t:'sl'
                                        vq:'accountType'
                                        c:'WW D_B ST_PR_2'
                                        q:{
                                            s:'usersType'
                                            i:'id'
                                        }
                                        data:[{
                                        a: 'get'
                                        n: 'usersType'
                                        s: ['A']
                                        l: '0'
                                        q: [
                                            [
                                                ['id' '0' 'uneq']
                                            ]
                                        ]
                                        }]
                                        model:[
                                            {
                                                t:'op'
                                                vq:'id'
                                                s:'q.{typeName}'
                                            }
                                        ]
                                    }
                                ]
                            }
                       
                            {
                                t:'bt'
                                s:'Update'
                                a:{
                                    fn:{
                                        const usersTypeVal = `usersType_${Q.id}`;
                                          const activateVal = `activate_${Q.id}`;
                                        _.CL_([_.E_I_V(usersTypeVal),_.E_I_V(activateVal)]);
                                    }
                                }
                            }
                        ]
                    
                    }
                               
                    ]
        }