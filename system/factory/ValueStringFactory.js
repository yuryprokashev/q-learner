module.exports = (record, sqlTableColumnName, recordToSqlColumnMap)=>{
    const recordColumn = recordToSqlColumnMap.get(sqlTableColumnName);
    const valueIndex = record.columns.indexOf(recordColumn);
    const recordValue = record.values[valueIndex];
    const valueType = record.types[valueIndex];
    return valueType === "String" ? `'${recordValue}'` : recordValue;
}