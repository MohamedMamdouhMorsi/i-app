
const routerData = {
    routes: {},
    set(key,data) {
      this.routes[key]= data;
    },
    get() {
        const last = this.routes;
        this.routes = {};
        return last;
    }
  };
  
  module.exports = routerData;