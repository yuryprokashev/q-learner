module.exports = RepositoryQueryBuilder;
/**
 *
 * @constructor
 */
function RepositoryQueryBuilder(){
    let _query = {};
    this.setCreatedFrom = number =>{
        _query.createdFrom = number;
        return this;
    };
    this.setCreatedUntil = number =>{
        _query.createdUntil = number;
        return this;
    }
    this.build = ()=>{
        return _query;
    };
}