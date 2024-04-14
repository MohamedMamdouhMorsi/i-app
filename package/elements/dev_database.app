{
    e:[

       {
        c:'WW'
        e:[ {
                t:'ti'
                s:'Users'
                e:[
                    {
                        i:'addUserHolder'
                        I:'dev_addUser'
                    }
                ]
            }
            
            {
                I:'dev_mangeUser'
                Q:{
                    DBId:'users'
                }
                _IQuery_:[ {
                            a: 'getJ'
                            n: 'users'
                            s: ['A']
                            l: '0'
                            q: [
                                [
                                    ['id' '0' 'uneq']
                                ]
                            ]
                            j:[{
                                    n: 'usersType'
                                    s: ['typeName']
                                    l: '1'
                                    q: [
                                        [
                                            [ 'id' { 't': 'q' 'd': 'userType' } 'eq' ]
                                        ]
                                    ]
                            }]
                        }
                    ]
            }
        ]
        }

       {
        c:'WW'
        e:[
            
            {
                c:'WW'
                e:[
                    {
                        t:'ti'
                        s:'Apps'
                        e:[
                            {
                                i:'addAppHolder'
                                I:'dev_addApp'
                            }
                        ]
                    }
                    {
                        I:'dev_mangeApp'
                        Q:{
                            DBId:'usersApps'
                        }
                        _IQuery_: [ {
                                    a: 'getJ'
                                    n: 'usersApps'
                                    s: ['A']
                                    l: '0'
                                    group:'id'
                                    q: [
                                        [
                                            ['id' '0' 'uneq']
                                        ]
                                    ]
                                    j:[
                                            {
                                                n: 'appsPermissions'
                                                s: ['A']
                                                l: '0'
                                                q: [
                                                    [
                                                        ['appId' { 't': 'q' 'd': 'id' }'eq']
                                                    ]
                                                ]
                                            
                                            }
                                            {
                                                n: 'usersTypeAppsUsage'
                                                s: ['A']
                                                l: '0'
                                                q: [
                                                    [
                                                        ['appId' { 't': 'q' 'd': 'id' }'eq']
                                                    ]
                                                ]
                                            
                                            }
                            ]
                                }
                            ]
                    }
                ]
            }
        ]
       }
    {
        c:'WW'
        e:[
            
            {
                c:'WW'
                e:[
                    {
                        t:'ti'
                        s:'Permissions'
                        e:[
                            {
                                i:'addpermissionsHolder'
                                I:'dev_addPermission'
                            }
                        ]
                    }
                    {
                        I:'dev_mangePermissions'
                        Q:{
                            DBId:'permissions'
                        }
                        _IQuery_: [ {
                                        a: 'get'
                                        n: 'permissions'
                                        s: ['A']
                                        l: '0'
                                        q: [
                                            [
                                                ['id' '0' 'uneq']
                                            ]
                                        ]
                                }
                            ]
                    }
                ]
            }
        ]
       }

        {
            c:'WW'
            e:[
                
                {
                    c:'WW'
                    e:[
                        {
                            t:'ti'
                            s:'Users Account Types'
                            e:[
                                {
                                    i:'addUsersTypeHolder'
                                    I:'dev_addUsersType'
                                }
                            ]
                        }
                        {
                            I:'dev_mangeUsersType'
                            Q:{
                                DBId:'usersType'
                            }
                            _IQuery_: [ {
                                            a: 'get'
                                            n: 'usersType'
                                            s: ['A']
                                            l: '0'
                                            q: [
                                                [
                                                    ['id' '0' 'uneq']
                                                ]
                                            ]
                                    }
                                ]
                        }
                    ]
                }
            ]
        }
               
    ]
}