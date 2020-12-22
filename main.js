const LoadExperiencesUserRequest = require("./controller/LoadExperiencesUserRequest");
const LoadExperiences = require("./controller/LoadExperiences");
const QLearnerFacade = require("./system/QLearner");

const userRequest = new LoadExperiencesUserRequest("2020-01-30", 0, 20, 1, 200);
const qLearner = new QLearnerFacade("prod");
LoadExperiences(qLearner, userRequest);