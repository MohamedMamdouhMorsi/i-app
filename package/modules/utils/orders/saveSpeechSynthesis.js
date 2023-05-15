const fs = require('fs');
const path = require('path');

const saveSpeechSynthesis = (body) => {
  const inputData = body.data;
  const dir = __dirname.replace(/orders/g, '');
  const filePath = path.join(dir, 'dataSet', 'dataSpeechSynthesis.json');

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log("error :", err);
      } else {
        const dataSet = JSON.parse(data);
        for (var i = 0; i < inputData.length; i++) {
          const dataName = inputData[i].name;
          var notExist = true;
          for (var x = 0; x < dataSet.length; x++) {
            const dataSetName = dataSet[x];
            if (dataSetName.name == dataName) {
              notExist = false;
            }
          }
          if (notExist) {
            dataSet.push(inputData[i]);
          }
        }
        fs.writeFileSync(filePath, JSON.stringify(dataSet, null, 2));
      }
    });
  } else {
    fs.writeFileSync(filePath, JSON.stringify(inputData, null, 2));
  }
};

module.exports = saveSpeechSynthesis;
