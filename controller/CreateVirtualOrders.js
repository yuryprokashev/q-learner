const CreateVirtualOrderRequestFactory = require("../factory/CreateVirtualOrderRequestFactory");
const QLearnerFacade = require("../QLearner");
module.exports = CreateVirtualOrders;
function CreateVirtualOrders(env, userRequest){
    /*
    Создаем фасад системы
     */
    const qLearnerFacade = new QLearnerFacade(env);
    /*
    Просим ее создать виртуальные ордера
     */
    const createOrdersRequest = new CreateVirtualOrderRequestFactory().create(userRequest);
    const orders = qLearnerFacade.createVirtualOrders(createOrdersRequest);
    /*
    Просим ее записать эти ордера в базу
     */
    qLearnerFacade.saveVirtualOrders(orders);
}