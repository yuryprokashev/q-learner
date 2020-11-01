const ValueStringFactory = require("./ValueStringFactory");
module.exports = TableGroupInsertStatementsFactory;
function TableGroupInsertStatementsFactory(tables, tableMappings, sqlColumnMappings, recordMappingsByTable){
    const tableMap = new Map(tableMappings);
    const sqlColumnsMap = new Map(sqlColumnMappings);
    const recordMapByTable = new Map(recordMappingsByTable);
    return tables.reduce((acc, table) => {
        const recordToSqlColumnMappings = recordMapByTable.get(table.name);
        const recordToSqlColumnMap = new Map(recordToSqlColumnMappings);
        const sqlTableName = tableMap.get(table.name);
        const sqlColumnNames = sqlColumnsMap.get(sqlTableName);
        const tableStatements = TableInsertStatementsFactory(table, sqlTableName, recordToSqlColumnMap, sqlColumnNames)
        acc.push(...tableStatements);
        return acc;
    }, []);
}

function TableInsertStatementsFactory(table, sqlTable, recordToSqlColumnMap, sqlColumns){
    return table.records.map(record => {
        const values = sqlColumns.split(",").map(c => c.trim()).map(sqlColumn => {
            return ValueStringFactory(record, sqlColumn, recordToSqlColumnMap);
        });
        return `insert into ${sqlTable} (${sqlColumns}) values (${values})`;
    });
}
