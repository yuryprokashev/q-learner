module.exports = testEnv =>{
    QUnit.module("sql-gateway", {
        before: ()=>{
            testEnv.db.prepare(`
                    create table tests
                    (
                        id     text not null
                            constraint tests_pk
                                primary key,
                        symbol text not null,
                        reward real not null
                    )`
            ).run();
        },
        after: ()=>{
            testEnv.db.prepare("drop table if exists tests").run();
        }
    });
    QUnit.test("SqlTableWriter can insert one row into the table", assert =>{
        const columns = "id,symbol,reward";
        const values = [1,"MSFT", 0.002];
        const result = testEnv.sqlWriter.insert(columns, values);
        assert.strictEqual(result.id, 1);
    });
};