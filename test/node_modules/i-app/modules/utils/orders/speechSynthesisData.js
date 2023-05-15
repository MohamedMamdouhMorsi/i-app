const fs = require('fs');
const path = require('path');
const saveSpeechSynthesis = require('./saveSpeechSynthesis');
const speechSynthesisData = (body,res) => {
    console.log("speechSynthesisData")
  const inputData = body.data;
  const dir = __dirname.replace(/orders/g, '');
  const filePath = path.join(dir, 'dataSet', 'voicesDB.json');
  res.writeHead(200, { 'Content-Type': 'application/json'});
  
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log("error :", err);
      } else {
        const dataSet = JSON.parse(data);
        console.log(["dataSet",dataSet.length])
        const newVoices = [];
        const back = [];
        for (var i = 0; i < inputData.length; i++) {
          const dataName = inputData[i].name;
          var notExist = true;
          for (var x = 0; x < dataSet.length; x++) {
            const dataSetName = dataSet[x];
            if (dataSetName.name === dataName) {
              notExist = false;
              back.push(dataSet[x]);
            }
          }
          if (notExist) {
            newVoices.push(inputData[i]);
          }
        }
        res.end(JSON.stringify({ res: back}));
        if(newVoices.length > 0){
          //  saveSpeechSynthesis(newVoices);
        }
      }
    });
  } 
};

module.exports = speechSynthesisData;
