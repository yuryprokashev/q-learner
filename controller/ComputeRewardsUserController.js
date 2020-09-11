const DataSourceService = require("../data-source/DataSourceService");
const RepositoryService = require("../repository/RepositoryService");
const ComputeRewardsUserRequest = require("./ComputeRewardUserRequest");
const UseCaseService = require("../usecase/UseCaseService");
const ResponderService = require("../responder/ResponderService");

module.exports = ComputeRewardsUserController;
function ComputeRewardsUserController(){
    const _dataSources = new DataSourceService();
    const _repositories = new RepositoryService(_dataSources);
    const _useCases = new UseCaseService(_repositories);
    const _responders = new ResponderService();
    this.onUserRequest = ()=>{
        const useCase = _useCases.getRewardCalculator();
        const responder = _responders.getConsoleResponder(useCase);

        const userRequest = new ComputeRewardsUserRequest("2020-01-02", 0, 10, "buy");
        responder.respond(userRequest);
    };
}