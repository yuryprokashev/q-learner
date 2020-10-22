/*
Референсная цена акции - это среднее курса покупки и курса продажи.
 */
module.exports = (refEnvironment)=>{
    return (refEnvironment.getParameter("bid").getValue() + refEnvironment.getParameter("ask").getValue())/2;
}