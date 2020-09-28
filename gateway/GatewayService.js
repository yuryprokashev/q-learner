const SqlTableReader = require("./SqlTableReader");
module.exports = GatewayService;
function GatewayService(dsConfig, dataSourceService){
    const _db = dataSourceService.getDatabaseConnection(dsConfig.db.file, dsConfig.db.verbose);
    this.getSqlReader = definition =>{
        return new SqlTableReader(_db, definition);
    };
}