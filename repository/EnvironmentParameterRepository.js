const RepositoryQueryBuilder = require("./RepositoryQueryBuilder");
const Time = require("../basic/TimeHelper");

module.exports = EnvironmentParameterRepository;

function EnvironmentParameterRepository(db){
    const SELECT_MANY = `select * from parameters where environment_id in (select id from environments where created >= ? and created <= ?)`;
    this.getByQuery = query =>{
        let createdFrom = query.createdFrom ? query.createdFrom : 0;
        let createdUntil = query.createdUntil ? query.createdUntil : Time.FAR_FUTURE;

        const parameterStatement = db.prepare(SELECT_MANY);
        return parameterStatement.all(createdFrom, createdUntil);
    };

    this.createQueryBuilder = ()=>{
        return new RepositoryQueryBuilder();
    };
}