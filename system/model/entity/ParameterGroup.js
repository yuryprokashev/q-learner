module.exports = ParameterGroup;
function ParameterGroup(parameters){
    const _paramMap = new Map();
    const _paramNames = [];
    parameters.forEach(p=>{
        _paramMap.set(p.getName(), p);
        _paramNames.push(p.getName());
    });
    this.all = ()=>{
        return parameters;
    };
    this.get = name =>{
        return _paramMap.get(name);
    };
    this.indexOf = name =>{
        return _paramNames.indexOf(name);
    };
    this.names = ()=>{
        return _paramNames;
    };
}