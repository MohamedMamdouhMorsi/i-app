{
   
    i:'heroHolder'
    c:'WW  T_C TT_0 mT_25 DIREC_L B_W D_FLOWROOT B_PR'
    e:[
    {
      c:'main T_S PD_10 LH_2'
      e:[{
      t:'h1'
      c:'WW TT_0 F_S_60 pT_40 '
      s:'Welcome to'
      }
      {
      t:'h1'
      c:'WW TT_0 mT_-50 F_W F_S_60  '
      s:'app.{name}'
      }]
    }
    {
      c:'main T_S PD_10 LH_1 TT_0 mT_-60'
      e:[
         {
          t:'icon'
          c:'ICO-win-trophy F_S_80 F_YE9'
        }
    {
      t:'h3'
      c:'WW   F_W FF_courier'
      s:'Congratulations You Are Ready To Build'
     
    }
    {
      t:'h3'
      c:'WW   F_W FF_courier'
      s:'Next Big Version of app.{name} .'
    }
    {
      t:'br'
    }
    {
      t:'h3'
      c:'WW  F_W FF_courier'
      s:'That is a simple UI version for app.{name}'
    }  
      {
      t:'h3'
      c:'WW  F_W FF_courier'
      s:'You have Now All What You Need To Start .'
    }  
     {
      t:'br'
    }   
    {
      t:'b'
      c:' D_INB '
      s:'go to /dev to edit your app info '
    
    } 
    {
      t:'b'
      c:'PD_15 B_W F_B B_R_10 mR_5 mL_5 pointer D_INB'
      s:'dev >>'
      a:{
        fn:{
            _.openRoot('dev');
            }
       }
    }]
    }
     ]
}