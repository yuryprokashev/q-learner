const BetterSqlite3 = require("better-sqlite3");
module.exports = Io;
function Io(configApp){
    const dbConfig = configApp.getDbConfig();
    let _db;
    this.getDatabase = () =>{
        if(_db) return _db;
        _db = dbConfig.isVerbose ? new BetterSqlite3(dbConfig.filePath, {verbose: console.log}) : new BetterSqlite3(dbConfig.filePath);
        process.on("exit", ()=>{
            if(_db.open) _db.close();
        });
        return _db;
    };
}