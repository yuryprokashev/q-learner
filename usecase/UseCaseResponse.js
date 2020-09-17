module.exports.Builder = UseCaseResponseBuilder;

/**
 *
 * @constructor
 */
function UseCaseResponseBuilder(userRequest){
    let _logs = [];
    let _dataSet;
    let _dataAdded;
    let _error;
    this.addLog = str =>{
        _logs.push(str);
        return this;
    };
    this.setData = obj =>{
        _dataSet = obj;
        return this;
    };
    this.addData = (key, obj)=>{
        if(!_dataAdded) _dataAdded = {};
        _dataAdded[key]=obj;
        return this;
    };
    this.setError = error =>{
        _error = {message: error.message, stack: error.stack};
        return this;
    };
    this.build = ()=>{
        if(_dataAdded && _dataSet) throw new Error("Use either .addData or .setData, not both.");
        let data;
        if(_dataSet) data = _dataSet;
        if(_dataAdded) data = _dataAdded;
        return new UseCaseResponse(userRequest, data, _logs, _error);
    };
}

/**
 *
 * @constructor
 */
function UseCaseResponse(userRequest, data, logs, error){
    this.getUserRequest = ()=>{
        return userRequest;
    };
    this.getData = ()=>{
        return data;
    };
    this.getLogs = ()=>{
        return logs;
    };
    this.getError = ()=>{
        return error;
    };
}