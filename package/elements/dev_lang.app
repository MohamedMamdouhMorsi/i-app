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
                            t:'br'
                        }
                        {
                            t:'b'
                            s:'Select More Languages : '
                        }
                       {
                                t:'sl'
                                s:'q.{name}'
                                mod:'languages'
                                vq:'code'
                                c:'ST_PR_2 PD_5'
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
                                            s:'q.{name}'
                                        }
                                    ]
                        }
                    ]
                   
                }