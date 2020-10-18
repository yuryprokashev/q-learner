module.exports = ParameterDTO;
/**
 * Parameter Data structure to pass around the Parameter data.
 * @param id {string} - the identifier of the parameter.
 * @param name {string} - the name of the parameter.
 * @example "ma10" - the name of Moving Average over 10 periods parameter.
 * @param value {number} - the numerical value of the parameter.
 * @param parentId {string} - the id of the parameter parent (Environment or VirtualOrder).
 * @constructor
 */
function ParameterDTO(id, name, value, parentId){
    this.id = id;
    this.name = name;
    this.value = value;
    this.parentId = parentId;
}