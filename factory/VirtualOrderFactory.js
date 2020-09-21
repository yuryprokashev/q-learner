const VirtualOrderBuilder = require("../model/VitrualOrder").Builder;
module.exports = VirtualOrderFactory;

function VirtualOrderFactory(){
    this.fromTimeBucket = (timeBucket, executionDelay) =>{
        let delay = executionDelay || 0;
        let firstEnv = timeBucket.getObjects()[0];
        let symbol = firstEnv.getSymbol();
        let sent = firstEnv.getCreatedAt();
        let duration = timeBucket.getTimeslot().getDuration();
        let id = _virtualOrderId(symbol, sent, duration,delay);
        let reward = _computeReward(timeBucket.getObjects(), delay);
        let orderExecutedEnvironment = _getOrderExecutedEnvironment(timeBucket.getObjects(), delay);
        let orderSentEnvironment = _getOrderSentEnvironment(timeBucket.getObjects());
        return new VirtualOrderBuilder()
            .setId(id)
            .setOrderSentEnvironment(orderSentEnvironment)
            .setOrderExecutedEnvironment(orderExecutedEnvironment)
            .setTimeslot(timeBucket.getTimeslot())
            .setReward(reward)
            .build();
    };
    function _virtualOrderId(symbol, sent, duration, executionDelay){
        return `v-order-${symbol}-${sent}-${duration}-${executionDelay}`;
    }
    function _computeReward(environments, executionDelay){
        let reward = {buy: 0, sell: 0};
        /*
        Bid is always less than Ask.
        When we play Buy, we exit on Bid. So the larger the Bid - the better. =>we need to find the max bid.
        Whilst when we play Sell, we exit on Ask. So the lower the Ask - the better. => we need to find the min ask.
         */
        let allBids = environments.map(e =>{
            return e.getParameter("bid").getValue();
        });
        let maxBid = Math.max(...allBids);

        let allAsks = environments.map(e =>{
            return e.getParameter("ask").getValue();
        });
        let minAsk = Math.min(...allAsks);

        /*
        Now when computing the Buy reward, our entry price is the ask of the first environment.
        Whilst, when computing the Sell reward, our entry price is the bid of the first environment.
         */
        let environmentAtOrderExecution = _getOrderExecutedEnvironment(environments, executionDelay);
        let entryBuy = environmentAtOrderExecution.getParameter("ask").getValue();
        let entrySell = environmentAtOrderExecution.getParameter("bid").getValue();

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