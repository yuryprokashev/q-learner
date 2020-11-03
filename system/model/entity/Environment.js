const ParameterGroup = require("./ParameterGroup");
module.exports.Builder = EnvironmentBuilder;
module.exports.Constructor = Environment;

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
        _createdAt = parseInt(number);
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
        const paramGroup = new ParameterGroup(_params);
        return new Environment(_id, _createdAt, _symbol, paramGroup);
    };
}

/**
 *
 * @param id
 * @param created
 * @param symbol
 * @param parameterGroup
 * @constructor
 */
function Environment(id, created, symbol, parameterGroup){
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
        return parameterGroup.all();
    };
    this.getParameter = name =>{
        return parameterGroup.get(name);
    };
}