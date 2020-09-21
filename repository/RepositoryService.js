const SqlRepositoryBuilder = require("./Repository").SqlBuilder;
module.exports = RepositoryService;

function RepositoryService(dataSourceService, factoryService){
    const DB_FILE = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
    const ENVIRONMENT_SQL = "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id";
    const ENVIRONMENT_MAPPINGS = [
        ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
        ["parentId", "parent_id"], ["parameterName", "name"],
        ["parameterValue", "value"]
    ];
    let _environmentRepository;
    this.getEnvironmentRepository = () =>{
        if(_environmentRepository) return _environmentRepository;
        let db = dataSourceService.getDatabaseConnection(DB_FILE);
        let environmentFactory = factoryService.getEnvironmentFactory();
        _environmentRepository = new SqlRepositoryBuilder()
            .setDbConnection(db)
            .setDefinition(ENVIRONMENT_SQL)
            .setFactory(environmentFactory)
            .setMappings(ENVIRONMENT_MAPPINGS)
            .build();
        return _environmentRepository;
    };
}