module.exports = VirtualOrder;
function VirtualOrder(timeslot, environments){
    let _reward;
    this.getReward = type =>{
        if(!_reward) _init();
        return _reward[type];
    };
    function _init(){
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
        let firstE = environments[0];
        let entryBuy = firstE.getParameter("ask").getValue();
        let entrySell = firstE.getParameter("bid").getValue();

        /*
        Finally setting the reward.
        For Buy: when maxBid > entry Buy, then we may have an exit with profit. So buy reward is maxBid - entryBuy.
        For Sell: when entrySell > minAsk, then we may have an exit with profit. So sell reward is entrySell - minAsk.
         */
        _reward.buy = maxBid - entryBuy;
        _reward.sell = entrySell - minAsk;
    }
}