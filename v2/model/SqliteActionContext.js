module.exports = SqliteActionContext;
/**
 * @param filePath {string} - full path to the database file.
 * @param statements {string[]} - the set of SQL statements to execute.
 * @param [isVerbose=false] {boolean} - set if you need logging the statements to the console.
 */
function SqliteActionContext(filePath, statements, isVerbose){
    const verbose = isVerbose === undefined ? false : isVerbose;
    this.filePath = filePath;
    this.statements = statements;
    this.verbose = verbose;
}