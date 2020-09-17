const OneToManyMap = require("../basic/OneToManyMap");
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
    this.create = useCaseRequest =>{
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
        let environments = _environmentRepository.getByQuery(query);
        let firstEnvironment = environments[0];
        let lastEnvironment = environments[environments.length - 1];
        let timebuckets = _timeBucketFactory.fromConfig({
            start: firstEnvironment.getCreatedAt(),
            end: lastEnvironment.getCreatedAt(),
            length: useCaseRequest.period,
            step: useCaseRequest.step || DEFAULT_STEP
        });

        timebuckets.forEach(bucket =>{
            environments.forEach(env =>{
                if(bucket.includes(env.getCreatedAt())) bucket.add(env);
            });
        });

        return new RewardCalculatorContext(environments, timebuckets);
    };
}

/**
 *
 * @constructor
 */
function RewardCalculatorContext(environments, timebuckets){
    this.getBuckets = () =>{
        return timebuckets;
    };
    this.getEnvironments = ()=>{
        return environments;
    };
}