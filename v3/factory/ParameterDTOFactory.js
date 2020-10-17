const ParameterDTO = require("../model/dto/ParameterDTO");
module.exports = ParameterDTOFactory;
function ParameterDTOFactory(){
    this.create = parameter =>{
        return new ParameterDTO(
            parameter.getId(),
            parameter.getName(),
            parameter.getValue(),
            parameter.getParentId()
        );
    };
}