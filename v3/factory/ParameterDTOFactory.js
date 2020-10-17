const ParameterDTO = require("../model/ParameterDTO");
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