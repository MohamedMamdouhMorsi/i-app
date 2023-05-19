
const checkQuery = (ob,tables)=>{
    const tableName = ob.n;

    if(tables[tableName]){

    let getText = `show tables like '${tableName}'`;

        return getText;
    }else{
        console.log(`table ${tableName} is not exist`);
        return false;
    }
}
module.exports = checkQuery