const Database = require("better-sqlite3");
const Criterion = require("../model/Criterion");
const Criteria = require("../model/Criteria");
const FactoryService = require("../factory/FactoryService");
const SqlRepositoryBuilder = require("../repository/Repository").SqlBuilder;

module.exports = TestEnvironment;
function TestEnvironment(){
    const ENVIRONMENT_SQL = "select p.id, e.id as environment_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.environment_id";
    const ENVIRONMENT_MAPPINGS = [
        ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
        ["environmentId", "environment_id"], ["parameterName", "name"],
        ["parameterValue", "value"]
    ];
    const _factories = new FactoryService();
    this.CriterionBuilder = Criterion.Builder;
    this.CriteriaBuilder = Criteria.Builder;
    this.db = new Database("C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite",
        {verbose: console.log});
    this.environmentRepository = new SqlRepositoryBuilder()
        .setDbConnection(this.db)
        .setDefinition(ENVIRONMENT_SQL)
        .setFactory(_factories.getEnvironmentFactory())
        .setMappings(ENVIRONMENT_MAPPINGS)
        .build()
}