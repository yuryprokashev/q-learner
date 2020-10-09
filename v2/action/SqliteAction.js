const Database = require("better-sqlite3");
const SqliteActionContext = require("../model/SqliteActionContext");
const Validator = require("../../basic/Validator");
module.exports = SqliteAction;

/**
 * Stateless Action implementation that allows to execute multiple SQL statements against the SQLite database
 * in a single transaction.<br>
 * Action opens the db connection and closes it when the statement batch is executed.<br>
 * Client has to provide the full context, describing the SQLite database file to call and the SQL statements to execute.
 * @constructor
 */
function SqliteAction(){
    /**
     *
     * @param actionContext{SqliteActionContext}
     * @returns {Object[]} the array of statement execution result objects. <br>
     * Statement execution result object for update, delete contains the changes count.
     * Statement execution result object for insert contains the changes count and the id of the last inserted row.
     */
    this.execute = actionContext =>{
        const options = {};
        if(actionContext.verbose) options.verbose = console.log;
        const db = new Database(actionContext.filePath, options);
        const dbResponse = db.transaction(statements =>{
            return statements.map((statement, index) =>{
                Validator.mustBeTrue(!isStatement("select", statement), "Action writes. It can not read.");
                const dbStatement = db.prepare(statement);
                const dbStatementResponse =  dbStatement.run();
                return StatementResponse(statement, dbStatementResponse);
            });
        })(actionContext.statements);
        db.close();
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