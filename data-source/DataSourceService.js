const Database = require("better-sqlite3");
module.exports = DataSourceService;
function DataSourceService(){
    let _db;
    this.getDatabaseConnection = (fileName, verbose) =>{
        if(!_db) {
            let options = {};
            if(verbose) options.verbose = verbose;
            _db = new Database(fileName, options);
            process.on('exit', () => _db.close());
        }
        return _db;
    };
}