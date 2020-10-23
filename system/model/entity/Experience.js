module.exports = Experience;

/**
 *
 * @param id
 * @param currentEnvironment{Environment}
 * @param referenceEnvironment{Environment}
 * @param parameters{Parameter[]}
 * @param code{string} The Code of Experience is a representation of it's parameters as a string.<br>
 * It's the cornerstone of the system, because it is search key for the reward-risk of the Virtual Order.<br>
 * Anyone who is able to compute the Experience key from environment data, may then ask the system for reward-risk
 * stats for this key and make a better trading decision.
 * @constructor
 */
function Experience(id, currentEnvironment, referenceEnvironment, parameters, code){
    const _paramMap = new Map();
    const _paramNames = [];
    parameters.forEach(p=>{
        _paramMap.set(p.getName(), p);
        _paramNames.push(p.getName());
    });
    this.getId = ()=>{
        return id;
    };
    this.getCurrentEnvironment = ()=>{
        return currentEnvironment;
    };
    this.getReferenceEnvironment = ()=>{
        return referenceEnvironment;
    };
    this.getParameters = ()=>{
        return parameters;
    };
    this.getParameter = name =>{
        return _paramMap.get(name);
    };
    this.getCode = ()=>{
        return code;
    };
    this.getParameterIndex = name =>{
        return _paramNames.indexOf(name);
    };
}