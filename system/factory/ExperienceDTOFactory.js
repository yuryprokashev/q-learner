const ExperienceDTO = require("../model/dto/ExperienceDTO");
const ParameterDTOFactory = require("./ParameterDTOFactory");
module.exports = ExperienceDTOFactory;
function ExperienceDTOFactory(){
    const _paramFactory = new ParameterDTOFactory();
    this.create = (experience, virtualOrderId) =>{
        const parameterDTOs = experience.getParameters().map(param =>{
            return _paramFactory.create(param);
        });
        return new ExperienceDTO(
            experience.getId(),
            experience.getCurrentEnvironment().getId(),
            experience.getReferenceEnvironment().getId(),
            virtualOrderId,
            experience.getCode(),
            parameterDTOs
        );
    };
}