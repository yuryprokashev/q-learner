module.exports = SqlTableWriter;

function SqlTableWriter(db, tableName, columns){
    this.getTableName = ()=>{
        return tableName;
    };
    /**
     *
     * @param values {any[]} - the array of the values to be inserted
     * @example [123, "MSFT", 0.0029]
     * @returns {{id: any}}
     */
    this.insert = values =>{
        const valueTemplate = values.map(str=>{
            return "?";
        }).join(", ");
        const statement = db.prepare(`insert into ${tableName} (${columns}) values (${valueTemplate})`);
        const info = statement.run(values);
        return {
            id: info.lastInsertRowid
        };
    };
}