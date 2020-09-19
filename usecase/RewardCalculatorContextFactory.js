const CriterionBuilder = require("../model/Criterion").Builder;
const CriteriaBuilder = require("../model/Criteria").Builder;

module.exports = RewardCalculatorContextFactory;

/**
 *
 * @constructor
 */
function RewardCalculatorContextFactory(repositoryService, factoryService){
    const DEFAULT_STEP = 1000;
    const _environmentRepository = repositoryService.getEnvironmentRepository();
    const _timeBucketFactory = factoryService.getTimeBucketFactory();
    const _voFactory = factoryService.getVirtualOrderFactory();
    this.create = useCaseRequest =>{
        let logs = [];
        let createdFromCriterion = new CriterionBuilder()
            .setFieldName("createdAt")
            .gte()
            .setExpectedValue(useCaseRequest.start)
            .build();
        let createdUntilCriterion = new CriterionBuilder()
            .setExpectedValue(useCaseRequest.end)
            .lte()
            .setFieldName("createdAt")
            .build();
        let query = new CriteriaBuilder(createdFromCriterion).and(createdUntilCriterion).build();
        let envs = _environmentRepository.getByQuery(query);
        logs.push(`Environments read: ${envs.length}`);
        let firstEnvironment = envs[0];
        let lastEnvironment = envs[envs.length - 1];
        let tBucketJob = {
            start: firstEnvironment.getCreatedAt(),
            end: lastEnvironment.getCreatedAt(),
            length: useCaseRequest.period,
            step: useCaseRequest.step || DEFAULT_STEP
        };
        logs.push(`Time Buckets Job Config: ${JSON.stringify(tBucketJob)}`);
        let tBuckets = _timeBucketFactory.fromConfig(tBucketJob);
        logs.push(`Time Buckets created: ${tBuckets.length}`);
        tBuckets.forEach(bucket =>{
            envs.forEach(env =>{
                if(bucket.includes(env.getCreatedAt())) bucket.add(env);
            });
        });

        const vOrders = tBuckets.map(bucket =>{
            return _voFactory.fromTimeBucket(bucket);
        })
        logs.push(`Virtual Orders Created ${vOrders.length}`);
        logs.push("Reward Calculator Context is built");
        return new RewardCalculatorContext(envs, tBuckets, vOrders, logs);
    };
}

/**
 *
 * @constructor
 */
function RewardCalculatorContext(environments, timeBuckets, vOrders, logs){
    this.getBuckets = () =>{
        return timeBuckets;
    };
    this.getEnvironments = ()=>{
        return environments;
    };
    this.getVirtualOrders = ()=>{
        return vOrders;
    };
    this.getLogs = ()=>{
        return logs;
    };
}