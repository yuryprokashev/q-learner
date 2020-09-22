const SqlTableReader = require("./SqlTableReader");
module.exports = GatewayService;
function GatewayService(dataSourceService){
    const DB_FILE = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
    const ENVIRONMENT_SQL = "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id";
    let _environmentViewReader;
    this.getEnvironmentReader = ()=>{
        if(!_environmentViewReader){
            let db = dataSourceService.getDatabaseConnection(DB_FILE);
            _environmentViewReader = new SqlTableReader(db, ENVIRONMENT_SQL);
        }
        return _environmentViewReader;
    };
    this.getVirtualOrderWriter = ()=>{

    };
    this.getParameterWriter = ()=>{

    };
}