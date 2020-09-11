module.exports = RewardCalculatorContextFactory;

/**
 *
 * @constructor
 */
function RewardCalculatorContextFactory(environmentRepository, parameterRepository){
    this.create = useCaseRequest =>{
        let query = parameterRepository.createQueryBuilder()
            .setCreatedFrom(useCaseRequest.getStart())
            .setCreatedUntil(useCaseRequest.getEnd())
            .build();
        let parameters = parameterRepository.getByQuery(query);
        return new RewardCalculatorContext(parameters);
    };
}

/**
 *
 * @constructor
 */
function RewardCalculatorContext(parameters){
    this.getParameters = () =>{
        return parameters;
    };
}