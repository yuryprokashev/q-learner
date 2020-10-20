const ExperienceFactory = require("../factory/ExperienceFactory");
const EnvironmentApp = require("../apps/EnvironmentApp");
module.exports = (io)=>{
    QUnit.module("experience-factory", {
        before: ()=>{
            this.experienceFactory = new ExperienceFactory();
            this.environmentApp = new EnvironmentApp(io);
        }
    });
    QUnit.test("Can create Experience from current Environment and Reference Environment", assert =>{
        const currentEnvironment = this.environmentApp.getById("environment-_MSFT-1577982780476");
        const refEnvironment = this.environmentApp.getById("environment-_MSFT-1577982720779");
        const experience = this.experienceFactory.create(currentEnvironment, refEnvironment);
        assert.strictEqual(experience.getId(), "environment-_MSFT-1577982780476-environment-_MSFT-1577982720779");

        const currentMa10 = currentEnvironment.getParameter("ma10");
        const refMa160 = refEnvironment.getParameter("ma160");
        const delta = currentMa10.getValue() - refMa160.getValue();
        const experienceParameterMa10Ma160 = experience.getParameter("current-ma10-ref-ma160");
        assert.strictEqual(experienceParameterMa10Ma160.getValue(), delta);

        const experienceParameterLength = currentEnvironment.getParameters().reduce((acc, param, index)=>{
            acc += (index+1);
            return acc;
        },0);
        assert.strictEqual(experience.getParameters().length, experienceParameterLength);
    });
}