const TableGroupInsertStatementsFactory = require("./TableGroupInsertStatementsFactory");

module.exports = InsertVirtualOrderStatementsFactory;

function InsertVirtualOrderStatementsFactory(){
    const VIRTUAL_ORDERS_COLUMNS_MAP = [
        ["id", "Id"], ["symbol", "Symbol"], ["sent_environment_id", "Environment When Sent"],
        ["executed_environment_id", "Environment When Executed"], ["exec_delay", "Exec Delay"],
        ["created", "Order Created"], ["executed", "Order Executed"]
    ];
    const SQL_COLUMNS_MAP = [
        ["virtual_orders", "id, symbol, sent_environment_id, executed_environment_id, exec_delay, created, executed"],
        ["virtual_order_parameters", "id, name, value, parent_id"]
    ]
    const PARAM_COLUMNS_MAP = [
        ["id", "Id"], ["name", "Name"], ["value", "Value"], ["parent_id", "Parent Id"]
    ];
    const TABLE_MAP = [["Virtual Orders", "virtual_orders"], ["Parameters", "virtual_order_parameters"]];
    const RECORD_MAPPINGS_BY_TABLE = [
        ["Virtual Orders", VIRTUAL_ORDERS_COLUMNS_MAP],
        ["Parameters", PARAM_COLUMNS_MAP]
    ];
    /**
     *
     * @param tables{TableDTO[]}
     * @returns {string[]}
     */
    this.create = tables =>{
        return TableGroupInsertStatementsFactory(tables, TABLE_MAP, SQL_COLUMNS_MAP, RECORD_MAPPINGS_BY_TABLE);
    };
}