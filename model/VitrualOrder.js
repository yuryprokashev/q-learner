module.exports = VirtualOrder;

/**
 * Виртуальный ордер помогает рассчитать награду для стратегий Продавец и Покупатель.
 * Виртуальный ордер имеет точку отправки и точку исполнения. В реальном мире это две разные точки.
 * Каждая такая точка - это объект типа Environment.
 * @param id
 * @param timeslot
 * @param environments
 * @param executionDelay
 * @constructor
 */
function VirtualOrder(id, timeslot, environments, executionDelay){
    let _reward;
    let _executionDelay = executionDelay || 0;
    this.getId = ()=>{
        return id;
    };
    this.getExecutionDelay = ()=>{
        return _executionDelay;
    };
    this.getOrderSentEnvironment = ()=>{
        return _getOrderSentEnvironment();
    };
    this.getOrderExecutedEnvironment = ()=>{
        return _getOrderExecutedEnvironment();
    };
    this.getReward = type =>{
        if(!_reward) _computeReward();
        return _reward[type];
    };
    function _computeReward(){
        _reward = {buy: 0, sell: 0};
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
        let environmentAtOrderExecution = _getOrderExecutedEnvironment();
        let entryBuy = environmentAtOrderExecution.getParameter("ask").getValue();
        let entrySell = environmentAtOrderExecution.getParameter("bid").getValue();

        /*
        Finally setting the reward.
        For Buy: when maxBid > entry Buy, then we may have an exit with profit. So buy reward is maxBid - entryBuy.
        For Sell: when entrySell > minAsk, then we may have an exit with profit. So sell reward is entrySell - minAsk.
         */
        _reward.buy = maxBid - entryBuy;
        _reward.sell = entrySell - minAsk;
    }
    function _getOrderExecutedEnvironment(){
        let currentEnvironment;
        for(let i = 0; i < environments.length; i++){
            currentEnvironment = environments[i];
            if(currentEnvironment.getCreatedAt() >= _getOrderSentEnvironment().getCreatedAt() + _executionDelay) {
                break;
            }
        }
        return currentEnvironment;
    }
    function _getOrderSentEnvironment(){
        return environments[0];
    }
}