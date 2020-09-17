module.exports = UseCaseService;
const RewardCalculatorRequestFactory = require("./RewardCalculatorRequestFactory");
const RewardCalculator = require("./RewardCalculator");
const RewardCalculatorContextFactory = require("./RewardCalculatorContextFactory");

function UseCaseService(repositoryService, factoryService){
    this.getRewardCalculator = ()=>{
        const useCaseRequestFactory = new RewardCalculatorRequestFactory();
        const useCaseContextFactory = new RewardCalculatorContextFactory(repositoryService, factoryService);
        return new RewardCalculator(useCaseRequestFactory, useCaseContextFactory);
    };
}