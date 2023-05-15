const getDirectoryTree = require('../utils/getDirectoryTree');
const getDirectoryArray = require('../utils/getDirectoryArray');
const {JDS_,CL_} = require('../tools');
const path = require('path');

const appDir = ()=>{
    const userDir = path.dirname(require.main.filename); 
    const userPublicDir  = path.join(userDir, 'public');
    const tree = getDirectoryTree(userPublicDir);
    const i_app_path = path.join(userDir, 'i.app');
    const i_app_db_path = path.join(userDir, 'db.app');
    const assetArray = ['/',...getDirectoryArray(tree,'')];
    return{
        tree:tree,
        userDir:userDir,
        userPublicDir:userPublicDir,
        i_app_path:i_app_path,
        assetArray:assetArray,
        i_app_db_path:i_app_db_path
    }
}

module.exports = appDir;