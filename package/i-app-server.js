//module is
const readAppData = require('./modules/setup/readAppData');
const makeAppServer = require('./modules/setup/makeAppServer');
const router = require('./modules/utils/router/router');

const Iapp   ={ 
    async start(){ await readAppData(makeAppServer)},
            get(url, callback,data){return router.get(url, callback,data)}

}
module.exports = Iapp