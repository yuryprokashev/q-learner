module.exports = EnvironmentFromRecordFactory;

function EnvironmentFromRecordFactory(){
    this.createMany = dbRecords =>{

    };
    this.createOne = dbRecord =>{

    };
}

/**
 *
 * @param id
 * @param symbol
 * @param created
 * @param params
 * @constructor
 */
function Environment(id, symbol, created, params){
    this.getId = ()=>{
        return id;
    };
    this.getSymbol = ()=>{
        return symbol;
    };
    this.getCreated = ()=>{
        return created;
    };
    this.getParameters = ()=>{
        return params.map(p =>{
            return new EnvironmentParameter(p.id, id, p.name, p.value);
        })
    };
}

/**
 *
 * @param id
 * @param environmentId
 * @param name
 * @param value
 * @constructor
 */
function EnvironmentParameter(id, environmentId, name, value){
    this.getId = ()=>{
        return id;
    };
    this.getName = ()=>{
        return name;
    };
    this.getValue = ()=>{
        return value;
    };
    this.getEnvironmentId = ()=>{
        return environmentId;
    };
}