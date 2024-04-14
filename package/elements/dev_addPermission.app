{
    c:'WW'
    i:'addPermissionHolder'
    e:[
        {
            e:[
                {
                    t:'bt'
                     c:'B_PR_D F_WHITE BT'
                    s:'add Permission'
                    a:{
                        fn:{
                                _.E_I_S('addPermissionDialog').showModal();
                                window.scrollTo(0,0);
                        }
                    }
                }
            ]
        }
        {
            t:'dialog'
            i:'addPermissionDialog'
            c:'WW'
            e:[
                  {
                    t:'icon'
                    c:'ICO-close F_S_30 F_W B_B pointer'
                    a:{
                        fn:{
                                _.E_I_S('addPermissionDialog').close();
                        }
                    }
                }
                {
                    I:'dev_addPermissionForm'
                }
            ]

        }
    ]
}