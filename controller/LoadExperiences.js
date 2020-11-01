const LoadExperiencesRequestFactory = require("../system/factory/LoadExperiencesRequestFactory");
module.exports = LoadExperiences;
function LoadExperiences(qLearner, userRequest){
    /*
    Просим ее создать виртуальные ордера
     */
    const createOrdersRequest = new CreateVirtualOrderRequestFactory().create(userRequest);
    const orders = qLearner.createVirtualOrders(createOrdersRequest);
    /*
    Просим ее записать эти ордера в базу
     */
    qLearner.saveVirtualOrders(orders);
}