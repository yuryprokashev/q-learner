const EnvironmentFactory = require("./EnvironmentFactory");
const TimeBucketFactory = require("./TimeBucketFactory");
module.exports = FactoryService;
function FactoryService(){
    let _environmentFactory, _timeBucketFactory;
    this.getEnvironmentFactory = ()=>{
        if(!_environmentFactory) _environmentFactory = new EnvironmentFactory();
        return _environmentFactory;
    };
    this.getTimeBucketFactory = ()=>{
        if(!_timeBucketFactory) _timeBucketFactory = new TimeBucketFactory();
        return _timeBucketFactory;
    };
}