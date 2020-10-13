module.exports = RepositoryContext;

/**
 * Facilitates access to the specific model DTOs based on their name, so factory can quickly fetch required models
 * for further transformations.
 * @param models {ModelDTO[]} - abstract container of the model DTO.
 * @constructor
 */
function RepositoryContext(models) {
    this.models = models;
}