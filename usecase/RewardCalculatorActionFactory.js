const ActionResponseBuilder = require("./UseCaseActionResponse").Builder;
module.exports = RewardCalculatorActionFactory;

/**
 *
 * @constructor
 */
function RewardCalculatorActionFactory(repositoryService, factoryService){
    this.create = rewardCalculatorContext =>{
        return new RewardCalculatorAction(repositoryService, factoryService, rewardCalculatorContext);
    };
}

/**
 *
 * @param repositoryService
 * @param factoryService
 * @param ctx
 * @constructor
 */
function RewardCalculatorAction(repositoryService, factoryService, ctx){
    this.execute = rewardCalculatorRequest =>{
        return new ActionResponseBuilder()
            .setData({result: true})
            .addLog("Reward calculation done.")
            .build();
    };
}