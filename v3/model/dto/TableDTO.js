module.exports = TableDTO;

/**
 * Abstract data structure for passing around tabular data.
 * @param name {string} - table name. It does not match the database table. No details about the database in abstract table.
 * @param columns {string[]} - column names. Note: these are <strong>not</strong> database column names.
 * @param types {string[]} - types of each column in the table. Again these are <strong>not</strong> specific database types.
 * But rather types used by the application.
 * @param records {TableRecordDTO[]} - table records.
 * @constructor
 */
function TableDTO(name, columns, types, records){
    this.name = name;
    this.columns = columns;
    this.types = types;
    this.records = records;
}