module.exports = testEnvironment =>{
    QUnit.module("better-sqlite3");
    let statement;
    QUnit.test("Prepare Statement", assert =>{
        assert.expect(0);
        statement = testEnvironment.db.prepare("select * from parameters where parent_id in (select id from environments where created >= ? and created <= ?)")
    });
    QUnit.test("Execute Statement", assert=>{
        assert.expect(0);
        statement.all(1577982720000.0, 1577982780000.0);
    })
}