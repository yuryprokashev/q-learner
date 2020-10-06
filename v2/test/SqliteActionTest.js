const Database = require("better-sqlite3");
const SqliteAction = require("../action/SqliteAction");
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
            this.readWriteContext ={
                filePath: dbFilePath,
                verbose: true,
                statements: [
                    "insert into test_orders (id, symbol) values(3, 'MSFT'), (4, 'MSFT')",
                    "select * from test_orders",
                    "update test_orders set symbol='PINS' where id in (1,2)",
                    "select * from test_orders",
                    "delete from test_orders where id in (1,2)",
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
        const [result1, result2] = actionResponse;
        assert.strictEqual(result1.lastRowId, 1);
        assert.strictEqual(result2.lastRowId, 2);
    });
    QUnit.test("Can execute select statements", assert =>{
        const selectAction = new SqliteAction();
        const actionResponse = selectAction.execute(this.selectContext);
        console.log(JSON.stringify(actionResponse));
        assert.strictEqual(actionResponse.length, 1);
        assert.strictEqual(actionResponse[0].records[0].symbol, "MSFT");
    });
    QUnit.test("Can read and write in the single action", assert =>{
        const readWriteAction = new SqliteAction();
        const actionResponse = readWriteAction.execute(this.readWriteContext);
        console.log(JSON.stringify(actionResponse));
        assert.strictEqual(actionResponse.length, 6);
        const [result1, result2, result3, result4, result5, result6] = actionResponse;
        assert.strictEqual(result1.lastRowId, 4);
        assert.strictEqual(result2.records.length, 4);
        assert.strictEqual(result2.records[0].symbol, "MSFT");
        assert.strictEqual(result3.changes, 2);
        assert.strictEqual(result4.records[0].symbol, "PINS");
        assert.strictEqual(result5.changes, 2);
        assert.strictEqual(result6.records[0].symbol, "MSFT");
    });
}