const Database = require("better-sqlite3");
const SqlDatabaseAction = require("../action/SqliteAction");
module.exports = ()=>{
    QUnit.module("sql-lite-database-action", {
        before: ()=>{
            const dbFilePath = "C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite";
            this.db = new Database(dbFilePath);
            this.db.prepare(`
                    create table test_orders
                    (
                        id     text not null
                            constraint tests_pk
                                primary key,
                        symbol text not null
                    )`
            ).run();
            this.insertContext = {
                filePath: dbFilePath,
                verbose: true,
                statements: [
                    "insert into test_orders (id, symbol) values (1, 'MSFT')",
                    "insert into test_orders (id, symbol) values (2, 'MSFT')"
                ]
            };
            this.selectContext = {
                filePath: dbFilePath,
                verbose: true,
                statements: [
                    "select * from test_orders"
                ]
            };
            this.reasWriteContext ={
                filePath: dbFilePath,
                verbose: true,
                statements: [
                    "insert into test_orders (id, symbol) values(3, 'MSFT')",
                    "select * from test_orders"
                ]
            }
        },
        after: ()=>{
            this.db.prepare("drop table if exists test_orders").run();
            this.db.close();
        }
    });
    QUnit.test("Can execute insert statements", assert =>{
        const selectAction = new SqliteAction();
        const actionResponse = selectAction.execute(this.insertContext);
        console.log(JSON.stringify(actionResponse));
        assert.strictEqual(actionResponse.length, 2);
        actionResponse.filter(r => r.index === 0).forEach(r=>{
            assert.strictEqual(r.result[0].lastInsertRowid, 1);
        });
        actionResponse.filter(r => r.index === 1).forEach(r=>{
            assert.strictEqual(r.result[0].lastInsertRowid, 2);
        });
    });
    QUnit.test("Can execute select statements", assert =>{
        const selectAction = new SqliteAction();
        const actionResponse = selectAction.execute(this.selectContext);
        console.log(JSON.stringify(actionResponse));
        assert.strictEqual(actionResponse.length, 1);
        actionResponse.filter(r=> r.index === 0).forEach((r) =>{
            assert.strictEqual(r.result[0].symbol, "MSFT");
        });
    });
    QUnit.test("Can read and write in the single action", assert =>{
        const readWriteAction = new SqliteAction();
        const actionResponse = readWriteAction.execute(this.reasWriteContext);
        console.log(JSON.stringify(actionResponse));
        assert.strictEqual(actionResponse.length, 2);
        actionResponse.filter(r=> r.index === 1).forEach(r=>{
            assert.strictEqual(r.result[0].symbol, "MSFT");
        });
        actionResponse.filter(r=> r.index === 0).forEach(r=>{
            assert.strictEqual(r.result[0].lastInsertRowid, 3);
        });
    });
}