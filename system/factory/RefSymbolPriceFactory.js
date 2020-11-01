/*
Референсная цена акции - это среднее курса покупки и курса продажи.
 */
module.exports = (refEnvironment)=>{
    const bid = refEnvironment.getParameter("bid").getValue();
    const ask = refEnvironment.getParameter("ask").getValue();
    return (bid + ask)/2;
}