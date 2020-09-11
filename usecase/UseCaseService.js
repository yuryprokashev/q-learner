module.exports = UseCaseService;
const RewardCalculatorRequestFactory = require("../RewardCalculatorRequestFactory");
const RewardCalculator = require("../RewardCalculator");
const RewardCalculatorContextFactory = require("../RewardCalculatorContextFactory");

function UseCaseService(repositoryService){
    this.getRewardCalculator = ()=>{
        const environmentRepository = repositoryService.getEnvironmentRepository();
        const parameterRepository = repositoryService.getParameterRepository();
        const useCaseRequestFactory = new RewardCalculatorRequestFactory();
        const useCaseContextFactory = new RewardCalculatorContextFactory(environmentRepository, parameterRepository);
        return new RewardCalculator(useCaseRequestFactory, useCaseContextFactory);
    };
}