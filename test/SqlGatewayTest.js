module.exports = testEnv =>{
    QUnit.module("sql-gateway", {
        before: ()=>{
            testEnv.db.prepare(`
                    create table test_orders
                    (
                        id     text not null
                            constraint tests_pk
                                primary key,
                        symbol text not null
                    )`
            ).run();
            testEnv.db.prepare(`
                    create table test_params
                    (
                        id     text not null
                            constraint tests_pk
                                primary key,
                        order_id text not null,
                        value integer not null
                    )`
            ).run();
        },
        after: ()=>{
            testEnv.db.prepare("drop table if exists test_orders").run();
            testEnv.db.prepare("drop table if exists test_params").run();
        }
    });
    QUnit.test("SqlTableWriter can insert one row into the table", assert =>{
        const row = [1,"MSFT"];
        const result = testEnv.testOrderWriter.insertRow(row);
        assert.strictEqual(result.id, 1);
    });
    QUnit.test("SqlTransactionWriter can insert 3 rows into 2 tables", assert =>{
        const transactionStatements = [
            {table: "test_orders", rows: [[2, "MSFT"]]},
            {table: "test_params", rows: [[1,2,-0.004], [2,2, 0.05]]}
            ];
        const result = testEnv.testOrderTransactionWriter.insert(transactionStatements);

        assert.strictEqual(result[0].id, 2);
        assert.strictEqual(result[1].id, 1);
        assert.strictEqual(result[2].id, 2);
    });
};