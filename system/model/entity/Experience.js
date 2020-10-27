module.exports = Experience;

/**
 *
 * @param id
 * @param currentEnvironment{Environment}
 * @param referenceEnvironment{Environment}
 * @param parameterGroup
 * @param code{string} The Code of Experience is a representation of it's parameters as a string.<br>
 * It's the cornerstone of the system, because it is search key for the reward-risk of the Virtual Order.<br>
 * Anyone who is able to compute the Experience key from environment data, may then ask the system for reward-risk
 * stats for this key and make a better trading decision.
 * @constructor
 */
function Experience(id, currentEnvironment, referenceEnvironment, parameterGroup, code){
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
        return parameterGroup.all();
    };
    this.getParameter = name =>{
        return parameterGroup.get(name);
    };
    this.getCode = ()=>{
        return code;
    };
    this.getParameterIndex = name =>{
        return parameterGroup.indexOf(name);
    };
}