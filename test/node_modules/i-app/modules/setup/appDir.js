const getDirectoryTree = require('../utils/toolsFN/getDirectoryTree');
const getDirectoryArray = require('../utils/toolsFN/getDirectoryArray');

const path = require('path');
let treeState = false;
let treeData = {}
const appDir =async ()=>{
    const userDir = path.dirname(require.main.filename); 
    const userPublicDir  = path.join(userDir, 'public');
   

    if(!treeState){
        treeState = true;
        const tree = await getDirectoryTree(userPublicDir);
        treeData = tree;
    }
  
    const i_app_path = path.join(userDir, 'i.app');
    const i_app_db_path = path.join(userDir, 'db.app');
    const assetArray = ['/',...getDirectoryArray(treeData,'')];
    return{
        tree:treeData,
        userDir:userDir.toString(),
        userPublicDir:userPublicDir,
        i_app_path:i_app_path,
        assetArray:assetArray,
        i_app_db_path:i_app_db_path
    }

}

module.exports = appDir;