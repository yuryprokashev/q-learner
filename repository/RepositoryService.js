const RepositoryBuilder = require("./Repository").Builder;
module.exports = RepositoryService;

function RepositoryService(gwConfig, gatewayService, factoryService){
    let _environmentRepository;
    this.getEnvironmentRepository = () =>{
        if(_environmentRepository) return _environmentRepository;
        let environmentFactory = factoryService.getEnvironmentFactory();
        let environmentViewReader = gatewayService.getSqlReader(gwConfig.environment.reader.definition);
        let sqlStatementFactory = factoryService.getSqlStatementFactory(gwConfig.environment.reader.mappings);
        _environmentRepository = new RepositoryBuilder()
            .setReader(environmentViewReader)
            .setEntityFactory(environmentFactory)
            .setGatewayRequestFactory(sqlStatementFactory)
            .build();
        return _environmentRepository;
    };
}