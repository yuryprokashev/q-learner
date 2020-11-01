const EnvironmentFactory = require("../factory/EnvironmentFactory");

module.exports = EnvironmentApp;
function EnvironmentApp(io, sqlStatementApp, configApp){
    const DB_CONFIG = configApp.getDbConfig();
    const BASE_SQL = sqlStatementApp.getByName("environment-parameters-base");
    const CREATED_SQL = "where created >= ? and created <= ? order by created asc";
    const REF_DT = 60*1000; // 60 секунд.
    const REF_ENV_SQL = `${CREATED_SQL} limit 7`; // 7 параметров в одной environment
    const _envFactory = new EnvironmentFactory();
    this.getByCreatedDate = (start, end) =>{
        const db = io.getDatabase(DB_CONFIG);
        const template = `${BASE_SQL} ${CREATED_SQL}`;
        const statement = db.prepare(template);
        const records = statement.all(start, end);
        return _envFactory.fromRecords(records);
    };
    this.getReferenceEnvironment = (currentEnvironment, refDt) =>{
        const _refDt = refDt ? refDt : REF_DT;
        const db = io.getDatabase(DB_CONFIG);
        const template = `${BASE_SQL} ${REF_ENV_SQL}`;
        const statement = db.prepare(template);
        const start = currentEnvironment.getCreatedAt() - _refDt;
        const end = currentEnvironment.getCreatedAt();
        const records = statement.all(start, end);
        return _envFactory.fromRecords(records)[0];
    };
    this.getById = environmentId =>{
        const db = io.getDatabase(DB_CONFIG);
        const template = `${BASE_SQL} where p.parent_id = '${environmentId}'`;
        const statement = db.prepare(template);
        const records = statement.all();
        return _envFactory.fromRecords(records)[0];
    };
}