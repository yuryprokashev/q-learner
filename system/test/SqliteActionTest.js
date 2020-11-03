const SqliteTransaction = require("../io/SqliteTransaction");
module.exports = (io, configApp)=>{
    QUnit.module("sql-lite-database-action", {
        before: ()=>{
            const dbConfig = configApp.getDbConfig();
            const db = io.getDatabase(dbConfig);
            db.prepare(`
                create table test_orders
                (
                    id     text not null
                        constraint tests_pk
                            primary key,
                    symbol text not null
                )`
            ).run();
            this.db = db;
            this.io = io;
            this.insertStatements = [
                "insert into test_orders (id, symbol) values (1, 'MSFT')",
                "insert into test_orders (id, symbol) values (2, 'MSFT')",
                "insert into test_orders (id, symbol) values(3, 'MSFT'), (4, 'MSFT'), (5, 'PINS')",
                "update test_orders set symbol='PINS' where id in (1,2,3)",
                "delete from test_orders where symbol='MSFT'"
            ];
            this.readStatements = [
                "select * from test_orders"
            ];
        },
        after: ()=>{
            this.db.prepare("drop table if exists test_orders").run();
        }
    });
    QUnit.test("Can execute insert statements", assert =>{
        const selectAction = new SqliteTransaction(this.io);
        const actionResponse = selectAction.execute(this.insertStatements);
        console.log(JSON.stringify(actionResponse));
        const [result1, result2, result3, result4, result5] = actionResponse;
        assert.strictEqual(actionResponse.length, 5);
        assert.strictEqual(result1.lastRowId, 1);
        assert.strictEqual(result1.changes, 1);

        assert.strictEqual(result2.lastRowId, 2);
        assert.strictEqual(result2.changes, 1);

        assert.strictEqual(result3.lastRowId, 5);
        assert.strictEqual(result3.changes, 3);

        assert.strictEqual(result4.changes, 3);

        assert.strictEqual(result5.changes, 1);
    });
    QUnit.test("Can not read. Only write.", assert =>{
        const readWriteAction = new SqliteTransaction(this.io);
        try {
            const actionResponse = readWriteAction.execute(this.readStatements);
        } catch (err){
            assert.strictEqual(err.message.includes("Action writes. It can not read"), true)
;        }
    });
}