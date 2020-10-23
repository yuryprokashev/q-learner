const ParameterFactory = require("./ParameterFactory");
const VirtualOrderBuilder = require("../model/entity/VirtualOrder").Builder;
module.exports = VirtualOrderFactory;

function VirtualOrderFactory(){
    const _paramFactory = new ParameterFactory();
    this.fromTimeBucket = (timeBucket, executionDelay) =>{
        const delay = executionDelay || 0;
        const firstEnv = timeBucket.getObjects()[0];
        const symbol = firstEnv.getSymbol();
        const sent = firstEnv.getCreatedAt();
        const duration = timeBucket.getTimeslot().getDuration();
        const id = _virtualOrderId(symbol, sent, duration,delay);
        const reward = _computeReward(timeBucket.getObjects(), delay);
        const buyParameterObject = {parentId: id, name: `buy-reward`, value: reward.buy};
        const sellParameterObject = {parentId: id, name: `sell-reward`, value: reward.sell};
        const rewardParameters = {
            buy: _paramFactory.fromObject(buyParameterObject),
            sell: _paramFactory.fromObject(sellParameterObject)
        };
        const orderExecutedEnvironment = _getOrderExecutedEnvironment(timeBucket.getObjects(), delay);
        const orderSentEnvironment = _getOrderSentEnvironment(timeBucket.getObjects());
        return new VirtualOrderBuilder()
            .setId(id)
            .setOrderSentEnvironment(orderSentEnvironment)
            .setOrderExecutedEnvironment(orderExecutedEnvironment)
            .addReward("buy", rewardParameters.buy)
            .addReward("sell", rewardParameters.sell)
            .build();
    };
    function _virtualOrderId(symbol, sent, duration, executionDelay){
        return `v-order-${symbol}-${sent}-${duration/1000}-${executionDelay}`;
    }
    function _computeReward(environments, executionDelay){
        const reward = {buy: 0, sell: 0};
        /*
        Bid is always less than Ask.
        When we play Buy, we exit on Bid. So the larger the Bid - the better. =>we need to find the max bid.
        Whilst when we play Sell, we exit on Ask. So the lower the Ask - the better. => we need to find the min ask.
         */
        const allBids = environments.map(e =>{
            return e.getParameter("bid").getValue();
        });
        const maxBid = Math.max(...allBids);

        const allAsks = environments.map(e =>{
            return e.getParameter("ask").getValue();
        });
        const minAsk = Math.min(...allAsks);

        /*
        Now when computing the Buy reward, our entry price is the ask of the first environment.
        Whilst, when computing the Sell reward, our entry price is the bid of the first environment.
         */
        const environmentAtOrderExecution = _getOrderExecutedEnvironment(environments, executionDelay);
        const entryBuy = environmentAtOrderExecution.getParameter("ask").getValue();
        const entrySell = environmentAtOrderExecution.getParameter("bid").getValue();

        /*
        Finally setting the reward.
        For Buy: when maxBid > entry Buy, then we may have an exit with profit. So buy reward is maxBid - entryBuy.
        For Sell: when entrySell > minAsk, then we may have an exit with profit. So sell reward is entrySell - minAsk.
         */
        reward.buy = maxBid - entryBuy;
        reward.sell = entrySell - minAsk;
        return reward;
    }
    function _getOrderExecutedEnvironment(environments, executionDelay){
        let currentEnvironment;
        for(let i = 0; i < environments.length; i++){
            currentEnvironment = environments[i];
            if(currentEnvironment.getCreatedAt() >= _getOrderSentEnvironment(environments).getCreatedAt() + executionDelay) {
                break;
            }
        }
        return currentEnvironment;
    }
    function _getOrderSentEnvironment(environments){
        return environments[0];
    }
}