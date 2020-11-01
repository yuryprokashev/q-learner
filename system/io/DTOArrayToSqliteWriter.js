const SqliteTransaction = require("./SqliteTransaction");
module.exports = DTOArrayToSqliteWriter;
function DTOArrayToSqliteWriter(io, dtoToTableFactory, tableToSqlStatementGroupFactory){
    this.execute = dtoArray =>{
        const experienceTableGroups = dtoToTableFactory.create(dtoArray);
        const statementGroups = experienceTableGroups.map(tableGroup =>{
            return tableToSqlStatementGroupFactory.create(tableGroup.tables);
        });
        return statementGroups.map(statementGroup =>{
            const action = new SqliteTransaction(io);
            return action.execute(statementGroup);
        });
    }
}