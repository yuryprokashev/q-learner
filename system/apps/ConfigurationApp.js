module.exports = ConfigurationApp;
function ConfigurationApp(envName){
    const DB_FILE_PATH = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
    const SQL_STATEMENT_ROOT = "C:/Users/yuryp/WebstormProjects/q-learner/system/sql/";
    this.getDbConfig = ()=>{
        if(envName === "test") return new DatabaseConfiguration(DB_FILE_PATH, true);
        if(envName === "prod") return new DatabaseConfiguration(DB_FILE_PATH, false);
    };
    this.getSqlStatementRootPath = ()=>{
        return SQL_STATEMENT_ROOT;
    };
}
function DatabaseConfiguration(fileName, isVerbose){
    this.filePath = fileName;
    this.isVerbose = isVerbose;
}
