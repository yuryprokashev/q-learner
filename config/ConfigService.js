module.exports = ConfigService;

function ConfigService(env){
    let config;
    if(env === "prod") config = new ProdConfiguration();
    if(env === "test") config = new TestConfiguration();
    this.dataSource = ()=>{
        return config.ds;
    };
    this.gateway = ()=>{
        return config.gw;
    };
}

function ProdConfiguration(){
    this.ds = {
        db: new DatabaseConfiguration("C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite", false)
    };
    this.gw = new GatewayConfiguration();
}

function TestConfiguration(){
    this.ds = {
        db: new DatabaseConfiguration("C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite", true),
        envRecordsCsv: "C:/Users/yuryp/WebstormProjects/q-learner/test/environment-records.csv"

    };
    this.gw = new GatewayConfiguration();
}

function GatewayConfiguration(){
    this.environment = {
        reader: {
            definition: "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id",
            mappings: [
                ["id", "id"], ["symbol", "symbol"], ["createdAt", "created"],
                ["parentId", "parent_id"], ["parameterName", "name"],
                ["parameterValue", "value"]
            ]
        }
    };
}
function RepositoryConfiguration(){
    this.environment = {

    };
}
function DatabaseConfiguration(fileName, isVerbose){
    this.file = fileName;
    this.verbose = isVerbose;
}