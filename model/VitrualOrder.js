module.exports.Builder = VirtualOrderBuilder;

/**
 *
 * @constructor
 */
function VirtualOrderBuilder(){
    let _id, _timeslot, _orderSentEnvironment, _orderExecutedEnvironment, _reward;
    this.setId = str =>{
        _id = str;
        return this;
    };
    this.setTimeslot = timeslot =>{
        _timeslot = timeslot;
        return this;
    };
    this.setOrderSentEnvironment = environment =>{
        _orderSentEnvironment = environment;
        return this;
    };
    this.setOrderExecutedEnvironment = environment =>{
        _orderExecutedEnvironment = environment;
        return this;
    };
    this.setReward = reward =>{
        _reward = reward;
        return this;
    };
    this.build = ()=>{
        return new VirtualOrder(_id, _timeslot, _orderSentEnvironment, _orderExecutedEnvironment, _reward);
    };
}

/**
 * Виртуальный ордер помогает рассчитать награду для стратегий Продавец и Покупатель.
 * Виртуальный ордер имеет точку отправки и точку исполнения. В реальном мире это две разные точки.
 * Каждая такая точка - это объект типа Environment.
 * @param id
 * @param timeslot
 * @param orderSentEnvironment
 * @param orderExecutedEnvironment
 * @param reward
 * @constructor
 */
function VirtualOrder(id, timeslot, orderSentEnvironment, orderExecutedEnvironment,  reward){
    this.getId = ()=>{
        return id;
    };
    this.getExecutionDelay = ()=>{
        return orderExecutedEnvironment.getCreatedAt() - orderSentEnvironment.getCreatedAt();
    };
    this.getOrderSentEnvironment = ()=>{
        return orderSentEnvironment
    };
    this.getOrderExecutedEnvironment = ()=>{
        return orderExecutedEnvironment;
    };
    this.getReward = type =>{
        return reward[type];
    };
}