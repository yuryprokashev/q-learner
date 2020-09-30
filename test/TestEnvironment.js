const Criterion = require("../model/Criterion");
const Criteria = require("../model/Criteria");
const FactoryService = require("../factory/FactoryService");
const DataSourceService = require("../data-source/DataSourceService");
const CsvTableGateway = require("../gateway/CsvTableGateway");
const GatewayService = require("../gateway/GatewayService");
const ConfigService = require("../config/ConfigService");
const RepositoryService = require("../repository/RepositoryService");
const SqlTableWriter = require("../gateway/SqlTableWriter");

module.exports = TestEnvironment;
function TestEnvironment(){
    const _configService = new ConfigService("test");
    const _dataSources = new DataSourceService();
    const _factories = new FactoryService();
    const _gateways = new GatewayService(_configService.dataSource(), _dataSources);
    const _repositories = new RepositoryService(_configService.gateway(), _gateways, _factories);
    this.CriterionBuilder = Criterion.Builder;
    this.CriteriaBuilder = Criteria.Builder;
    this.db = _dataSources.getDatabaseConnection(_configService.dataSource().db.file, _configService.dataSource().db.verbose);
    this.environmentRepository = _repositories.getEnvironmentRepository();
    this.factoryService = _factories;
    const envFile = _dataSources.getFile(_configService.dataSource().envRecordsCsv);
    this.environmentRecordsGateway = new CsvTableGateway(envFile.getContent());
    this.sqlWriter = new SqlTableWriter(this.db, "tests");
}