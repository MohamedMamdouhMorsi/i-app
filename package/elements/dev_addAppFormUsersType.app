 {
    c:'WW MD T_C PD_5 F_B'
 
   i:'usersTypeSelect'
   e:[

   ]
   a:{
    e:'auto'
    fn:{

        

        const makePermissionForm = ()=>{
            if( v.typeNameList.length > 0 && v.appPermissionsList.length > 0){
                 for(var i = 0 ; i < v.typeNameList.length;i++){
                            
                        const obj                   = v.typeNameList[i];
                        const cureObjId             = `typeName_${obj.id}`;
                        const curetypeNameIdInput   = `permissionNameInput_${cureObjId}`;
                        const curetypeUsageIdInput  = `permissionUsageInput_${cureObjId}`;

                        const elm = {
                            c:'ST_GRY10_1 MD mT_10  MW_300 ',
                            i: cureObjId,
                            e:[
                                {
                                    c:'ST_GRY10_1 ',
                                    e:[
                                         
                                        {
                                            t:'in',
                                            i: curetypeNameIdInput,
                                            val:'1',
                                            s: obj.typeName,
                                            mod:'checkbox',
                                                a:{
                                                e:'change',
                                                fn(v,_){
                                                    var state = true;
                                                    if(_.E_I_S(curetypeNameIdInput).checked){
                                                            state = true;
                                                        _.IN_V(curetypeNameIdInput,"1");
                                                        }else{
                                                            state = false;
                                                        _.IN_V(curetypeNameIdInput,"0");
                                                        }

                                                        for(var r = 0 ; r < v.appPermissionsList.length;r++){
                        
                                                            const obj            = v.appPermissionsList[r];
                                                            const cureObjId_     = `${cureObjId}_permissionName_${obj.id}`;
                                                            const cureObjIdInput = `permissionNameInput_${cureObjId_}`;
                                                            _.E_I_S(cureObjIdInput).click();
                                                            if(state){
                                                                _.D_CL(cureObjId_,'closeSlide');
                                                            }else{
                                                                _.A_CL(cureObjId_,'closeSlide');
                                                            }
                                                        }
                                                    }

                                                }
                                        },{
                                            t:'in',
                                            c:'input',
                                            mod:'number',
                                            val:'0',
                                            s:'Usage',
                                            i:curetypeUsageIdInput
                                            
                                        }
                                    ]
                                }
                            ]
                        };

                        for(var r = 0 ; r < v.appPermissionsList.length;r++){
                            
                            const obj_            = v.appPermissionsList[r];
                            const cureObjId_     = `${cureObjId}_permissionName_${obj_.id}`;
                            const cureObjIdInput_ = `permissionNameInput_${cureObjId_}`;

                            const elmB =  {
                                c:'WW',
                                i:cureObjId_,
                                e:[
                                    {
                                        t:'in',
                                        c:'WW',
                                        i:cureObjIdInput_,
                                        val:'1',
                                        s:obj_.permissionName,
                                        mod:'checkbox',
                                            a:{
                                            e:'change',
                                            fn(v,_){
                                                
                                                if(_.E_I_S(cureObjIdInput_).checked){
                                            
                                                    _.IN_V(cureObjIdInput_,"1");
                                                    }else{
                                                
                                                    _.IN_V(cureObjIdInput_,"0");
                                                    }
                                                }
                                            }
                                    }
                                ]
                            };

                            elm.e.push(elmB);
                        }

                        _.CR_(elm ,'usersTypeSelect');
                }
            }else{
                _.CL_([v.typeNameList,  v.appPermissionsList]);
                setTimeout(makePermissionForm,300);
            }
        };
        makePermissionForm();       
 
        
    }
   }
}