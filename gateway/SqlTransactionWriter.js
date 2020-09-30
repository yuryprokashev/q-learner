module.exports = SqlTransactionWriter;
function SqlTransactionWriter(db, tableWriters){
    const _writers = tableWriters.reduce((acc, writer)=>{
        acc.set(writer.getTableName(), writer);
        return acc;
    }, new Map());
    const insertTransaction = db.transaction((tableNames, values) =>{
        const result = [];
        values.forEach((v, index) => {
            const tableName = tableNames[index];
            const writer = _writers.get(tableName);
            result.push(writer.insert(v));
        })
        return result;
    })
    /**
     *
     * @param tableNames {string[]}
     * @example ["virtual_orders", "parameters", "parameters"]
     * @param values {any[]}
     * @example [[1, "MSFT"], [1, 1, "buy", 0.001], [2, 1, "sell", -0.005]]
     */
    this.insert = (tableNames, values)=>{
        return insertTransaction(tableNames, values);
    };
}