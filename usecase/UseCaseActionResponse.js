module.exports.Builder = UseCaseActionResponseBuilder;

/**
 *
 * @constructor
 */
function UseCaseActionResponseBuilder(){
    let _data;
    let _logs = [];
    this.setData = obj =>{
        _data = obj;
        return this;
    };
    this.addLog = str =>{
        _logs.push(str);
        return this;
    };
    this.build = ()=>{
        return new UseCaseActionResponse(_data, _logs);
    }
}

/**
 *
 * @param data
 * @param logs
 * @constructor
 */
function UseCaseActionResponse(data, logs){
    this.getData = ()=>{
        return data;
    };
    this.getLogs = ()=>{
        return logs;
    };
}