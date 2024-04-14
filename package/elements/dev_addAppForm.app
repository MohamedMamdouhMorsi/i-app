{
    c:'main B_W mT_50 TT_0 T_C'
    e:[
        {
            t:'ti'
            c:'F_B'
            s:'Create A New App'
        }
        {
            t:'br'
        }
        {
            t:'in'
            c:'input'
            mod:'text'
            s:'App Name'
            i:'newAppName'
            
        }
        {
            t:'br'
        }
        {
            t:'br'
        }
        {
            t:'in'
            c:'input'
            mod:'text'
            s:'App Description'
            i:'newAppDesc'
            
        }
        {
            t:'br'
        }
        {
            t:'br'
        }
        {
            t:'b'
            c:'F_B'
            s:'App Users Type'
        }
        {
            I:'dev_addAppFormUsersType'
        }
        
        
        {
            t:'bt'
            c:'B_PR F_WHITE BT'
            s:'Add App'
            a:{
                fn:{
                    const callbackB = ()=>{
                               const tableName   = 'table_usersApps';
                                const tableObject = _.I_O(tableName);

                                _.upQuery(tableObject);
                                _.E_I_S('addAppDialog').close();
                    }
                    
                    const insertPermissions = (appId)=>{
                        appId = appId.insertId;
                            const inPerData = [];
                            
                            const queryA = {
                                                _IQuery_:[{
                                                    a:'in',
                                                    n:'appsPermissions',
                                                    d: []
                                                }]
                                            };
                            
                            const queryB = {
                                                _IQuery_:[{
                                                    a:'in',
                                                    n:'usersTypeAppsUsage',
                                                    d: []
                                                }]
                                            };
                            
                            for(var i = 0 ; i < v.typeNameList.length;i++){
                                
                                const typeObj               = v.typeNameList[i];
                                const typeId                = typeObj.id;
                                const typeIdKey             = `typeName_${typeId}`;
                                const curetypeNameIdInput   = `permissionNameInput_${typeIdKey}`;
                                const curetypeUsageIdInput  = `permissionUsageInput_${typeIdKey}`;

                                const usage_ = parseInt(_.E_I_V(curetypeUsageIdInput));

                                        if(usage_ > 0){
                                            queryB._IQuery_[0].d.push([appId,typeId,usage_]);
                                        }

                                      
                                        if(_.E_I_S(curetypeNameIdInput).checked){

                                            for(var r = 0 ; r < v.appPermissionsList.length;r++){

                                                    const permissionsObj         = v.appPermissionsList[r];
                                                    const permissionId           = permissionsObj.id;
                                                    const permissionIdKey        = `${typeIdKey}_permissionName_${permissionId}`;
                                                    const curepermissionIdInput  = `permissionNameInput_${permissionIdKey}`;

                                                     if(_.E_I_S(curepermissionIdInput).checked){
                                                        queryA._IQuery_[0].d.push([appId,typeId,permissionId]);
                                                     }
                                            }
                                        }
                            }
                                  
                                              _._POST('/api',queryA,()=>{
                                                 _._POST('/api',queryB,callbackB);
                                              });
                                              

                    }

                    const callback = (data)=>{
                            if(data.res && data.res){
                                const appId       = data.res;
                                insertPermissions(appId);

                            }else{

                                _.AL('Error Try Again');
                            }
                        };

                    _._POST('/api',{
                        _IQuery_:[
                            {
                                a:'in',
                                n:'usersApps',
                                d:[{t:'val', d:'newAppName'},{t:'val' ,d:'newAppDesc'}]
                            }
                            ]},
                            callback);
                           
                }
            }
        }
    ]
}