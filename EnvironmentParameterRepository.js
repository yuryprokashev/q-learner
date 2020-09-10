const RepositoryQueryBuilder = require("./RepositoryQueryBuilder");
const Time = require("./TimeHelper");

module.exports = EnvironmentParameterRepository;

function EnvironmentParameterRepository(db){
    const SELECT_ENV = "select id from environments where created >= ? and created <= ?"
    this.getByQuery = query =>{
        let createdFrom = query.createdFrom ? query.createdFrom : 0;
        let createdUntil = query.createdUntil ? query.createdUntil : Time.FAR_FUTURE;
        const envStatement = db.prepare(SELECT_ENV);
        const environmentIds = envStatement.all(createdFrom, createdUntil).map(record =>{
            return `'${record.id}'`;
        }).join(", ");
        const SELECT_MANY = `select * from parameters 
where environment_id in (${environmentIds})`;
        const parameterStatement = db.prepare(SELECT_MANY);
        return parameterStatement.all();
    };

    this.createQueryBuilder = ()=>{
        return new RepositoryQueryBuilder();
    };
}