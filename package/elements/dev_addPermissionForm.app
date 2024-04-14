{
    c:'main B_W mT_50 mB_50 TT_0 T_C'
    e:[
        {
            t:'ti'
            c:'F_B'
            s:'Create A New Permission'
        }
        {
            t:'br'
        }
        {
            t:'in'
            c:'input'
            mod:'text'
            s:'Permission Name'
            i:'newPermissionName'
            
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
            s:'Permission Description'
            i:'newPermissionDesc'
            
        }
        {
            t:'br'
        }
        {
            t:'bt'
            c:'B_PR F_WHITE BT'
            s:'Add Permissions'
            a:{
                fn:{
                        const callback = ()=>{
                              if(data.res){
                                    const tableName   = 'table_permissions';
                                    const tableObject = _.I_O(tableName);
                                    _.upQuery(tableObject);
                                    _.E_I_S('addPermissionDialog').close();
                                    }else{
                                        _.AL('Error Try Again');
                                    }
                            };
                    _._POST('/api',{
                        _IQuery_:[
                                {
                                    a:'in',
                                    n:'permissions',
                                    d:[{t:'val', d:'newPermissionName'},{t:'val' ,d:'newPermissionDesc'}]
                                }
                    ]},callback);
                }
            }
        }
    ]
}