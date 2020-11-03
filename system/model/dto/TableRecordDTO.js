module.exports = TableRecordDTO;
/**
 *
 * @param columns {string[]} - column names. Note: these are <strong>not</strong> database column names.
 * @param types {string[]} - types of each column in the table. Again these are <strong>not</strong> specific database types.
 * But rather types used by the application.
 * @param values {any[]} - values of one TableRecord.
 * @constructor
 */
function TableRecordDTO(columns, types, values){
    this.columns = columns;
    this.types = types;
    this.values = values;
}