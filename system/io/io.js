const fs = require("fs");
const BetterSqlite3 = require("better-sqlite3");
const File = require("../model/entity/File");
module.exports = Io;

/**
 * @constructor
 */
function Io(){
    let _db;
    this.getDatabase = dbConfig =>{
        if(_db) return _db;
        _db = dbConfig.isVerbose ? new BetterSqlite3(dbConfig.filePath, {verbose: console.log}) : new BetterSqlite3(dbConfig.filePath);
        process.on("exit", ()=>{
            if(_db.open) _db.close();
        });
        return _db;
    };
    this.getFile = filePath =>{
        return new File(filePath, fs.readFileSync(filePath, "utf8"));
    };
}