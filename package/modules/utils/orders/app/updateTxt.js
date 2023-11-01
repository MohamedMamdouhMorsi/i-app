const {JDS_,JD_} = require('../../../tools');
const readAndUpdate = require('../../toolsFN/readAndUpdate');
const getDirectoryTree = require('../../toolsFN/getDirectoryTree');

const fs = require('fs');
const path = require('path');
const copyFolder = async(sourceFolder, destinationFolder)=>{
    // Ensure the source folder exists
    if (!fs.existsSync(sourceFolder)) {
      console.error(`Source folder '${sourceFolder}' does not exist.`);
      return;
    }
  
    // Create the destination folder if it doesn't exist
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
  
    // Read the contents of the source folder
    const files = fs.readdirSync(sourceFolder);
  
    // Copy each file from the source to the destination
    files.forEach((file) => {
      const sourceFilePath = path.join(sourceFolder, file);
      const destinationFilePath = path.join(destinationFolder, file);
  
      // Check if it's a file or a directory
      if (fs.statSync(sourceFilePath).isDirectory()) {
        // Recursively copy subdirectories
        copyFolder(sourceFilePath, destinationFilePath);
      } else {
        // Copy the file
        fs.copyFileSync(sourceFilePath, destinationFilePath);
      }
    });
  }
const updateTxt = async (appData,res,i_app_path,i_app)=>{

    const userDir           = path.dirname(require.main.filename); 
    const i_app_file_dir    = path.join(userDir, 'i.app');
    const i_app_src         = path.join(userDir, '/public/', i_app.dir.src);
    const i_app_src_temp    = path.join(userDir, '/public/', 'temp');
    let   found             = false;
    const lang              = i_app.defLang ? i_app.defLang : i_app.lang[0];
    const i_app_langDir     = path.join(userDir, '/public/', i_app.dir.txt,`${lang}.json`);
    const langData          = await fs.readFileSync(i_app_langDir, 'utf8');
    const langDataJ         = JD_(langData);
    const tree              = await getDirectoryTree(i_app_src);
    await copyFolder(i_app_src,i_app_src_temp);
        if(tree.children.length > 0){
           readAndUpdate(tree.children,langDataJ,i_app_langDir,res);
        }else{

            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JDS_({ res: false }));
        }
}
module.exports = updateTxt;