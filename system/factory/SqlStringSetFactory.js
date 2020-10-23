module.exports = strings =>{
    return strings.reduce((acc, str)=>{
        if(!acc.includes(str)) acc.push(`'${str}'`);
        return acc;
    }, []).join(", ");
}