module.exports = (refEnvironment)=>{
    return (refEnvironment.getParameter("bid").getValue() + refEnvironment.getParameter("ask").getValue())/2;
}