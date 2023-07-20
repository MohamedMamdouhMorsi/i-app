  {
                            c:'main '
                            e:[
                                {
                                    t:'t'
                                    c:'WW D_N'
                                    i:'appDir'
                                    a:{
                                        e:'auto'
                                        fn:{
                                            const appDir = {
                                                src:v.app.dir.src ? v.app.dir.src : '',
                                                start:v.app.dir.start ? v.app.dir.start : '',
                                                icon:v.app.dir.icon ? v.app.dir.icon : '',
                                                db:v.app.dir.db ? v.app.dir.db : '',
                                                txt:v.app.dir.txt ? v.app.dir.txt : '',
                                                script:v.app.dir.script ? v.app.dir.script : '',
                                                css:v.app.dir.css ? v.app.dir.css : '',
                                                img:v.app.dir.img ? v.app.dir.img : '',
                                                style:v.app.dir.style ? v.app.dir.style : '',
                                                colors:v.app.dir.colors ? v.app.dir.colors : ''
                                                
                                            };
                                            _.CR_( {
                                                    formTableObj:appDir
                                                    },
                                                    'appDir',
                                                    false);
                                            }
                                        }
                                }
                            ]
                        }