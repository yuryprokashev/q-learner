const Validator = require("../basic/Validator");
module.exports = SqlTransactionWriter;

/**
 *
 * @param db
 * @param tableWriters
 * @constructor
 */
function SqlTransactionWriter(db, tableWriters){
    const _writers = tableWriters.reduce((acc, writer)=>{
        acc[writer.getTableName()] = writer;
        return acc;
    }, {});
    const insertTransaction = db.transaction(transactionStatements =>{
        let result = [];
        transactionStatements.forEach(statement =>{
            const writer = _writers[statement.table];
            Validator.isDefined("Table Writer", writer, "Table Name: " + statement.table);
            result = result.concat(writer.insertRows(statement.rows));
        })
        return result;
    });
    /**
     *
     * @param transactionStatements {Object[]}
     * @example {table: "virtual_orders, values: [[1, "MSFT"]], {table: "parameters", values: [[1, 1, "buy", 0.001], [2, 1, "sell", -0.005]]}
     * @param transactionStatements[].table {string} - the name of the table to do the write operation
     * @param transactionStatements[].rows {any[][]} - 1..N value arrays
     */
    this.insert = transactionStatements =>{
        return insertTransaction(transactionStatements);
    };
}