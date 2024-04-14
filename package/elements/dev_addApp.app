{
  
    c:'WW'
    i:'addAppHolder'
    e:[
        {
            e:[
                {
                    t:'bt'
                    c:'B_PR_D F_WHITE BT'
                    s:'add App'
                    a:{
                        fn:{
                                _.E_I_S('addAppDialog').showModal();
                                window.scrollTo(0,0);
                        }
                    }
                }
            ]
        }
        {
            t:'dialog'
            i:'addAppDialog'
            c:'WW'
            e:[
                {
                    t:'icon'
                    c:'ICO-close F_S_30 F_W B_B pointer'
                    a:{
                        fn:{
                            _.E_I_S('addAppDialog').close();
                        }
                    }
                }
                {
                    I:'dev_addAppForm'
                }
            ]

        }
    ]
}