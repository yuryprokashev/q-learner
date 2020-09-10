module.exports = testEnvironment =>{
    QUnit.module("Environment Parameter Repository");
    QUnit.test("getByQuery", assert =>{
        let query = testEnvironment.parameterRepository.createQueryBuilder()
            .setCreatedFrom(Date.UTC(2020,0,2, 16, 32,0))
            .setCreatedUntil(Date.UTC(2020, 0, 2, 17, 33, 0))
            .build();
        let parameters = testEnvironment.parameterRepository.getByQuery(query);
        assert.strictEqual(parameters.length, 1071, "1071 Environment Parameter records received.");
    });
}
