{
    t:'ly'
    c:'WW'
    e:[
        {
        t:'ly'
        c:'WW'
        e:[{
                data:[
                        {
                            a: "get"
                            n: "users"
                            s: ["username"]
                            l: '0'
                            q: [
                                [
                                    ['1' '0' 'uneq']
                                ]
                            ]
                        }
                    ]
                model:[
                        {
                            t:'ti'
                            s:`q.{username}`
                        }
                    ]
        }]

        }

        {
            t:'bt'
            s:'insertVal'
            a:{
                fn:{
                    const callback = (data)=>{console.log("inssert:"+data);};
                    _._POST('/api',
                    {query:[{a:'in',n:'users',d:['ahmed']}]},
                    callback);
                    }
            }
        }
       {t:'br'}
        {
            t:'bt'
            s:'updateVal'
            a:{
                fn:{
                    const callback = (data)=>{console.log("update:"+data);};
                    _._POST('/api',
                    {query:[{a:'up',n:'users', d:[[2,'testUpdate']] ,q:[
                                [
                                    ['1' ,'5' ,'eq']
                                ]
                            ],l:1}]},
                    callback);
                    }
            }
        }   
            {t:'br'}
        {
            t:'bt'
            s:'deleteVal'
            a:{
                fn:{
                    const callback = (data)=>{console.log("update:"+data);};
                    _._POST('/api',
                    {query:[{a:'del',n:'users',q:[
                                [
                                    ['1' ,'5' ,'eq']
                                ]
                            ],l:1}]},
                    callback);
                    }
            }
        }  
]

}