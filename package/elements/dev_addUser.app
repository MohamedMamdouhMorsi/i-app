{
    c:'WW '
    i:'addUserHolder'
    e:[
        {
            e:[
                {
                    t:'bt'
                     c:'B_PR_D F_WHITE BT'
                    s:'add User'
                    a:{
                        fn:{
                                _.E_I_S('addUserDialog').showModal();
                                  window.scrollTo(0,0);
                        }
                    }
                }
            ]
        }
        {
            t:'dialog'
            i:'addUserDialog'
            c:'WW'
            e:[
                {
                    t:'icon'
                    c:'ICO-close F_S_30 F_W B_B pointer'
                    a:{
                        fn:{
                                _.E_I_S('addUserDialog').close();
                        }
                    }
                }
                {
                    I:'dev_addUserForm'
                }
            ]

        }
    ]
}