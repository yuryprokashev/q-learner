module.exports = testEnvironment =>{
    QUnit.module("Environment Repository");
    QUnit.test("getByQuery", assert =>{
        let query = testEnvironment.environmentRepository.createQueryBuilder()
            .setCreatedFrom(Date.UTC(2020,0,2, 16, 32,0))
            .setCreatedUntil(Date.UTC(2020, 0, 2, 16, 33, 0))
            .build();
        let environments = testEnvironment.environmentRepository.getByQuery(query);
        assert.strictEqual(environments.length, 153, " 153 Environments records received.");
        assert.strictEqual(environments[0].symbol, "_MSFT", "First Environment record symbol is _MSFT");
        assert.strictEqual(environments[0].created, 1577982780000, "First Environment record created timestamp is 1577982720000");
    });
}