const setUpData =(data,table)=>{
    let upData = "";
    for(var i = 0; i < data.length; i++){
        const columnIndex = data[i][0] -1;
        const columnName  = table[columnIndex];
        const value = data[i][1];
        if(typeof value === 'string'){
            upData += `${columnName} = '${value}'`;
        }else{
            upData += `${columnName} = ${value}`;
        }
      
        if(data[i + 1]){
            upData += ' , ';
        }
    }
    return upData;
}
module.exports = setUpData