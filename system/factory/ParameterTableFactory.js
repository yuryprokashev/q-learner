const TableDTO = require("../model/dto/TableDTO");
const Validator = require("../../basic/Validator");
const TableDTOFactory = require("./TableDTOFactory");
/**
 *
 * @param args {Object|ParameterDTO[]} - the DTO of the parameters parent with 'parameters' property, or parameter dto
 * array.
 * @param [args.parameters{ParameterDTO[]}]
 * @returns {TableDTO}
 */
module.exports = ParameterTableFactory;
function ParameterTableFactory(){
    const TABLE_COLUMNS = ["Id", "Name", "Value", "Parent Id"];
    const TABLE_COLUMN_TYPES = ["String", "String", "Number", "String"];
    const DTO_COLUMNS = ["id", "name", "value", "parentId"];
    const _tableDTOFactory = new TableDTOFactory("Parameters", TABLE_COLUMNS, TABLE_COLUMN_TYPES, DTO_COLUMNS);
    this.create = args =>{
        const paramDtos = !Array.isArray(args) ? args.parameters : args;
        Validator.isDefined("Parameter DTO[]", paramDtos);
        return _tableDTOFactory.create(paramDtos);
    };
}