const OneToManyMap = require("../basic/OneToManyMap");
const UseCaseResponseBuilder = require("usecase/UseCaseResponse").Builder;
module.exports = RewardCalculator;

/**
 *
 * @param useCaseRequestFactory
 * @param useCaseContextFactory
 * @constructor
 */
function RewardCalculator(useCaseRequestFactory, useCaseContextFactory){
    this.execute = userRequest =>{
        let responseBuilder = new UseCaseResponseBuilder(userRequest);
        if(userRequest.debug) responseBuilder.addLog(`User Request ${JSON.stringify(userRequest)}`);
        try {
            let rewardCalculatorRequest = useCaseRequestFactory.create(userRequest);
            if(userRequest.debug) responseBuilder.addLog(`Use Case Request: ${JSON.stringify(rewardCalculatorRequest)}`);
            let rewardCalculatorContext = useCaseContextFactory.create(rewardCalculatorRequest);
            if(userRequest.debug) responseBuilder.addLog("Use Case Context is built");

            let paramGroups = new OneToManyMap();
            rewardCalculatorContext.getParameters().reduce((acc, p)=>{

                return acc;
            }, paramGroups);
        } catch (err){

        }
        return responseBuilder.build();
    };
}