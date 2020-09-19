const Database = require("better-sqlite3");
const fs = require("fs");
const File = require("../model/File");
module.exports = DataSourceService;
function DataSourceService(){
    let _db;
    this.getDatabaseConnection = (filePath, verbose) =>{
        if(!_db) {
            let options = {};
            if(verbose) options.verbose = verbose;
            _db = new Database(filePath, options);
            process.on('exit', () => _db.close());
        }
        return _db;
    };
    this.getFile = filePath =>{
        return new File(filePath, fs.readFileSync(filePath, "utf8"));
    };
}