module.exports = Parameter;

/**
 *
 * @param id
 * @param name
 * @param value
 * @param parentId
 * @constructor
 */
function Parameter(id, name, value, parentId){
    this.getId = ()=>{
        return id;
    };
    this.getName = ()=>{
        return name;
    };
    this.getValue = ()=>{
        return value;
    };
    this.getParentId = ()=>{
        return parentId;
    };
}