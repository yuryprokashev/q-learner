const SqliteTransaction = require("./SqliteTransaction");
module.exports = DTOArrayToSqliteWriter;
function DTOArrayToSqliteWriter(io, dtoToTableFactory, tableToSqlStatementGroupFactory){
    this.execute = dtoArray =>{
        const tableGroups = dtoToTableFactory.create(dtoArray);
        const statementGroups = tableGroups.map(tableGroup =>{
            return tableToSqlStatementGroupFactory.create(tableGroup.tables);
        });
        return statementGroups.map(statementGroup =>{
            const action = new SqliteTransaction(io);
            return action.execute(statementGroup);
        });
    }
}