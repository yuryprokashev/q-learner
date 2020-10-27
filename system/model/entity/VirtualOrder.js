const ParameterGroup = require("./ParameterGroup");
module.exports = VirtualOrder;

/**
 * Виртуальный ордер помогает рассчитать награду для стратегий Продавец и Покупатель.
 * Виртуальный ордер имеет точку отправки и точку исполнения. В реальном мире это две разные точки.
 * Каждая такая точка - это объект типа Environment.
 * @param id
 * @param orderSentEnvironment
 * @param orderExecutedEnvironment
 * @param parameterGroup
 * @constructor
 */
function VirtualOrder(id, orderSentEnvironment, orderExecutedEnvironment,  parameterGroup){
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
    this.getParameter = name =>{
        return parameterGroup.get(name);
    };
    this.getParameters = ()=>{
        return parameterGroup.all();
    };
    this.getSentAt = ()=>{
        return orderSentEnvironment.getCreatedAt();
    };
    this.getExecutedAt = ()=>{
        return orderExecutedEnvironment.getCreatedAt();
    };
}