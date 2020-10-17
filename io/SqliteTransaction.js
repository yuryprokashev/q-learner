const Validator = require("../basic/Validator");
module.exports = SqliteTransaction;

/**
 * Stateless Action implementation that allows to execute multiple SQL statements against the SQLite database
 * in a single transaction.<br>
 * Action opens the db connection and closes it when the statement batch is executed.<br>
 * Client has to provide the full context, describing the SQLite database file to call and the SQL statements to execute.
 * @constructor
 */
function SqliteTransaction(io){
    /**
     *
     * @returns {Object[]} the array of statement execution result objects. <br>
     * Statement execution result object for update, delete contains the changes count.
     * Statement execution result object for insert contains the changes count and the id of the last inserted row.
     * @param actionStatements{string[]}
     */
    this.execute = actionStatements =>{
        Validator.isDefined("IO", io);
        const db = io.getDatabase();
        const dbResponse = db.transaction(statements =>{
            return statements.map((statement, index) =>{
                Validator.mustBeTrue(!isStatement("select", statement), "Action writes. It can not read.");
                const dbStatement = db.prepare(statement);
                const dbStatementResponse =  dbStatement.run();
                return StatementResponse(statement, dbStatementResponse);
            });
        })(actionStatements);
        return dbResponse;
    };
}

function isStatement(type, statement){
    return statement.toLowerCase().indexOf(type.toLowerCase()) === 0;
}
function StatementResponse(statement, dbStatementResponse){
    const result = {};
    if(isStatement("update", statement) || isStatement("delete", statement)) result.changes = dbStatementResponse.changes;
    if(isStatement("insert", statement)) {
        result.changes = dbStatementResponse.changes;
        result.lastRowId = dbStatementResponse.lastInsertRowid;
    }
    return result;
}