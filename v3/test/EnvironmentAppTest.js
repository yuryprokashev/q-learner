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
};