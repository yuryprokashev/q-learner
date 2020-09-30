module.exports = testEnvironment =>{
    QUnit.module("better-sqlite3", {
        before: ()=>{
            testEnvironment.db.prepare(`
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
            testEnvironment.db.prepare("drop table if exists tests").run();
        }
    });
    let statement;
    QUnit.test("Prepare Statement", assert =>{
        assert.expect(0);
        statement = testEnvironment.db.prepare("select * from parameters where parent_id in (select id from environments where created >= ? and created <= ?)")
    });
    QUnit.test("Execute Statement", assert=>{
        assert.expect(0);
        statement.all(1577982720000.0, 1577982780000.0);
    });
    QUnit.test("Run Insert Many in Transaction", assert =>{
        const columns = "id,symbol,reward";
        const values = [[1,'MSFT', 0.002], [2, 'MSFT', 0.006]];
        const statement = testEnvironment.db.prepare(`insert into tests (${columns}) values (?, ?, ?)`);
        const insertTransaction = testEnvironment.db.transaction(vectors =>{
            const result = [];
            for(const vector of vectors) {
                result.push(statement.run(vector));
            }
            return result;
        });
        const response = insertTransaction(values);
        assert.strictEqual(response.length, 2);
        assert.strictEqual(response[0].lastInsertRowid, 1);
        assert.strictEqual(response[1].lastInsertRowid, 2);
    });
}