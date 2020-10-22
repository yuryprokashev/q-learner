const ExperienceParameterCodeFactory = require("./ExperienceParameterCodeFactory");
module.exports = ExperienceCodeFactory;
function ExperienceCodeFactory(){
    this.create = parameters =>{
        return parameters.map(param =>{
            return ExperienceParameterCodeFactory(param.getValue());
        }).join("-");
    };
}