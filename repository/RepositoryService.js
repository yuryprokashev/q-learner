const RepositoryBuilder = require("./Repository").Builder;
module.exports = RepositoryService;

function RepositoryService(gatewayService, factoryService){

    let _environmentRepository;
    this.getEnvironmentRepository = () =>{
        if(_environmentRepository) return _environmentRepository;
        const ENVIRONMENT_MAPPINGS = [
            ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
            ["parentId", "parent_id"], ["parameterName", "name"],
            ["parameterValue", "value"]
        ];
        let environmentFactory = factoryService.getEnvironmentFactory();
        let environmentViewReader = gatewayService.getEnvironmentReader();
        let sqlStatementFactory = factoryService.getSqlStatementFactory(ENVIRONMENT_MAPPINGS);
        _environmentRepository = new RepositoryBuilder()
            .setReader(environmentViewReader)
            .setEntityFactory(environmentFactory)
            .setGatewayRequestFactory(sqlStatementFactory)
            .build();
        return _environmentRepository;
    };
}