const RepositoryQueryBuilder = require("./RepositoryQueryBuilder");
const Time = require("./TimeHelper");

module.exports = EnvironmentRepository;

/**
 *
 * @constructor
 */
function EnvironmentRepository(db){
    const SELECT_MANY = "select * from environments where created >= ? and created <= ?";
    this.getByQuery = query =>{
        const environmentStatement = db.prepare(SELECT_MANY);
        let createdFrom = query.createdFrom ? query.createdFrom : 0;
        let createdUntil = query.createdUntil ? query.createdUntil : Time.FAR_FUTURE;
        return environmentStatement.all(createdFrom, createdUntil);
    };
    this.createQueryBuilder = ()=>{
        return new RepositoryQueryBuilder();
    };
}


