{
                    
                    i:'lang'
                    c:'main  D_N'
                    e:[  {
                            i:'alllangHolder'
                            e:[
                                {I:'dev_selectLang'}
                            ]
                        }
                      
                       
                        
                        {
                            c:'WW PD_5'
                            e:[{
                            t:'b'
                            s:'Select More Languages : '
                        }]
                        }
                        {
                            c:'WW PD_5'
                            e:[
                                       
                       {
                                t:'sl'
                                s:'Search in Languages'
                                mod:'languages'
                                vq:'code'
                                c:'ST_PR_2 mT_20'
                                i:'langSelect'
                                a:{
                                    e:'change' 
                                    fn:{
                                        const cureCode = _.E_I_V('langSelect');
                                        let     isCode = false;
                                        
                                          for(var k = 0 ; k < v.app.lang.length;k++){
                                                if(v.app.lang[k] == cureCode){
                                                    isCode = true;
                                                }
                                            }

                                            if(!isCode){
                                                v.app.lang.push(cureCode);
                                            }

                                        _.DEL_E('alllangHolder');
                                        _.CR_({I:'dev_selectLang'},'alllangHolder',false);
                                }
                             
                                }
                                   model:[
                                        {
                                            t:'op'
                                            vq:'code'
                                            s:'q.{name} -q.{nativeName} '
                                        }
                                    ]
                        }
                        {
                            c:'WW'
                            e:[
                                {
                                    t:'bt'
                                    c:'W_200 mT_50 B_PR F_WHITE'
                                    s:'Update Lang'
                                    a:{
                                        fn:{
                                            _.dev_translate('app');
                                        }
                                    }
                                }
                            ]
                        }
                            ]
                        }
                 
                    ]
                   
                }