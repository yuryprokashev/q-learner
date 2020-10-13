module.exports = TableGatewayContext;

/**
 * Facilitates access to the tables, so Factory can quickly find the required table and transform it to SQL statement.
 * @param tables {TableDTO[]} - abstract table data structures to be used for transformations into the database SQL statements
 * or .csv rows. Or any other tabular data, aka Google Spreadsheet.
 * @constructor
 */
function TableGatewayContext(tables){
    this.tables = tables;
}