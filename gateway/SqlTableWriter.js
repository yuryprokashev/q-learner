module.exports = SqlTableWriter;

function SqlTableWriter(db, tableName){
    /**
     *
     * @param columns {string} - the sql formatted string representing column names.
     * @example id,symbol,reward
     * @param values {any[]} - the array of the values to be inserted
     * @example [123, "MSFT", 0.0029]
     * @returns {{id: any}}
     */
    this.insert = (columns, values) =>{
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