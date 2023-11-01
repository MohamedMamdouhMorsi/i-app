 {
            t:'t'
            i:'table_q.{DBId}'
            c:'table'
            limitAuto:2
            joinQuery:true
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
                            notKey:['userType' 'DBId' ]
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
                            notKey:['userType' 'DBId' 'Qsize']
                        e:[
                           {
                            t:'td'
                            c:'NW_10 settings'
                            e:[ {
                                c:'POS_AB RR_0 TT_5  BBGLASS hovTW '
                                e:[
                                 {
                                    t:'sp'
                                    s:'Delete'
                                    c:'pointer mL_30 mR_30 F_S_10 D_IN F_WHITE'
                                    e:[
                                       {
                                        t:'icon'
                                        c:'ICO-ui-delete   F_S_20 F_RE10'
                                    } 
                                    ]
                                    a:{
                                        e:'auto'
                                        fn:{
                                            
                                        }
                                        }
                                 }
                                  
                                           {
                                    t:'sp'
                                    c:'pointer  mL_30 mR_30 F_S_10 D_IN F_WHITE '
                                    s:'Update'
                                    e:[
                                        {
                                        t:'icon'
                                        c:'ICO-fountain-pen  F_S_20 F_GRE9'
                                  
                                        }
                                    ]
                                    a:{
                                        fn:{
                                                _.E_I_S(`editBody_${Q.DBId}_${Q.id}`).showModal();
                                                 _.openOverHide(true); 
                                        }
                                    }
                                 }
                           
                                 
                                    
                                ]
                            }]
                           }
                        ]
                    }
                    {
                        t:'dialog'
                         i:'editBody_q.{DBId}_q.{id}'
                        
                        c:' B_W'
                        e:[
                            
                            {
                                t:'icon'
                                c:'ICO-close-circled F_B F_S_20 pointer'
                                a:{
                                    fn:{
                                            _.E_I_S(`editBody_${Q.DBId}_${Q.id}`).close(); 
                                             _.closeOverHide(true); 
                                    }
                                }
                            }
                            {               
                                forkey: {
                                            t:'in'
                                            c:' D_B mT_30  input'
                                            vq:'key'
                                            s:'key'
                                            label:true
                                            labelClass:'F_PR'
                                            i:'input_q.{DBId}_key_q.{id}'
                                        }
                                notKey:['id' 'userType' 'typeName' 'activate' 'DBId' 'Qsize' ]
                            }
                             {
                              
                                        c:'_MR_10 T_C'
                                e:[
                                    {
                                         perQ:{
                                            key:'activate'
                                        }
                                        t:'sl'
                                         c:'WW D_B ST_PR_2'
                                        vq:'activate'
                                        s:'Search in status'
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
                                perQ:{
                                    key:'userType'
                                }
                                q:{
                                            s:'usersTypeHolder'
                                            i:'id'
                                        }
                                            c:'_MR_10 T_C'
                                e:[
                                    {
                                        t:'sl'
                                        vq:'userType'
                                        c:'WW D_B ST_PR_2'
                                         s:'Search in Accounts Types'
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
                            c:'WW MD T_C'
                            e:[
                                   {
                                t:'bt'
                                c:'B_PR F_W B_R_10 B_N PD_10  '
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
                               
                    ]
}