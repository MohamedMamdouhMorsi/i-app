const fs = require('fs');
const path = require('path');
function base64ToImage(base64String) {
    // Extract the image data and mime type from the base64 string
    const matches = base64String.match(/^data:(.*?);base64,(.*)$/);
  
    if (!matches || matches.length !== 3) {
     return false;
    }
  
    const mimeType = matches[1];
    const base64Data = matches[2];
  
    // Create a buffer from the base64 data
    const buffer = Buffer.from(base64Data, 'base64');
  return buffer;

  }
const saveImage = async (appData,res,i_app_path,i_app)=>{
    const userDir = path.dirname(require.main.filename); 
    if(appData.name){
        const imgBody = appData.image;
       
   
        const imgName = appData.name+'.jpg';
        const userPublicDir  = path.join(userDir, 'public',i_app.dir.icon,imgName);
        const imageBuffer = base64ToImage(imgBody);
        fs.writeFile(userPublicDir, imageBuffer, (err) => {
            if (err){
              console.log(err);
            }else {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({ res: true }));
            }
          });
    
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ res: true }));
    }

  
}
module.exports = saveImage;