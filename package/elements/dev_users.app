 {
        c:'WW D_N'
        i:'users'
        e:[
            {
                c:'WW'
                e:[
                    {
                        t:'ti'
                        s:'Users System '
                    }
                    {
                        t:'b'
                        s:'dataBaseCheck'
                    }
                    
                    {
                        i:'dataBaseHandler'
                        c:'D_INB'
                        a:{
                            e:'auto'
                            fn:{
                                const callBack = (res,data)=>{
                                    if(res.res){
                                        _.CR_({t:'icon',c:'ICO-check F_S_30 F_GRE7'},'dataBaseHandler',false);
                                            _.CR_({
                                            I:'dev_database',
                                            v:{database_name:'Users'}
                                            },

                                            'databaseHolder',false);
                                    }else{
                                        _.CR_({t:'icon',c:'ICO-close F_S_30 F_GRE7'},'dataBaseHandler',false);
                                    }
                                }
                                _._POST('/api',{order:'dataBaseReport'},callBack);
                            
                            }
                        }
                    }
                    {
                        i:'databaseHolder'
                    }
                ]
            }
            {
                t:'t'
                c:'WW'
                a:{
                    e:'auto'
                    fn:{
                        if(v.app.fcm){
                        const appusers = {
                            apiKey:v.app.fcm.apiKey ? v.app.fcm.apiKey : '',
                            authDomain:v.app.fcm.authDomain ? v.app.fcm.authDomain : '',
                            projectId:v.app.fcm.projectId ? v.app.fcm.projectId : '',
                            storageBucket:v.app.fcm.storageBucket ? v.app.fcm.storageBucket : '',
                            messagingSenderId:v.app.fcm.messagingSenderId ? v.app.fcm.messagingSenderId : '',
                            appId:v.app.fcm.appId ? v.app.fcm.appId : '',
                            measurementId:v.app.fcm.measurementId ? v.app.fcm.measurementId : ''
                        };
                        _.CR_( {
                                formTableObj:appusers
                                },
                                'users',
                                false);
                        }
                        }
                    }
            }
        ]
}