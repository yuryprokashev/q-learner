const TableDTO = require("../model/TableDTO");
const TableRecordDTO = require("../model/TableRecordDTO");
module.exports = VirtualOrderTablesFactory;
function VirtualOrderTablesFactory(){
    const VIRTUAL_ORDERS_COLUMNS = ["Id", "Symbol", "Environment When Sent", "Environment When Executed", "Exec Delay"];
    const VIRTUAL_ORDERS_TYPES = ["String", "String", "String", "String", "Number"];
    const PARAM_COLUMNS = ["Id", "Name", "Value", "Parent Id"];
    const PARAM_TYPES = ["String", "String", "Number", "String"];
    this.create = vOrderDTOs =>{
        const tables = [];
        const voRecords = vOrderDTOs.map(dto=>{
            const values = [dto.id, dto.symbol, dto.orderSentEnvironmentId, dto.orderExecutedEnvironmentId, dto.executionDelay];
            return new TableRecordDTO(VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, values);
        });
        tables.push(new TableDTO("Virtual Orders", VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, voRecords));
        const buyerParamRecords = vOrderDTOs.map(dto=>{
            const buyerParamValues = [dto.buyerReward.id, dto.buyerReward.name, dto.buyerReward.value, dto.buyerReward.parentId];
            return new TableRecordDTO(PARAM_COLUMNS, PARAM_TYPES, buyerParamValues);
        });
        const sellerParamRecords = vOrderDTOs.map(dto=>{
            const buyerParamValues = [dto.sellerReward.id, dto.sellerReward.name, dto.sellerReward.value, dto.sellerReward.parentId];
            return new TableRecordDTO(PARAM_COLUMNS, PARAM_TYPES, buyerParamValues);
        });
        const paramRecords = [];
        paramRecords.push(...buyerParamRecords);
        paramRecords.push(...sellerParamRecords);
        tables.push(new TableDTO("Parameters", PARAM_COLUMNS, PARAM_TYPES, paramRecords));
        return tables;
    };
}