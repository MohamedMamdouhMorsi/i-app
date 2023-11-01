{
    e:[

       {
        c:'WW'
        e:[ {
            t:'ti'
            s:'Users'
        }
        {
            I:'dev_mangeDatabse'
            Q:{
                DBId:'users'
            }
            data:[ {
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
                                l: '0'
                                q: [
                                    [
                                        ['id' { 't': 'q' 'd': 'userType' }'eq']
                                    ]
                                ]
                        }]
                    }
                ]
        }]
       }
        {
            c:'WW'
            e:[
                {
                    t:'ti'
                    s:'Apps'
                }
                {
                    I:'dev_mangeDatabse'
                    Q:{
                        DBId:'usersApps'
                    }
                    data: [ {
                                a: 'get'
                                n: 'usersApps'
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
    a:{
        e:'auto'
        fn:{
           
        }
    }
}