const fs = require('fs');
const path = require('path');

const icons =(res)=>{
    var dir = __dirname.replace(/orders/g, '');
    dir = dir.replace(/utils/g, '');
    dir = dir.replace(/modules/g, '');
    const filePath = path.join(dir, 'db', 'icons.json');
   
    res.writeHead(200, { 'Content-Type': 'application/json'});
  
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log("error :", err);
        } else {
          const dataSet = JSON.parse(data);
          res.end(JSON.stringify({ res: dataSet}));
        
        }
      });
    } 
   
}

module.exports = icons