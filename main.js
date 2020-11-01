const LoadExperiencesUserRequest = require("./controller/LoadExperiencesUserRequest");
const LoadExperiences = require("./controller/LoadExperiences");
const QLearnerFacade = require("./system/QLearner");

const userRequest = new LoadExperiencesUserRequest("2020-01-02", 0, 10, 1, 20);
const qLearner = new QLearnerFacade("prod");
LoadExperiences(qLearner, userRequest);