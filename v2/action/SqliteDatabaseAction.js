const Database = require("better-sqlite3");
module.exports = SqliteDatabaseAction;

/**
 * Stateless Action implementation that allows to execute multiple SQL statements against the SQLite database
 * in a single transaction.<br>
 * Action opens the db connection and closes it when the statement batch is executed.<br>
 * Client has to provide the full context, describing the SQLite database file to call and the SQL statements to execute.
 * You can read and write in the single action.
 * @constructor
 */
function SqliteDatabaseAction(){
    /**
     *
     * @param actionContext{Object}
     * @param actionContext.filePath {string} - full path to the database file.
     * @param [actionContext.verbose=false] {boolean} - set if you need logging the statements to the console.
     * @param actionContext.statements {string[]} - the set of SQL statements to execute.
     * @returns {StatementExecutionResult[]}
     */
    this.execute = actionContext =>{
        const options = {};
        if(actionContext.verbose) options.verbose = console.log;
        const db = new Database(actionContext.filePath, options);
        const dbResponse = db.transaction(statements =>{
            return statements.map((statement, index) =>{
                const dbStatement = db.prepare(statement);
                const dbStatementResponse =  isStatement("select", statement) ? dbStatement.all() : dbStatement.run();
                const result = Array.isArray(dbStatementResponse) ? dbStatementResponse : [dbStatementResponse];
                return new StatementExecutionResult(index, result);
            });
        })(actionContext.statements);
        db.close();
        return dbResponse;
    };
}

/**
 *
 * @param index{number} - the sequential index of the statement in the statement batch
 * @param result {Array} - the result of the statement execution
 * @constructor
 */
function StatementExecutionResult(index, result){
    this.index = index;
    this.result = result;
}

function isStatement(type, statement){
    return statement.toLowerCase().indexOf(type.toLowerCase()) === 0;
}