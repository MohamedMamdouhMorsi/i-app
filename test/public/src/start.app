
{   v:{
    num: 0

}
    t:'sc'
    c:'HH  WW B_W F_B _MR_0 TXT_C '
    e:[
   {
    t:'ly'
    c:'W_P_50 MD cards'
    e:[
        {
            t:'ly'
            i:'translate'
            c:'card4'
            e:[
                {   
                t:'ti'
                s:'t.{ hello-world }!!  '
                }

                {
                t:'bt'
                s:'t.{lang}'
                c:'B_B F_W PD_5 B_R_5 '
                a:{
                    fn:{
                    
                    _.createAppTxt(_.s_Lang())
                    }
                }
                
                }
            ]
        }
        {
            t:'ly'
            i:'counter'
            c:'card4'
            e:[
            {
                t:'bt'
                s:'+'
                c:'B_B F_W PD_2 B_R_5 _MR_5'
                a:{
                fn:{
                v.num++
                }  
            }
            
            }
            {   
            t:'b'
            s:'    v.{ num }   '
            }

            {
            t:'bt'
            s:'-'
            c:'B_B F_W PD_2 B_R_5 _MR_5 '
            a:{
                fn:{
                     v.num--
                }  
            }
            
            }
            ]
        }
        {
            t:'ly'
            i:'themeSwitch'
            c:'card4'
            e:[
                {
                    t:'lb'
                    c:'switch'
                    e:[
                        {
                            t:'in'
                            mod:'checkbox'
                            a:{
                                fn:{
                                    if(_.theme === "light"){
                                    _.A_CL('theme_icon', 'ICO-moon');
                                
                                    }else  if(_.theme === "dark"){
                                        _.A_CL('theme_icon', 'ICO-sun');
                                    }
                                    _.switchTheme();
                                }
                            }
                        } {
                            t:'icon'
                            c:'pointer'
                            iconTheme:true
                            
                        }
                    ]

                }
            ]
        }
   
        {
            t:'ly'
            i:'inputValue'
            c:'card4'
            e:[
              {
                                t:'tx'
                                s:'input value : val.{inElm}'
                            }
                            {
                                t:'in'
                                c:'inBB F_B'
                                i:'inElm'
                                mod:'text'
                            }
            ]
        }
   
      ]
   }
   
    ]
    
}