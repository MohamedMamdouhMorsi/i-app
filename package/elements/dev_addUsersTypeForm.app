{
    c:'main B_W mT_50 mB_50  TT_0 T_C'
    e:[
        {
            t:'ti'
            c:'F_B'
            s:'Create A New User Account Type '
        }
        {
            t:'br'
        }
        {
            t:'in'
            c:'input'
            mod:'text'
            s:'Account Type Name'
            i:'newUserTypeName'
            
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
            s:'User Type Description'
            i:'newUserTypeDesc'
            
        }
        {
            t:'br'
        }
        {
            t:'bt'
            c:'B_PR F_WHITE BT'
            s:'Add User Type'
            a:{
                fn:{
                      const callback = (data)=>{
                                
                                if(data.res){
                                    const tableName   = 'table_usersType';
                                    const tableObject = _.I_O(tableName);
                                    
                                    _.upQuery(tableObject);
                                    _.E_I_S('addUserTypeDialog').close();
                                }else{
                                        _.AL('Error Try Again');
                                }
                             };
                    _._POST('/api',{
                        _IQuery_:[
                                    {
                                        a:'in',
                                        n:'usersType',
                                        d:[{t:'val', d:'newUserTypeName'},{t:'val' ,d:'newUserTypeDesc'}]
                                    }
                                ]
                    },
                    callback);
                }
            }
        }
    ]
}