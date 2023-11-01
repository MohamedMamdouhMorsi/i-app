{
                            i:'langh'
                            a:{
                            e:'auto'
                            fn:{
                             
                                const appLang    =  v.app && v.app.lang ?  v.app.lang :[];
                                const defLang    = v.app.defLang ? v.app.defLang : "en";
                                       
                                    const langHolder = {
                                    i:'langHolder',
                                    e:[]
                                  }
                                for(var i = 0 ; i < appLang.length;i++){
                                    var cureLang = {};
                                    for(var l = 0 ; l < v.languages.length;l++){
                                        if(appLang[i] == v.languages[l].code){
                                            cureLang = v.languages[l];
                                        }
                                    }
                                    const txt = `${cureLang.name} - (${cureLang.nativeName})`;
                                    let starClass = "F_GRY8";
                                        if(cureLang.code ==  defLang){
                                            starClass = "F_YE8";
                                        }
                                
                                    const Data = {
                                        s:txt,
                                        c:'PD_5 ST_GRY7_1 mT_5',
                                
                                        e:[
                                             {
                                                t:'icon',
                                                c:`PD_5 ICO-star POS_AB RR_35 TT_5 pointer ${starClass}`,
                                                a:{
                                                    cureLang:cureLang,
                                                    fn(v,_){
                                                        v.app.defLang = this.cureLang.code;
                                                        _.DEL_E('alllangHolder');
                                                        _.CR_({I:'dev_selectLang'},'alllangHolder',false);
                                                    }
                                                }
                                            },
                                            {
                                                t:'icon',
                                                c:'PD_5 ICO-close POS_AB RR_5 TT_5 pointer',
                                                a:{
                                                    cureLang:cureLang,
                                                    fn(v,_){
                                                        const newAppLang  = [];

                                                        for(var k = 0 ; k < v.app.lang.length;k++){
                                                            if(v.app.lang[k] !== this.cureLang.code){
                                                                newAppLang.push(v.app.lang[k].code);
                                                            }  
                                                        }

                                                        v.app.lang = newAppLang;
                                                        _.DEL_E('alllangHolder');
                                                        _.CR_({I:'dev_selectLang'},'alllangHolder',false);
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    langHolder.e.push(Data);
                                }
                                
                               _.CR_(langHolder,'langh',false);
                        
                           
                            
                            }
                            }
}