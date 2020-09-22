const EnvironmentFactory = require("./EnvironmentFactory");
const TimeBucketFactory = require("./TimeBucketFactory");
const VirtualOrderFactory = require("./VirtualOrderFactory");
const SqlStatementFactory = require("./SqlStatementFactory");
module.exports = FactoryService;
function FactoryService(){
    let _environmentFactory, _timeBucketFactory, _vOrderFactory;
    this.getEnvironmentFactory = ()=>{
        if(!_environmentFactory) _environmentFactory = new EnvironmentFactory();
        return _environmentFactory;
    };
    this.getTimeBucketFactory = ()=>{
        if(!_timeBucketFactory) _timeBucketFactory = new TimeBucketFactory();
        return _timeBucketFactory;
    };
    this.getVirtualOrderFactory = ()=>{
        if(!_vOrderFactory) _vOrderFactory = new VirtualOrderFactory();
        return _vOrderFactory;
    };
    this.getSqlStatementFactory = mappings=>{
        return new SqlStatementFactory(mappings);
    };
}