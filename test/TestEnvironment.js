const Database = require("better-sqlite3");
const EnvironmentRepository = require("../repository/EnvironmentRepository");
const EnvironmentParameterRepository = require("../repository/EnvironmentParameterRepository");

module.exports = TestEnvironment;
function TestEnvironment(){
    this.db = new Database("C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite",
        {verbose: console.log});
    this.environmentRepository = new EnvironmentRepository(this.db);
    this.parameterRepository = new EnvironmentParameterRepository(this.db);
}