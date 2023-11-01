const fs = require('fs');
const path = require('path');
const iAppReader = require('./iAppReader');
const iAppFileMaker = require('./iAppFileMaker');
const  getDirectoryTree =async (rootDir)=>{
  const {JDS_,CL_,JD_} = require('../../tools');
  const stats = fs.statSync(rootDir);

  if (!stats.isDirectory()) {
    throw new Error(`"${rootDir}" is not a directory`);
  }

  const tree = {};

  tree.name = path.basename(rootDir);
  tree.children = [];

  const files = fs.readdirSync(rootDir);

  for (var f =0 ; f < files.length; f++) {
    const file = files[f];
    const filePath = path.join(rootDir, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      const aFile = await getDirectoryTree(filePath);
      tree.children.push(aFile);
    } else  {
      const fileStrArr = file.split('.');
      const fileEx = fileStrArr[fileStrArr.length -1];
      if(fileEx == 'app'){
        const data =await fs.readFileSync(filePath, 'utf8');
        const fileConfigTx = iAppReader(data.toString());
        const fileConfig = JD_(fileConfigTx);
        const isPage = fileConfig.page ? true : false;
        const saveCoby = iAppFileMaker(JDS_(fileConfig));

        tree.children.push({ name: file , type:'file' , path:rootDir.toString() , ext:fileEx, fileData:saveCoby, page:isPage});
      
       
      }else{
        tree.children.push({ name: file , type:'file' , path:rootDir.toString() , ext:fileEx});
      }
   
    }

  }
  tree.type = "folder";
  return tree;
}

module.exports= getDirectoryTree