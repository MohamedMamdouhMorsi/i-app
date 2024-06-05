//module is
const readAppData = require('./modules/setup/readAppData');
const makeAppServer = require('./modules/setup/makeAppServer');
const router = require('./modules/utils/router/router');
const routerData = require('./modules/utils/router/routerData');
const routerPost = require('./modules/utils/router/routerPost');
const mysqlConnect = require('./modules/utils/query/mysqlConnect');
const appData = {};
const Iapp   ={ 
    async start(){this.server = await readAppData(makeAppServer,appData);},
            get(url, callback,data){return router.get(url, callback,data)},
            post(url, callback,data){return routerPost.post(url, callback,data)},
            db(query,callBack){return mysqlConnect(query, false, callBack)},
            stop(){this.server.close(); },
            set(key,data){
               routerData.set(key,data);
            }

}
module.exports = Iapp