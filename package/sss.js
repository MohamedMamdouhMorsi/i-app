
 const selectElement =(ob,data)=>{
 
  const holderId = `${ob.i}_holder`;

    if(!i_app_model['sl'] ){
          const callback = (body,[ob,data])=>{
            i_app_model['sl'] = body;
            selectElement(ob,data);
          }
        G_root('sl.app',callback,[ob,data]);
      
    }else if(i_app_model['sl'] ){
        const selectModel = COPY_OB(i_app_model['sl']);
        const fnSt = `{_.SW_CL("${ob.i}_selectScreen","D_N")}`;
        const fnStDC = DC_(fnSt);
       
        selectModel.e[0].i = `${ob.i}_selectButton`;
        selectModel.e[0].a = {fn: fnStDC}
        if(ob.c){
          if(!ob.c.match(/pointer/)){
            ob.c += ' pointer';
          }
          selectModel.e[0].c = ob.c;
        }
        const searchFnSt = `{_.filterSearchItems("${ob.i}",${data && data.length > 0 ? JDS_(data) : false})}`;
        const searchFnStDC = DC_(searchFnSt);
        const clearInputFnSt = `{_.IN_V("${ob.i}_selectSearch",'');}`;
        const clearInputFnStDC = DC_(clearInputFnSt);
        const basicSearchText = ob.s ? ob.s : 'search-text';

        selectModel.e[1].e[0].e[0].a =  {fn: fnStDC}
        selectModel.e[1].i = `${ob.i}_selectScreen`;
        selectModel.e[1].e[0].e[1].e[0].i = `${ob.i}_selectSearch`;
        selectModel.e[1].e[0].e[1].e[1].a ={fn: clearInputFnStDC};
        selectModel.e[1].e[0].e[1].e[0].s = ob.mod == 'phonecode' ? `Search Your Country Code (+00)` :basicSearchText;
        selectModel.e[1].e[0].e[1].e[0].a = {e:'input',fn:searchFnStDC};
        selectModel.e[1].e[0].e[2].i = `${ob.i}_selectItems`;
        selectModel.e[1].e[0].e[2].e =[];
        CL_(['_holder',holderId])
        if(ob.e && ob.e.length > 0){
         
          selectModel.e[1].e[0].e[2].e =[...ob.e];
          for(var i = 0; i < selectModel.e[1].e[0].e[2].e.length;i++){
            if(selectModel.e[1].e[0].e[2].e[i].v || selectModel.e[1].e[0].e[2].e[i].val){
              const val =selectModel.e[1].e[0].e[2].e[i].v?selectModel.e[1].e[0].e[2].e[i].v: selectModel.e[1].e[0].e[2].e[i].val;
              const fnStItem = `{_.IN_V("${ob.i}","${val}");_.SW_CL("${ob.i}_selectScreen","D_N");_.elmChange('${ob.i}');}`;
              const fnStItemDC = DC_(fnStItem);
                    selectModel.e[1].e[0].e[2].e[i].a = {fn:fnStItemDC};
                    selectModel.e[1].e[0].e[2].e[i].i = `${i}_item`;
            }
          
          }
          selectModel.e[0].s = selectModel.e[1].e[0].e[2].e[0] && selectModel.e[1].e[0].e[2].e[0].s ?selectModel.e[1].e[0].e[2].e[0].s : 'No Items';
          CR_(selectModel,holderId,data);
        }else {
     
            if(data &&  ob.mod == 'phonecode'){
              for(var i = 0 ; i < data.length ; i++){
                const lowerCode  = data[i].code.toLowerCase();
                const imgSrc     = `flags/${lowerCode}.png`;
                const fnStItem   = `{
                  _.IN_V("${ob.i}","${data[i].dialCode}");
                  _.SW_CL("${ob.i}_selectScreen","D_N");
                  _.elmChange('${ob.i}_dialCode');
                  _.E_I_S('${ob.i}_flag').src = _.G_SRC('${imgSrc}');
                  _.E_I_S('${ob.i}_code').innerText = '${data[i].dialCode}';
                }`;
  
                const fnStItemDC = DC_(fnStItem);
                const selectItem = {
                  c:'WW ST_B_GRY8_1 pointer PD_4',
                  i: `${i}_item`,
                  e:[
                    {
                      t:'img',
                      c:'W_20',
                      src:imgSrc
                    },
                    {
                      t:'sp',
                      s:'q.{dialCode} ',
                      c:'F_GRY7 W_50 mL_10 '
                    },{
                      t:'sp',
                      s:'q.{name} ',
                      c:'F_S_12 '
                    },{
                      t:'sp',
                      s:' ( q.{originalName} )',
                      c:'F_S_12 '
                    }
                  ],
                  Q:data[i] ,
                  a:{fn:fnStItemDC}
              }
              selectModel.e[1].e[0].e[2].e.push(selectItem);
              }
  
              const firstLowerCode  = data[0].code.toLowerCase();
              const firstImgSrc     = `flags/${firstLowerCode}.png`;
              selectModel.e[0].e    = [{t:'img',i:`${ob.i}_flag`,src: firstImgSrc ,c:'W_20'},{t:'sp',i:`${ob.i}_code`,s: data[0].dialCode ,c:'mL_5'},{t:'icon',c:'ICO-caret-down mL_5'}];
              CR_(selectModel,holderId,data);
  
            }else  if(data && ob.model ){
               
              for(var i = 0 ; i < data.length ; i++){
                  for(var m = 0 ; m < ob.model.length ; m++){
                    const model_ = ob.model[m]; 
                    const _selectButtonData = {t:"sp",s:model_.s ? model_.s : 'no model text' }
                    const fnStItem   = `{
                      _.IN_V("${ob.i}","${data[i][model_.vq]}");
                      _.elmChange('${ob.i}');
                      _.SW_CL("${ob.i}_selectScreen","D_N");
                      _.E_I_S("${ob.i}_selectButton").innerHTML = '';
                      _.CR_(${JDS_(_selectButtonData)} ,'${ob.i}_selectButton',${JDS_(data[i])});
                    }`;
                
                    const fnStItemDC = DC_(fnStItem);
                    const selectItem = {
                      c:'WW ST_B_GRY8_1 pointer PD_4 F_B',
                      i: `${i}_item`,
                      e:[
                        {
                          t:'sp',
                          s:model_.s,
                          c:'F_S_12 '
                        }
                      ],
                      Q:data[i] ,
                      a:{fn:fnStItemDC}
                  }
                  if(ob.data && ob.data.order && ob.data.order == 'icons'){
                    selectItem.e = [{
                      t:'icon',
                      c:'F_S_30 '+data[i].class
                    },...selectItem.e ]
                  }
                  selectModel.e[1].e[0].e[2].e.push(selectItem);
                  }
              }
              selectModel.e[0].e    = [{t:'sp',Q:data[0],i:`${ob.i}_code`,s:ob.s ,c:'mL_5 F_B'}];
         
              CR_(selectModel,holderId,data);
            }
           
          
        }
       
        
    }
 }