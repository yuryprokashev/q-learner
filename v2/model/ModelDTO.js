module.exports = ModelDTO;

/**
 * Abstract container DTO to pass models around.
 * @param name {string} - the modelDto name.
 * @param modelDto {Object} - specific DTO of the modelDto.
 * @constructor
 */
function ModelDTO(name, modelDto){
    this.name = name;
    this.dto = modelDto;
}