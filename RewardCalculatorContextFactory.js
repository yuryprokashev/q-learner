module.exports = RewardCalculatorContextFactory;

/**
 *
 * @constructor
 */
function RewardCalculatorContextFactory(environmentRepository){
    this.create = useCaseRequest =>{
        let query = environmentRepository.createQueryBuilder()
            .setCreatedFrom()
            .setCreatedUntil()
            .build();
        let environments = environmentRepository.getByQuery(query);
        return new RewardCalculatorContext(useCaseRequest, environments);
    };
}

/**
 *
 * @constructor
 */
function RewardCalculatorContext(useCaseRequest, environments){
    this.getRequest = ()=>{
        return useCaseRequest;
    };
    this.getEnvironments = ()=>{
        return environments;
    };
}