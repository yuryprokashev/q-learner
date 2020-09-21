const Database = require("better-sqlite3");
const Criterion = require("../model/Criterion");
const Criteria = require("../model/Criteria");
const FactoryService = require("../factory/FactoryService");
const DataSourceService = require("../data-source/DataSourceService");
const CsvTableGateway = require("../repository/CsvTableGateway");
const SqlRepositoryBuilder = require("../repository/Repository").SqlBuilder;

module.exports = TestEnvironment;
function TestEnvironment(){
    const ENVIRONMENT_SQL = "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id";
    const ENVIRONMENT_MAPPINGS = [
        ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
        ["parentId", "parent_id"], ["parameterName", "name"],
        ["parameterValue", "value"]
    ];
    const _factories = new FactoryService();
    const _dataSources = new DataSourceService();
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
    this.factoryService = _factories;
    const envFile = _dataSources.getFile("C:/Users/yuryp/WebstormProjects/q-learner/test/environment-records.csv");
    this.environmentRecordsGateway = new CsvTableGateway(envFile.getContent());
}