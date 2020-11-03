module.exports = ExperienceDTO;
function ExperienceDTO(id, currentEnvId, refEnvId, virtualOrderId, code, parameters){
    this.id = id;
    this.currentEnvironmentId = currentEnvId;
    this.referenceEnvironmentId = refEnvId;
    this.virtualOrderId = virtualOrderId;
    this.code = code;
    this.parameters = parameters;
}