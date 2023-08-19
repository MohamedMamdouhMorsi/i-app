{
    c:'WW'
    i:'limitForm_q.{DBId}'
    e:[
       
        {
            t:'b'
            i:'backBt_q.{DBId}'
            c:'PD_4 B_GRY5 D_N pointer input'
            s:'<'
                 a:{
                fn:{
                   const table = _.I_O(Q.table);
                   _.DEL_E(Q.table);
                   const linesNumSt = `linesNum_${Q.DBId}`;
                   const curePageSt = `curePage_${Q.DBId}`;
                   const lastNumSt = `lastNum_${Q.DBId}`;
                   const QsizeSt = `Qsize_${Q.DBId}`;
                   const Qsize = parseInt(_.E_I_V(QsizeSt));
                   const linesNum = parseInt(_.E_I_V(linesNumSt));
                   const curePage = parseInt(_.E_I_V(curePageSt));
                   const lastNum = parseInt(_.E_I_V(lastNumSt));
                   const backNum = lastNum - linesNum;
                   const nextPage = curePage - 1; 

                   if(nextPage === 1){
                      _.A_CL(`backBt_${Q.DBId}`,'D_N');
                   }

                   if(nextPage > 0 && backNum >= 0 ){
               
                    table.last = backNum;
                   _.upQuery(table);
                   const pageClac = Qsize /  linesNum;
                   const pageNumber = pageClac > parseInt(pageClac) ? parseInt(pageClac) +1 : parseInt(pageClac);
                   
                  
                  
                    if(nextPage > 1 && pageNumber > 1){
                        _.D_CL([`backBt_${Q.DBId}`,'D_N']);
                    }
                  _.IN_V(`curePage_${Q.DBId}`,nextPage);
                  _.In_S(`pageNo_${Q.DBId}`,`Page No ${nextPage}`);
                }
                }
            }
        }
        {
            t:'b'
            i:'pageNo_q.{DBId}'
            c:'PD_5  F_GRY8 input F_S_12'
            s:'Page No 1'
        }
        {
            t:'b'
            i:'forwardBt_q.{DBId}'
            c:'PD_4 B_GRY5 pointer input'
            s:'>'
            a:{
                fn:{
                   const table = _.I_O(Q.table);
                   _.DEL_E(Q.table);
                   const linesNumSt = `linesNum_${Q.DBId}`;
                   const curePageSt = `curePage_${Q.DBId}`;
                   const QsizeSt = `Qsize_${Q.DBId}`;
                   table.last = _.E_I_V(`lastNum_${Q.DBId}`);
                   _.upQuery(table);
               
                   const Qsize = parseInt(_.E_I_V(QsizeSt));
                   const linesNum = parseInt(_.E_I_V(linesNumSt));
                   const curePage = parseInt(_.E_I_V(`curePage_${Q.DBId}`));
                   const pageClac = Qsize /  linesNum;
                   const pageNumber = pageClac > parseInt(pageClac) ? parseInt(pageClac) +1 : parseInt(pageClac);
                   
                   const nextPage = curePage + 1; 
                    if(nextPage > 1 && pageNumber > 1){
                        _.D_CL([`backBt_${Q.DBId}`,'D_N']);
                    }
                   if(nextPage == pageNumber){
                        _.A_CL(`forwardBt_${Q.DBId}`,'D_N');
                   }
                  _.IN_V(`curePage_${Q.DBId}`,nextPage);
                  _.In_S(`pageNo_${Q.DBId}`,`Page No ${nextPage}`);
                }
            }
        }
        {
            t:'b'
            i:'reasltBt_q.{DBId}'
            c:'PD_5  F_GRY8 input F_S_12'
          
        }
        {
            t:'in'
            c:'input W_50'
            i:'linesNum_q.{DBId}'
            mod:'number'
            s:'lines No'
            vq:'lines'
        }
        {
            t:'in'
            c:'D_N'
            i:'lastNum_q.{DBId}'
            mod:'number'
            s:'lines No'
            val:'0'
        }
            {
            t:'in'
            c:'D_N'
            i:'Qsize_q.{DBId}'
            mod:'number'
            s:'Qsize No'
            val:'0'
        }
           {
            t:'in'
            c:'D_N'
            i:'curePage_q.{DBId}'
            mod:'number'
            s:'Qsize No'
            val:1
        }
        {
            t:'b'
            c:'PD_5  F_GRY8 input F_S_12'
            s:'Lines'
        }
            
    ]
}