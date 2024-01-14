{
    i:'selectIconsdiv'
    c:'H_200'
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
                                        _.In_S('selectIconsRes',val);
                                    }
                             
                                }
                                model:[
                                        {
                                            t:'op'
                                            q:{
                                                i:'name'
                                                s:'op'
                                            }
                                            vq:'class'
                                            s:'q.{name}'
                                        }
                                    ]
                        }
    ]
}
    
     