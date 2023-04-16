const fs = require('fs');
const path = require('path');

function getDirectoryTree(rootDir) {
  const stats = fs.statSync(rootDir);

  if (!stats.isDirectory()) {
    throw new Error(`"${rootDir}" is not a directory`);
  }

  const tree = {};

  tree.name = path.basename(rootDir);
  tree.children = [];

  const files = fs.readdirSync(rootDir);

  for (const file of files) {
    const filePath = path.join(rootDir, file);
   
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      tree.children.push(getDirectoryTree(filePath));
    } else  {
      
      tree.children.push({ name: file ,type:'file' ,path:rootDir.toString() });
    }
  }
  tree.type = "folder"
  return tree;
}

module.exports= getDirectoryTree