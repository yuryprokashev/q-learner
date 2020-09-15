module.exports = testEnv =>{
    QUnit.module("environment-repository");
    QUnit.test("getByQuery", assert =>{
        let createdFromCriterion = new testEnv.CriterionBuilder()
            .setOperatorName("gte")
            .setExpectedValue(Date.UTC(2020,0,2, 16, 32,0))
            .setFieldName("createdAt")
            .build();
        let createdUntilCriterion = new testEnv.CriterionBuilder()
            .setOperatorName("lte")
            .setExpectedValue(Date.UTC(2020, 0, 2, 16, 33, 0))
            .setFieldName("createdAt")
            .build();
        let query = new testEnv.CriteriaBuilder(createdFromCriterion)
            .and(createdUntilCriterion)
            .build();
        assert.strictEqual(query.asSql([["createdAt", "created"]]).toLowerCase(), " created >= 1577982720000 and created <= 1577982780000", "Query transformation to SQL statement works")
        let environments = testEnv.environmentRepository.getByQuery(query);
        assert.strictEqual(environments.length, 153, " 153 Environments records received.");

        let firstEnvironment = environments[0];
        assert.strictEqual(firstEnvironment.getSymbol(), "_MSFT", "First Environment symbol is _MSFT");
        assert.strictEqual(firstEnvironment.getCreatedAt(), 1577982720000, "First Environment created timestamp is 1577982720000");
        assert.strictEqual(firstEnvironment.getParameters().length, 7, "First Environment has 7 parameters");
        assert.strictEqual(firstEnvironment.getParameter("bid").getValue(), "158.310000000000002274");
    });
}