{
    c:'WW'
    i:'addUserTypeHolder'
    e:[
        {
            e:[
                {
                    t:'bt'
                     c:'B_PR_D F_WHITE BT'
                    s:'add User Account Type'
                    a:{
                        fn:{
                                _.E_I_S('addUserTypeDialog').showModal();
                                window.scrollTo(0,0);
                        }
                    }
                }
            ]
        }
        {
            t:'dialog'
            i:'addUserTypeDialog'
            c:'WW'
            e:[
                  {
                    t:'icon'
                    c:'ICO-close F_S_30 F_W B_B pointer'
                    a:{
                        fn:{
                                _.E_I_S('addUserTypeDialog').close();
                        }
                    }
                }
                {
                    I:'dev_addUsersTypeForm'
                }
            ]

        }
    ]
}