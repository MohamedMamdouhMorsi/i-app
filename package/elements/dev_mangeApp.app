 {
            t:'t'
            i:'table_q.{DBId}'
            c:'table'
            limitAuto:2
            joinQuery:true
            model:[
                    {
                        t:'thead'
                        once:true
                        e:[
                            {
                                t:'tr'
                                c:'B_W F_B'
                                forkey:{
                                            t:'th'
                                            c:'PD_5'
                                            s:'key'
                                        }
                            notKey:['DBId' 'appsPermissions' 'usersTypeAppsUsage']
                            }
                        ]
                    }
                    {
                        t:'tr'
                        c:'B_W F_B'
                        forkey: {
                                t:'td'
                                c:'PD_5 '
                                s:'q.{key}'
                                attr:{
                                    model_data:'key'
                                }
                            
                                  
                                }
                            notKey:['DBId' 'Qsize' 'appsPermissions' 'usersTypeAppsUsage']
                        e:[
                           {
                            t:'td'
                            c:'NW_10 settings'
                            e:[ {
                                c:'POS_AB RR_0 TT_5  BBGLASS hovTW '
                                e:[
                                 {
                                    t:'sp'
                                    s:'Delete'
                                    c:'pointer mL_30 mR_30 F_S_10 D_IN F_WHITE'
                                    e:[
                                       {
                                        t:'icon'
                                        c:'ICO-ui-delete   F_S_20 F_RE10'
                                    } 
                                    ]
                                    a:{
                                     
                                        fn:{
                                                 if(Q.id){
                                               
                                                _._POST('/api',{_IQuery_:[
                                                    {
                                                        n:'usersApps',
                                                        a:'del',
                                                        l:'1',
                                                        q:[
                                                            [
                                                                [1,Q.id,"eq"]
                                                            ]
                                                        ]
                                                    }
                                                ]});
                                            }
                                        }
                                        }
                                }
                                
                                {
                                    t:'sp'
                                    c:'pointer  mL_30 mR_30 F_S_10 D_IN F_WHITE '
                                    s:'Update'
                                    e:[
                                        {
                                        t:'icon'
                                        c:'ICO-fountain-pen  F_S_20 F_GRE9'
                                  
                                        }
                                    ]
                                    a:{
                                        fn:{
                                                _.E_I_S(`editBody_${Q.DBId}_${Q.id}`).showModal();
                                                 _.openOverHide(true); 
                                        }
                                    }
                                 }
                           
                                 
                                    
                                ]
                            }]
                           }
                        ]
                    }
                   
                    {
                        t:'dialog'
                        i:'editBody_q.{DBId}_q.{id}'
                        c:' B_W'
                        e:[
                            
                            {
                                t:'icon'
                                c:'ICO-close-circled F_B F_S_20 pointer'
                                a:{
                                    fn:{
                                            _.E_I_S(`editBody_${Q.DBId}_${Q.id}`).close(); 
                                             _.closeOverHide(true); 
                                    }
                                }
                            }

                            {               
                                forkey: {
                                            t:'in'
                                            c:' D_B mT_30  input'
                                            vq:'key'
                                            s:'key'
                                            label:true
                                            labelClass:'F_PR'
                                            i:'input_q.{DBId}_key_q.{id}'
                                        }
                                notKey:['id' 'DBId' 'Qsize' 'appsPermissions' 'usersTypeAppsUsage']
                            }
                         {
                            c:'F_B'
                        q:{
                            s:'editAppPer'
                            i:'id'
                        }
                        e:[]
                        a:{
                            e:'auto'
                            fn:{

                                const haveTypeid_ = (id)=>{
                                     const per =Q.appsPermissions;
                                       
                                        if(per[0] && per[0].typeId && per[0].typeId !==  null){
                                   
                                            for(var p = 0 ; p < per.length; p++){
                                            
                                                if(per[p].typeId == id){
                                                    return true;
                                                }
                                            }
                                        }
                                           
                                      return false;
                                }

                                const haveTypePermission = (id,idP)=>{
                                     const per =Q.appsPermissions;
                                       if(per[0] && per[0].typeId && per[0].typeId !==  null){
                                     for(var p = 0 ; p < per.length; p++){
                                        if(per[p].typeId == id && per[p].permissionId == idP ){
                                            return true;
                                        }
                                     }}
                                      return false;
                                }

                                const makePermissionForm = ()=>{
                                        const appId = Q.id;
                                        for(var i = 0 ; i < v.typeNameList.length;i++){
                                                    
                                                const obj            = v.typeNameList[i];
                                                const typeId_        = obj.id;
                                                var usage_ = 0;
                                                if(Q.usersTypeAppsUsage && Q.usersTypeAppsUsage.length > 0){

                                                    for(var a =0; a < Q.usersTypeAppsUsage.length; a++){
                                                        if( Q.usersTypeAppsUsage[a].typeId){
                                                                const cureAppType = Q.usersTypeAppsUsage[a].typeId;
                                                                if(cureAppType == typeId_ ){
                                                                    usage_ =  Q.usersTypeAppsUsage[a].usageLimit;
                                                                }
                                                        }
                                                       
                                                    }

                                                }
                                                const haveTypeie_    = haveTypeid_(typeId_);
                                                const cureObjId      = `app_${appId}_typeName_${typeId_}`;
                                                const curetypeNameIdInput   = `permissionNameInput_${cureObjId}`;
                                                const curetypeUsageIdInput  = `permissionUsageInput_${cureObjId}`;
                                                var val = '0';
                                                if(haveTypeie_){
                                                    val = '1';
                                                }
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
                                                                    val:val,
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
                                                                    val:usage_,
                                                                    s:'Usage',
                                                                    i:curetypeUsageIdInput
                                                                    
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                };

                                                for(var r = 0 ; r < v.appPermissionsList.length;r++){
                                                    
                                                    const obj_           = v.appPermissionsList[r];
                                                    const perId          = obj_.id;
                                                    const haveTypePermission_ = haveTypePermission(typeId_,perId);
                                                    const cureObjId_     = `${cureObjId}_permissionName_${perId}`;
                                                    const cureObjIdInput_ = `permissionNameInput_${cureObjId_}`;
                                                    var typeFirstClass = 'WW closeSlide';
                                                    if(haveTypeie_){
                                                        typeFirstClass = 'WW';
                                                    }
                                                        var val_ = '0';
                                                        if(haveTypePermission_){
                                                            val_ = '1';
                                                        }
                                                    const elmB =  {
                                                        c:typeFirstClass,
                                                        i:cureObjId_,
                                                        e:[
                                                            {
                                                                t:'in',
                                                                c:'WW',
                                                                i:cureObjIdInput_,
                                                                val:val_,
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

                                                _.CR_(elm ,`editAppPer_${Q.id}`);
                                        }

                                };

                                makePermissionForm();

                            }
                        }
                    }
                    {
                        c:'WW MD T_C'
                        e:[
                            {
                                t:'bt'
                                c:'B_PR F_W B_R_10 B_N PD_10  '
                                s:'Update'
                                a:{
                                    fn:{
                                        if(Q.id){
                                            const appName = _.E_I_V(`input_usersApps_appName_${Q.id}`);
                                            const appDescription = _.E_I_V(`input_usersApps_description_${Q.id}`);
                                            const callbackA = ()=>{
                                                deletePermissions();
                                            }
                                            const callbackB = ()=>{
                                                    insertPermissions();
                                            }
                                            const callbackC = ()=>{
                                                    const tableName   = 'table_usersApps';
                                                    const tableObject = _.I_O(tableName);
                                                    
                                                    _.upQuery(tableObject);
                                                        _.closeOverHide(true); 
                                            }
                                            _._POST('/api',{
                                                _IQuery_:[
                                                {
                                                    n:'usersApps',
                                                    a:'up',
                                                    l:'1',
                                                    q:[
                                                        [
                                                            [1,Q.id,"eq"]
                                                        ]
                                                    ],
                                                    d:[[2,appName],[3,appDescription]]
                                                }
                                            ]},callbackA);

                                            const deletePermissions =()=>{
                                                    _._POST('/api',{_IQuery_:[
                                                            {
                                                                n:'appsPermissions',
                                                                a:'del',
                                                                l:'0',
                                                                q:[
                                                                    [
                                                                        [1,Q.id,"eq"]
                                                                    ]
                                                                ]
                                                            }
                                                        ]},callbackB);
                                                        _._POST('/api',{_IQuery_:[
                                                            {
                                                                n:'usersTypeAppsUsage',
                                                                a:'del',
                                                                l:'0',
                                                                q:[
                                                                    [
                                                                        [1,Q.id,"eq"]
                                                                    ]
                                                                ]
                                                            }
                                                        ]},callbackB);
                                            }

                                            const insertPermissions = ()=>{

                                                    const appId     = Q.id;
                                                    const inPerData = [];
                                                    const queryA    = {
                                                                        _IQuery_:[ {
                                                                            a:'in',
                                                                            n:'appsPermissions',
                                                                            d: []
                                                                            } ]
                                                                    };

                                                    const queryB = {
                                                                _IQuery_:[ {
                                                                    a:'in',
                                                                    n:'usersTypeAppsUsage',
                                                                    d: []
                                                                } ]
                                                            };

                                                    for(var i = 0 ; i < v.typeNameList.length;i++){
                                                        
                                                        const typeObj               = v.typeNameList[i];
                                                        const typeId                = typeObj.id;
                                                        const typeIdKey             = `app_${appId}_typeName_${typeId}`;
                                                        const curetypeNameIdInput   = `permissionNameInput_${typeIdKey}`;
                                                        const curetypeUsageIdInput  = `permissionUsageInput_${typeIdKey}`;
                                                        
                                                        const usage_ = parseInt(_.E_I_V(curetypeUsageIdInput));
                                                     
                                                        if(usage_ > 0){
                                                            queryB._IQuery_[0].d.push([appId,typeId,usage_]);
                                                           
                                                        }

                                                            if(_.E_I_S(curetypeNameIdInput).checked){

                                                                for(var r = 0 ; r < v.appPermissionsList.length;r++){

                                                                        const permissionsObj        = v.appPermissionsList[r];
                                                                        const permissionId          = permissionsObj.id;
                                                                        const permissionIdKey       = `${typeIdKey}_permissionName_${permissionId}`;
                                                                        const curepermissionIdInput = `permissionNameInput_${permissionIdKey}`;

                                                                        if(_.E_I_S(curepermissionIdInput).checked){
                                                                            queryA._IQuery_[0].d.push([appId,typeId,permissionId]);
                                                                        }
                                                                }
                                                            }
                                                    }

                                                   
                                                    _._POST('/api',queryA,()=>{
                                                        _._POST('/api',queryB,callbackC);
                                                    });
                                                     
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                        ]
                    
                    }                           
    ]
}