module.exports = environments =>{
    const risk = {buy: 0, sell: 0};
    /*
    Bid всегда меньше, чем Ask.
    Когда я Покупатель, я, покупаю за  Ask, а продаю за Bid. Тогда мой риск - это цена входа минус минимальная
    цена выхода - то есть минимум из всех Bid. Чем ниже потенциальная цена выхода, тем выше мой риск.
    Когда я Продавец, я прокупаю за Bid, а продаю за Ask. Тогда мой риск - это максимальная потенциальная цена
    выхода минус цена входа. Чем выше потенциальная цена выхода, тем выше мой риск.
     */
    const allBids = environments.map(e =>{
        return e.getParameter("bid").getValue();
    });
    const minBid = Math.min(...allBids);

    const allAsks = environments.map(e =>{
        return e.getParameter("ask").getValue();
    });
    const maxAsk = Math.max(...allAsks);

    /*
    Now when computing the Buy risk, our entry price is the ask of the first environment.
    Whilst, when computing the Sell risk, our entry price is the bid of the first environment.
     */
    const environmentAtOrderExecution = environments[0];
    const entryBuy = environmentAtOrderExecution.getParameter("ask").getValue();
    const entrySell = environmentAtOrderExecution.getParameter("bid").getValue();

    /*
    Finally setting the risk.
    Для Покупателя: когда entry Buy > minBid, я теряю деньги. Тогда риск положителен и растет с падением minBid
    Для Продавца: когда maxAsk > entrySell, я теряю деньги. Тогда риск положителен и растет с ростом maxAsk.
     */
    risk.buy = entryBuy - minBid;
    risk.sell = maxAsk - entrySell;
    /*
    Главное: расчитанный таким образом Риск чем выше, тем более рискованно входить.
    Отрицательный Риск в этом случае - это отсутствие риска вообще.
     */
    return risk;
}