module.exports = SqlStatementApp;
function SqlStatementApp(io, baseFolderPath){
    const _statementMap = new Map();
    this.getByName = name =>{
        if(_statementMap.has(name)) return _statementMap.get(name);
        const file = io.getFile(`${baseFolderPath}${name}.sql`);
        const statement = file.getContent();
        _statementMap.set(name, statement);
        return _statementMap.get(name);
    };
}