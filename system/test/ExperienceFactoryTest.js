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
        this.currentEnvironment = this.environmentApp.getById("environment-_MSFT-1577982780476");
        this.refEnvironment = this.environmentApp.getById("environment-_MSFT-1577982720779");
        this.experience = this.experienceFactory.create(this.currentEnvironment, this.refEnvironment);
        assert.strictEqual(this.experience.getId(), "environment-_MSFT-1577982780476-environment-_MSFT-1577982720779");
    });
    QUnit.test("The value of experience parameter is Current_Env_Parameter_i - Ref_Env_Parameter_j", assert =>{
        const currentMa10 = this.currentEnvironment.getParameter("ma10");
        const refMa160 = this.refEnvironment.getParameter("ma160");
        const experienceParameterValue = currentMa10.getValue() - refMa160.getValue();
        const experienceParameterMa10Ma160 = this.experience.getParameter("current-ma10-ref-ma160");
        assert.strictEqual(experienceParameterMa10Ma160.getValue(), experienceParameterValue);
    })
    QUnit.test("The number of parameters in one experience is SUM(7..1) when Environment parameter count is 7", assert =>{
        /*
        Мы считаем разность current(i) - ref(j) только для тех j, которые больше или равны i.
        Таким образом получается что если i = j = 7, то для i = 1 мы пройдем по j от 1 до 7 (всего 7).
        Для i = 2  мы пройдем по j  от 2 до 7 (всего 6).
        То есть кол-во параметров будет 7+6+5...+2+1 = 28.
         */
        const experienceParameterLength = this.currentEnvironment.getParameters().reduce((acc, param, index)=>{
            acc += (index+1);
            return acc;
        },0);
        assert.strictEqual(this.experience.getParameters().length, experienceParameterLength);
    })
}