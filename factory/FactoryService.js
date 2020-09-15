const EnvironmentFactory = require("./EnvironmentFactory");
module.exports = FactoryService;
function FactoryService(){
    let _environmentFactory;
    this.getEnvironmentFactory = ()=>{
        if(!_environmentFactory) _environmentFactory = new EnvironmentFactory();
        return _environmentFactory;
    };
}