const EnvironmentParameterRepository = require("./EnvironmentParameterRepository");
const EnvironmentRepository = require("./EnvironmentRepository");
module.exports = RepositoryService;

function RepositoryService(dataSourceService){
    const _dbFileName = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
    let _environmentRepository;
    let _parameterRepository;
    this.getEnvironmentRepository = () =>{
        let db = dataSourceService.getDatabaseConnection(_dbFileName);
        if(!_environmentRepository) _environmentRepository = new EnvironmentRepository(db);
        return _environmentRepository;
    };
    this.getParameterRepository = () =>{
        let db = dataSourceService.getDatabaseConnection(_dbFileName);
        if(!_parameterRepository) _parameterRepository = new EnvironmentParameterRepository(db);
        return _parameterRepository;
    };
}