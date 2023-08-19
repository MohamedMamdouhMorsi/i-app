{
    e:[
                  {
                                t:'sl'
                                s:'Search in Icons'
                                mod:'icons'
                                vq:'class'
                                c:'ST_PR_2 PD_5'
                                i:'iconSelect'
                                a:{
                                    e:'change' 
                                    fn:{
                                        const val = _.E_I_V('iconSelect');
                                        navigator.clipboard.writeText(val);
                                  }
                             
                                }
                                   model:[
                                        {
                                            t:'op'
                                            vq:'class'
                                            s:'q.{name}'


                                        }
                                    ]
                        }
    ]
}
    
     