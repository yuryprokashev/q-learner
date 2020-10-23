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

module.exports = InsertVirtualOrderStatementsFactory;

function InsertVirtualOrderStatementsFactory(){
    /**
     *
     * @param tables{TableDTO[]}
     * @returns {string[]}
     */
    this.create = tables =>{
        const tableMap = new Map(TABLE_MAP);
        const sqlColumnsMap = new Map(SQL_COLUMNS_MAP);
        const voMap = new Map(VIRTUAL_ORDERS_COLUMNS_MAP);
        const paramMap = new Map(PARAM_COLUMNS_MAP);
        return tables.reduce((acc, table) => {
            const sqlTable = tableMap.get(table.name);
            const sqlColumns = sqlColumnsMap.get(sqlTable);
            const columnMap = sqlTable === "virtual_orders" ? voMap : paramMap;
            const tableStatements = table.records.map(record => {
                const values = sqlColumns.split(",").map(c => c.trim()).map(sqlColumn => {
                    const recordColumn = columnMap.get(sqlColumn);
                    const valueIndex = record.columns.indexOf(recordColumn);
                    const recordValue = record.values[valueIndex];
                    const valueType = record.types[valueIndex];
                    return valueType === "String" ? `'${recordValue}'` : recordValue;
                });
                return `insert into ${sqlTable} (${sqlColumns}) values (${values})`;
            });
            acc = acc.concat(tableStatements);
            return acc;
        }, []);
    };
}