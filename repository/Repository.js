const SqlTableGateway = require("./SqlTableGateway");
module.exports.SqlBuilder = SqlRepositoryBuilder;

/**
 *
 * @constructor
 */
function SqlRepositoryBuilder(){
    let _db;
    let _sqlDefinition, _entityFactory;
    let _mappings = [];
    this.setDbConnection = db =>{
        _db = db;
        return this;
    };
    this.setDefinition = str =>{
        _sqlDefinition = str;
        return this;
    };
    this.addMapping = (strFrom, strTo)=>{
        _mappings.push([strFrom, strTo]);
        return this;
    };
    this.setMappings = mappings =>{
        _mappings = mappings;
        return this;
    };
    this.setFactory = factory =>{
        _entityFactory = factory;
        return this;
    };
    this.build = ()=>{
        return new SqlRepository(_db, _sqlDefinition, _mappings, _entityFactory);
    };
}

/**
 *
 * @param db
 * @param definition
 * @param mappings
 * @param factory
 * @constructor
 */
function SqlRepository(db, definition, mappings, factory){
    const _tableGateway = new SqlTableGateway(db, definition);
    this.getByQuery = criteria =>{
        let sql = criteria.asSql(mappings);
        let records = _tableGateway.read(sql);
        return factory.fromRecords(records);
    };
}