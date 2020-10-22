module.exports.Builder = VirtualOrderBuilder;
module.exports.Constructor = VirtualOrder;

/**
 *
 * @constructor
 */
function VirtualOrderBuilder(){
    let _id, _orderSentEnvironment, _orderExecutedEnvironment;
    const _reward = {};
    this.setId = str =>{
        _id = str;
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
    this.addReward = (type, value) =>{
        _reward[type] = value;
        return this;
    };
    this.build = ()=>{
        return new VirtualOrder(_id, _orderSentEnvironment, _orderExecutedEnvironment, _reward);
    };
}

/**
 * Виртуальный ордер помогает рассчитать награду для стратегий Продавец и Покупатель.
 * Виртуальный ордер имеет точку отправки и точку исполнения. В реальном мире это две разные точки.
 * Каждая такая точка - это объект типа Environment.
 * @param id
 * @param orderSentEnvironment
 * @param orderExecutedEnvironment
 * @param reward
 * @constructor
 */
function VirtualOrder(id, orderSentEnvironment, orderExecutedEnvironment,  reward){
    this.getId = ()=>{
        return id;
    };
    this.getSymbol = ()=>{
        return orderSentEnvironment.getSymbol();
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