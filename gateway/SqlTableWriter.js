module.exports = SqlTableWriter;

function SqlTableWriter(db, tableName, columns){
    this.getTableName = ()=>{
        return tableName;
    };
    /**
     *
     * @param row {any[]} - the array of the row values to be inserted
     * @example [123, "MSFT", 0.0029]
     * @returns {{id: any}} - id of the inserted row
     */
    this.insertRow = row =>{
        return _insertRow(row);
    };
    /**
     *
     * @param rows {any[][]} - the array of rows
     * @returns {{id: any}[]} - the array of ids of inserted rows
     */
    this.insertRows = rows =>{
        const result = [];
        rows.forEach(row=>{
            result.push(_insertRow(row));
        });
        return result;
    };
    function _insertRow(row){
        const valueTemplate = row.map(str=>{
            return "?";
        }).join(", ");
        const statement = db.prepare(`insert into ${tableName} (${columns}) values (${valueTemplate})`);
        const info = statement.run(row);
        return {
            id: info.lastInsertRowid
        };
    }
}