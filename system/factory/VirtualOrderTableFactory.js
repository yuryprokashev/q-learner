const TableDTOFactory = require("./TableDTOFactory");

module.exports = VirtualOrderTableFactory;
function VirtualOrderTableFactory(){
    const TABLE_COLUMNS = ["Id", "Symbol", "Environment When Sent", "Environment When Executed",
        "Exec Delay", "Order Created", "Order Executed"];
    const TABLE_COLUMN_TYPES = ["String", "String", "String", "String", "Number", "Number", "Number"];
    const DTO_COLUMNS = ["id", "symbol", "orderSentEnvironmentId", "orderExecutedEnvironmentId", "executionDelay", "sent", "executed"];
    const _tableDTOFactory = new TableDTOFactory("Virtual Orders", TABLE_COLUMNS, TABLE_COLUMN_TYPES, DTO_COLUMNS);
    this.create = dto =>{
        return _tableDTOFactory.create(dto);
    };
}