const UseCaseResponseBuilder = require("UseCaseResponse").Builder;
module.exports = RewardCalculator;

/**
 *
 * @param useCaseRequestFactory
 * @param useCaseContextFactory
 * @constructor
 */
function RewardCalculator(useCaseRequestFactory, useCaseContextFactory){
    this.execute = userRequest =>{
        let rewardCalculatorRequest = useCaseRequestFactory.create(userRequest);
        let rewardCalculatorContext = useCaseContextFactory.create(rewardCalculatorRequest);

    };
}