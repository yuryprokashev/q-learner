const LoadExperiencesRequestFactory = require("../system/factory/LoadExperiencesRequestFactory");
module.exports = LoadExperiences;
function LoadExperiences(qLearner, userRequest){
    /*
    Просим ее создать виртуальные ордера
     */
    const loadExperiencesRequest = new LoadExperiencesRequestFactory().create(userRequest);
    const result = qLearner.loadExperiences(loadExperiencesRequest);
}