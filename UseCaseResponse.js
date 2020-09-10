module.exports.Builder = UseCaseResponseBuilder;

/**
 *
 * @constructor
 */
function UseCaseResponseBuilder(){
    let _logs = [];
    let _dataSet;
    let _dataAdded;
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
    this.build = ()=>{
        if(_dataAdded && _dataSet) throw new Error("Use either .addData or .setData, not both.");
        let data;
        if(_dataSet) data = _dataSet;
        if(_dataAdded) data = _dataAdded;
        return new UseCaseResponse(data, _logs);
    };
}

/**
 *
 * @constructor
 */
function UseCaseResponse(data, logs){
    this.getData = ()=>{
        return data;
    };
    this.getLogs = ()=>{
        return logs;
    };
}