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
                            notKey:['DBId' ]
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
                            notKey:['DBId' 'Qsize']
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
                                     
                                        fn:{
                                                 if(Q.id){
                                               
                                                _._POST('/api',{_IQuery_:[
                                                    {
                                                        n:'permissions',
                                                        a:'del',
                                                        l:'1',
                                                        q:[
                                                            [
                                                                [1,Q.id,"eq"]
                                                            ]
                                                        ]
                                                    }
                                                ]});
                                            }
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
                                notKey:['id' 'DBId' 'Qsize' ]
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
                                            if(Q.id){
                                                const permissionName = _.E_I_V(`input_permissions_permissionName_${Q.id}`);
                                                const permissionDescription = _.E_I_V(`input_permissions_description_${Q.id}`);
                                        
                                                _._POST('/api',{_IQuery_:[
                                                    {
                                                        n:'permissions',
                                                        a:'up',
                                                        l:'1',
                                                        q:[
                                                            [
                                                                [1,Q.id,"eq"]
                                                            ]
                                                        ],
                                                        d:[[2,permissionName],[3,permissionDescription]]
                                                    }
                                                ]});
                                            }
                                        }
                                    }
                                }
                            ]
                         }
                        ]
                    
                    }
                               
                    ]
}