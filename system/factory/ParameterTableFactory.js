const TableDTO = require("../model/dto/TableDTO");
const TableRecordDTO = require("../model/dto/TableRecordDTO");
const PARAM_COLUMNS = ["Id", "Name", "Value", "Parent Id"];
const PARAM_TYPES = ["String", "String", "Number", "String"];
module.exports = parameterDTOs =>{
    const paramRecords = parameterDTOs.map(dto =>{
        return createParamRecord(dto);
    });
    return new TableDTO("Parameters", PARAM_COLUMNS, PARAM_TYPES, paramRecords);
}
function createParamRecord(dto){
    const buyerParamValues = [dto.id, dto.name, dto.value, dto.parentId];
    return new TableRecordDTO(PARAM_COLUMNS, PARAM_TYPES, buyerParamValues);
}