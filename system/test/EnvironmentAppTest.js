const EnvironmentApp = require("../apps/EnvironmentApp");

module.exports = (io)=>{
    QUnit.module("environment-app", {
        before: ()=>{
            this.environmentApp = new EnvironmentApp(io);
        }
    });
    QUnit.test("Can find environments by created date", assert =>{
        const start = 1577982720000;
        const end = 1577982721948;
        const environments = this.environmentApp.getByCreatedDate(start, end);
        assert.strictEqual(environments.length, 6);
    });
    QUnit.test("Can get environment by id", assert =>{
        const environment = this.environmentApp.getById("environment-_MSFT-1577982720000");
        assert.strictEqual(environment.getId(), "environment-_MSFT-1577982720000");
        assert.strictEqual(environment.getParameter("bid").getValue(), 158.310000000000002274);
    });
    QUnit.test("Can get reference environment by current Environment and reference delta T", assert =>{
         const currentEnvironment = this.environmentApp.getById("environment-_MSFT-1577982780476");
         const refEnvironment = this.environmentApp.getReferenceEnvironment(currentEnvironment, 60000);
         assert.strictEqual(refEnvironment.getId(), "environment-_MSFT-1577982720779");
    });
};