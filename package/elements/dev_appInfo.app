        {
                            c:'main '
                             i:'appInfo'
                            e:[
                    {
                        c:'WW'
                        e:[
                            {
                                c:'WW PD_10 B_GRY5 F_WHITE B_R_15'
                                s:'You Can mange your App from here or edit your i.app file '
                                e:[
                                    {
                                        t:'a'
                                        c:'F_PR'
                                        hr:{https:'github.com/MohamedMamdouhMorsi/i-app'}
                                        s:'Read More ...'
                                    }
                                ]
                            }
                            
                        ]
                    }
                                {
                                    t:'t'
                                    c:'WW'
                                  
                                    a:{
                                        e:'auto'
                                        fn:{
                                            const appInfo = {
                                                name:v.app.name ? v.app.name : '',
                                                title:v.app.title ? v.app.title : '',
                                                short_name:v.app.short_name ? v.app.short_name : '',
                                                description:v.app.description ? v.app.description : '',
                                                keywords:v.app.keywords ? v.app.keywords : '',
                                                version:v.app.version ? v.app.version : '',
                                                type:v.app.type ? v.app.type : '',
                                                domain:v.app.domain ? v.app.domain :'',
                                                port:v.app.port ? v.app.port : ''
                                                
                                            };
                                            _.CR_( { e:[{t:'ti',s:'Basic Information'}] },'appInfo',false);
                                            _.CR_( { formTableObj:appInfo },'appInfo',false);
                                             _.CR_( { e:[{t:'ti',s:'Options'}] },'appInfo',false);
                                            const pwa ={
                                                e:[
                                                    {
                                                        c:'WW PD_5',
                                                        e:[
                                                            
                                                             {
                                                                t:'in',
                                                                i:'pwa',
                                                                s:'PWA',
                                                                val:v.app.pwa?true:false,
                                                                mod:'checkbox',
                                                                 a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('pwa').checked){
                                                                        
                                                                            }else{
                                                                            _.CL_('Not checked');
                                                                            }
                                                                        }
                                                                    }
                                                            },
                                                            {
                                                                t:'tx',
                                                                s:'Activating the Progressive Web Application option builds the necessary files to turn the project into a downloadable web application compatible for all devices'

                                                            }
                                                        ]
                                                    },
                                                     {
                                                        c:'WW PD_5',
                                                        e:[
                                                            {
                                                        t:'in',
                                                        i:'isUsers',
                                                        s:'users',
                                                        val:v.app.users?true:false,
                                                        mod:'checkbox',
                                                             a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('isUsers').checked){
                                                                            v.app.users = 'true';
                                                                            _.D_CL(['usersTab','D_N']);
                                                                              _.D_CL(['users','D_N']);
                                                                            }else{
                                                                                _.A_CL('usersTab','D_N');
                                                                                  _.A_CL('users','D_N');
                                                                                _.AL_('You will  deactivate users option that will deactivate  users system and will not effect or delete your database you can take the necessary action for this')
                                                                              v.app.users = 'false';
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                t:'tx',
                                                                s:'Activate the users option, it builds a secure authentication system and permissions system including the basic databases that the system needs, create a database and make sure to put the contact data in the db.app file in your home directory '

                                                            }
                                                        ]
                                                     },
                                                     {
                                                        c:'WW PD_5',
                                                        e:[
                                                            {
                                                        t:'in',
                                                        i:'devMode',
                                                        val:v.app.mode?true:false,
                                                        s:'dev',
                                                        mod:'checkbox',
                                                             a:{
                                                                    e:'change',
                                                                    fn(){
                                                                        if(_.E_I_S('devMode').checked){
                                                                             v.app.mode = 'dev';
                                                                            }else{
                                                                                _.AL_('You will switch the dev mode To return the application to development mode,  mode:dev  must be added to the i.app file')
                                                                              delete  v.app.mode;
                                                                            }
                                                                        }
                                                                    }
                                                            },
                                                            {
                                                                t:'tx',
                                                                s:'Development mode is the default when starting a project, if you are ready to deploy and use your application on the server, please make sure that development mode is deactivated'

                                                            },{
                                                                  c:'WW PD_10 B_RE5 F_WHITE B_R_15',
                                                                  e:[
                                                                        {
                                                                            t:'b',
                                                                            c:'F_WHITE',
                                                                            s:'Note if You disable the Dev Mode To return the application to development mode,  mode:dev  must be added to the i.app file'
                                                                        }
                                                                  ]
                                                            }
                                                           
                                                        ]
                                                     }
                                                ]
                                            }
                                             _.CR_( pwa,'appInfo',false);
                                            }
                                        }
                                }
                    
                            ]
                }
                