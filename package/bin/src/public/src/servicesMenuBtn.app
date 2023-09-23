{
              t: 'ly' 
              cls: [
                'Drop D_INB '
              ] 
              e: [
                {
                  t: 'cell' 
                  i:'servicesBt'
                  c: [
                    'dropbtn'  'PD_20' 'W_90' 'H_65' 'menuIconBack'
                  ] 
                  s: 't.{services}'
                } 
                {
                  t: 'ly' 
                  c: [
                    'DropList' 'W_M_C'
                  ] 
                  e: [
                
                    {
                      t: 'a' 
                      s:'t.{serv-ti-1}' 
                      a:{
                           fn:{      
                              _.openRoot('serv1');
                            }
                        }
                    } 
                    {
                      t: 'a' 
                      s:'t.{serv-ti-2}' 
                      a:{
                            fn:{
                            
                            _.openRoot('serv2');
                            }
                        }
                    } 
                     {
                      t: 'a' 
                      s:'t.{serv-ti-3}' 
                      a:{
                            fn:{
                            
                            _.openRoot('serv3');
                            }
                        }
                    } 
                
                  
                  
                  ]
                }
              ]
            }