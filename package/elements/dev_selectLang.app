{
                            i:'langh'
                            a:{
                            e:'auto'
                            fn:{
                             
                                const appLang    =v.app && v.app.lang ?  v.app.lang :[];
                                
                                       
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
                                
                                
                                    const Data = {
                                        s:txt,
                                        c:'PD_5 ST_GRY7_1 mT_5',
                                
                                        e:[
                                            {
                                                t:'icon',
                                                c:'PD_5 ICO-close POS_AB RR_5 TT_5 pointer',
                                                a:{
                                                    cureLang:cureLang,
                                                    fn(v,_){

                                                        const newAppLang  = [];

                                                        for(var k = 0 ; k < v.app.lang.length;k++){
                                                            if(v.app.lang[k] !== this.cureLang.code){
                                                                newAppLang.push(v.app.lang[k]);
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