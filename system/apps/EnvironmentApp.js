const EnvironmentFactory = require("../factory/EnvironmentFactory");

module.exports = EnvironmentApp;
function EnvironmentApp(io){
    const BASE_SQL = "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id";
    const CREATED_SQL = "where created >= ? and created <= ? order by created asc";
    const REF_DT = 60*1000; // 60 секунд.
    const REF_ENV_SQL = `${CREATED_SQL} limit 1`;
    const _envFactory = new EnvironmentFactory();
    this.getByCreatedDate = (start, end) =>{
        const db = io.getDatabase();
        const template = `${BASE_SQL} ${CREATED_SQL}`;
        const statement = db.prepare(template);
        const records = statement.all(start, end);
        return _envFactory.fromRecords(records);
    };
    this.getReferenceEnvironment = (currentEnvironment, refDt) =>{
        const _refDt = refDt ? refDt : REF_DT;
        const db = io.getDatabase();
        const template = `${BASE_SQL} ${REF_ENV_SQL}`;
        const statement = db.prepare(template);
        const start = currentEnvironment.getCreatedAt() - _refDt;
        const end = currentEnvironment.getCreatedAt();
        const records = statement.all(start, end);
        return _envFactory.fromRecords(records)[0];
    };
    this.getById = environmentId =>{
        const db = io.getDatabase();
        const template = `${BASE_SQL} where p.parent_id = '${environmentId}'`;
        const statement = db.prepare(template);
        const records = statement.all();
        return _envFactory.fromRecords(records)[0];
    };
}