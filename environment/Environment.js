module.exports.Builder = EnvironmentBuilder;
module.exports.Parameter = Parameter;

/**
 *
 * @constructor
 */
function EnvironmentBuilder(){
    let _id, _createdAt, _symbol;
    let _params = [];
    this.setId = str =>{
        _id = str;
        return this;
    };
    this.setCreatedAt = number =>{
        _createdAt = number;
        return this;
    };
    this.setSymbol = str =>{
        _symbol = str;
        return this;
    };
    this.addParameter = parameter =>{
        _params.push(parameter);
        return this;
    }
    this.build = ()=>{
        return new Environment(_id, _createdAt, _symbol, _params);
    };
}

/**
 *
 * @param id
 * @param created
 * @param symbol
 * @param params
 * @constructor
 */
function Environment(id, created, symbol, params){
    let paramMap = new Map();
    params.forEach(p=>{
        paramMap.set(p.getName(), p);
    })
    this.getId = ()=>{
        return id;
    };
    this.getCreatedAt = ()=>{
        return created;
    };
    this.getSymbol = ()=>{
        return symbol;
    };
    this.getParameters = ()=>{
        return params;
    };
    this.getParameter = name =>{
        return paramMap.get(name);
    };
}

/**
 *
 * @param id
 * @param name
 * @param value
 * @constructor
 */
function Parameter(id, name, value){
    this.getId = ()=>{
        return id;
    };
    this.getName = ()=>{
        return name;
    };
    this.getValue = ()=>{
        return value;
    };
}