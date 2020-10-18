const CreateVirtualOrdersUserRequest = require("./controller/CreateVirtualOrdersUserRequest");
const CreateVirtualOrders = require("./controller/CreateVirtualOrders");
const QLearnerFacade = require("./system/QLearner");

const userRequest = new CreateVirtualOrdersUserRequest("2020-01-02", 0, 10, 1, 20);
const qLearner = new QLearnerFacade("prod");
CreateVirtualOrders(qLearner, userRequest);