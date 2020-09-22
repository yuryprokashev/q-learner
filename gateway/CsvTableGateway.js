const Validator = require("../basic/Validator");
/*
sync parse is used. csv api docs: https://csv.js.org/parse/api/sync/
 */
const parse = require("csv-parse/lib/sync");
module.exports = CsvTableGateway;
function CsvTableGateway(str){
    this.read = ()=>{
        Validator.isDefined("File String", str);
        return parse(str, {columns: true, skip_empty_lines:true, trim: true});
    };
}