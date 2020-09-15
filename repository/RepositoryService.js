const SqlRepositoryBuilder = require("./Repository").SqlBuilder;
module.exports = RepositoryService;

function RepositoryService(dataSourceService, factoryService){
    const DB_FILE = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
    const ENVIRONMENT_SQL = "select p.id, e.id as environment_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.environment_id";
    const ENVIRONMENT_MAPPINGS = [
        ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
        ["environmentId", "environment_id"], ["parameterName", "name"],
        ["parameterValue", "value"]
    ];
    let _environmentRepository;
    this.getEnvironmentRepository = () =>{
        let db = dataSourceService.getDatabaseConnection(DB_FILE);
        let environmentFactory = factoryService.getEnvironmentFactory();
        if(!_environmentRepository) _environmentRepository = new SqlRepositoryBuilder()
            .setDbConnection(db)
            .setDefinition(ENVIRONMENT_SQL)
            .setFactory(environmentFactory)
            .setMappings(ENVIRONMENT_MAPPINGS)
            .build();
        return _environmentRepository;
    };
}