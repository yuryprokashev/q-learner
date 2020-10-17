const TableDTO = require("../model/dto/TableDTO");
const TableRecordDTO = require("../model/dto/TableRecordDTO");
const VIRTUAL_ORDERS_COLUMNS = ["Id", "Symbol", "Environment When Sent", "Environment When Executed", "Exec Delay"];
const VIRTUAL_ORDERS_TYPES = ["String", "String", "String", "String", "Number"];
const PARAM_COLUMNS = ["Id", "Name", "Value", "Parent Id"];
const PARAM_TYPES = ["String", "String", "Number", "String"];

module.exports = VirtualOrderTablesFactory;
function VirtualOrderTablesFactory(){
    /**
     *
     * @param vOrderDTOs
     * @returns {TableGroup[]}
     */
    this.create = vOrderDTOs =>{
        return vOrderDTOs.map(dto =>{
            const tables = createTablesForOneVirtualOrderDTO(dto);
            return new TableGroup(tables);
        });
    };
}
function createTablesForOneVirtualOrderDTO(dto){
    const tables = [];
    const values = [dto.id, dto.symbol, dto.orderSentEnvironmentId, dto.orderExecutedEnvironmentId, dto.executionDelay];
    const records = [new TableRecordDTO(VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, values)];
    const voTable = new TableDTO("Virtual Orders", VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, records);
    tables.push(voTable);
    const buyerParamRecord = createParamRecord(dto.buyerReward);
    const sellerParamRecord = createParamRecord(dto.sellerReward)
    const paramRecords = [];
    paramRecords.push(buyerParamRecord);
    paramRecords.push(sellerParamRecord);
    tables.push(new TableDTO("Parameters", PARAM_COLUMNS, PARAM_TYPES, paramRecords));
    return tables;
}
function createParamRecord(dto){
    const buyerParamValues = [dto.id, dto.name, dto.value, dto.parentId];
    return new TableRecordDTO(PARAM_COLUMNS, PARAM_TYPES, buyerParamValues);
}

function TableGroup(tables){
    this.tables = tables;
}