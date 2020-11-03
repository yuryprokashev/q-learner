const Parameter = require("../model/entity/Parameter");
const Validator = require("../../basic/Validator");
module.exports = ParameterFactory;
function ParameterFactory(){
    /**
     * Use to produce Parameter from the Database Record.
     * @param record
     * @returns {Parameter}
     */
    this.fromRecord = record =>{
        _validateRecordInput(record.id, record.name, record.value);
        return new Parameter(record.id, record.name, _parameterValue(record.value), record.parent_id);
    };
    this.fromObject = obj =>{
        _validateObjectInput(obj.parentId, obj.name, obj.value);
        return new Parameter(_parameterId(obj.parentId, obj.name), obj.name, _parameterValue(obj.value), obj.parentId);
    };
    function _parameterId(parentId, name){
        return `${parentId}-${name}`;
    }
    function _parameterValue(recordValue){
        return parseFloat(recordValue);
    }
    function _validateRecordInput(id, name, value){
        Validator.isDefined("Parameter Id", id);
        Validator.isDefined("Parameter Name", name);
        Validator.isDefined("Parameter Value", value);
    }
    function _validateObjectInput(parentId, name, value){
        Validator.isDefined("Parameter Parent Id", parentId);
        Validator.isDefined("Parameter Name", name);
        Validator.isDefined("Parameter Value", value);
    }
}