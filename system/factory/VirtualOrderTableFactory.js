const TableRecordDTO = require("../model/dto/TableRecordDTO");
const TableDTO = require("../model/dto/TableDTO");
const VIRTUAL_ORDERS_COLUMNS = ["Id", "Symbol", "Environment When Sent", "Environment When Executed",
    "Exec Delay", "Order Created", "Order Executed"];
const VIRTUAL_ORDERS_TYPES = ["String", "String", "String", "String", "Number", "Number", "Number"];
module.exports = dto =>{
    const values = [dto.id, dto.symbol, dto.orderSentEnvironmentId, dto.orderExecutedEnvironmentId, dto.executionDelay, dto.sent, dto.executed];
    const records = [new TableRecordDTO(VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, values)];
    return new TableDTO("Virtual Orders", VIRTUAL_ORDERS_COLUMNS, VIRTUAL_ORDERS_TYPES, records);
}