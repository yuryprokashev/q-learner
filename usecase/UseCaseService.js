const UseCase = require("./UseCase");
const RewardCalculatorRequestFactory = require("./RewardCalculatorRequestFactory");
const RewardCalculatorContextFactory = require("./RewardCalculatorContextFactory");
const RewardCalculatorActionFactory = require("./RewardCalculatorActionFactory");

module.exports = UseCaseService;

/**
 *
 * @param repositoryService
 * @param factoryService
 * @constructor
 */
function UseCaseService(repositoryService, factoryService){
    this.getRewardCalculator = ()=>{
        const useCaseRequestFactory = new RewardCalculatorRequestFactory();
        const useCaseContextFactory = new RewardCalculatorContextFactory(repositoryService, factoryService);
        const useCaseActionFactory = new RewardCalculatorActionFactory(repositoryService, factoryService);
        return new UseCase(useCaseRequestFactory, useCaseContextFactory, useCaseActionFactory);
    };
}