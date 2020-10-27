const Experience = require("../model/entity/Experience");
const ExperienceCodeFactory = require("./ExperienceCodeFactory");
const ExperienceParametersFactory = require("./ExperienceParameterGroupFactory");
const ExperienceIdFactory = require("./ExperienceIdFactory");
module.exports = ExperienceFactory;

function ExperienceFactory(){
    const _experienceParameterFactory = new ExperienceParametersFactory();
    const _experienceCodeFactory = new ExperienceCodeFactory();
    /**
     * @param currentEnvironment{Environment}
     * @param referenceEnvironment{Environment}
     * @return {Experience}
     */
    this.create = (currentEnvironment, referenceEnvironment)=>{
        const parameters = _experienceParameterFactory.create(currentEnvironment, referenceEnvironment);
        const code = _experienceCodeFactory.create(parameters.all());
        const id = ExperienceIdFactory(currentEnvironment.getId(), referenceEnvironment.getId());
        return new Experience(id, currentEnvironment, referenceEnvironment, parameters, code);
    };
}