const readAppData = require('./modules/setup/readAppData');
const makeAppServer = require('./modules/setup/makeAppServer');
const Iapp= async()=>{
  readAppData(makeAppServer);
}
module.exports = Iapp