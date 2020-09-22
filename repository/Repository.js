const Validator = require("../basic/Validator");
module.exports.Builder = RepositoryBuilder;

/**
 *
 * @constructor
 */
function RepositoryBuilder(){
    let _entityFactory, _gatewayRequestFactory, _reader, _writer;
    this.setReader = reader =>{
        _reader = reader;
        return this;
    };
    this.setWriter = writer =>{
        _writer = writer;
        return this;
    };
    this.setEntityFactory = factory =>{
        _entityFactory = factory;
        return this;
    };
    this.setGatewayRequestFactory = factory =>{
        _gatewayRequestFactory = factory;
        return this;
    };
    this.build = ()=>{
        return new Repository(_reader,  _writer, _gatewayRequestFactory, _entityFactory);
    };
}

/**
 *
 * @param reader
 * @param writer
 * @param gatewayRequestFactory
 * @param entityFactory
 * @constructor
 */
function Repository(reader, writer, gatewayRequestFactory, entityFactory){
    this.getByQuery = criteria =>{
        Validator.isDefined("Table Reader", reader, "Read operation is not supported.");
        let where = gatewayRequestFactory.where(criteria);
        let records = reader.read(where);
        return entityFactory.fromRecords(records);
    };
    this.insert = criteria =>{
        Validator.isDefined("Table Writer", writer, "Insert operation is not supported.");
        let insert = gatewayRequestFactory.insert(criteria);
        writer.write(insert);
    };
}