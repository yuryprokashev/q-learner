const TimeBucketFactory = require("./factory/TimeBucketFactory");
const VirtualOrderDTOFactory = require("./factory/VirtualOrderDTOFactory");
const EnvironmentApp = require("./apps/EnvironmentApp");
const VirtualOrderFactory = require("./factory/VirtualOrderFactory");
const ConfigurationApp = require("./apps/ConfigurationApp");
const Io = require("./io/io");
const VirtualOrderApp = require("./apps/VirtualOrderApp");

module.exports = QLearnerFacade;
function QLearnerFacade(env){
    const _io = new Io();

    const _configApp = new ConfigurationApp(env);

    const _sqlStatementApp = new SqlStatementApp(_io, _configApp);

    const _environmentApp = new EnvironmentApp(_io, _sqlStatementApp, _configApp);
    const _voApp = new VirtualOrderApp(_io, _sqlStatementApp, _configApp);
    const _experienceApp = new ExperienceApp(_io);

    const _voFactory = new VirtualOrderFactory();
    const _timeBucketFactory = new TimeBucketFactory();
    const _voDTOFactory = new VirtualOrderDTOFactory();
    const DEFAULT_STEP = 1000;
    /**
     *
     * @param createOrdersRequest{CreateVirtualOrdersRequest}
     * @returns {VirtualOrderDTO[]}
     */
    this.createVirtualOrders = (createOrdersRequest) =>{
        const envs = _environmentApp.getByCreatedDate(createOrdersRequest.start, createOrdersRequest.end);
        const firstEnvironment = envs[0];
        const lastEnvironment = envs[envs.length - 1];
        const tBucketJob = {
            start: firstEnvironment.getCreatedAt(),
            end: lastEnvironment.getCreatedAt(),
            length: createOrdersRequest.period,
            step: createOrdersRequest.step || DEFAULT_STEP
        };
        const tBuckets = _timeBucketFactory.fromConfig(tBucketJob);
        tBuckets.forEach(bucket =>{
            envs.forEach(env =>{
                if(bucket.includes(env.getCreatedAt())) bucket.add(env);
            });
        });
        return tBuckets.map(bucket =>{
            return _voFactory.fromTimeBucket(bucket, createOrdersRequest.executionDelay);
        }).map(vOrder =>{
            return _voDTOFactory.create(vOrder);
        });
    };
    /**
     *
     * @param virtualOrders{VirtualOrderDTO[]}
     */
    this.saveVirtualOrders = virtualOrders =>{
        return _voApp.save(virtualOrders);
    };
}