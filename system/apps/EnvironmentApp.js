const EnvironmentFactory = require("../factory/EnvironmentFactory");

module.exports = EnvironmentApp;
function EnvironmentApp(io){
    const BASE_SQL = "select p.id, e.id as parent_id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.parent_id";
    const CREATED_SQL = "where created >= ? and created <= ? order by created asc";
    const _envFactory = new EnvironmentFactory();
    this.getByCreatedDate = (start, end) =>{
        const db = io.getDatabase();
        const template = `${BASE_SQL} ${CREATED_SQL}`;
        const statement = db.prepare(template);
        const records = statement.all(start, end);
        return _envFactory.fromRecords(records);
    };
}