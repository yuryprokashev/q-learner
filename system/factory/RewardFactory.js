module.exports = environments =>{
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
    const environmentAtOrderExecution = environments[0];
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