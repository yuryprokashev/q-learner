const Validator = require("./Validator");
module.exports.Builder = BatchExecutorBuilder;

/**
 *
 * @constructor
 */
function BatchExecutorBuilder(){
    const _executors = [];
    let _method;
    let _isChain = false;
    this.addExecutor = executor =>{
        _executors.push(executor);
        return this;
    };
    this.addMethod = str =>{
        _method = str;
        return this;
    };
    this.chain = bool =>{
        _isChain = bool;
        return this;
    };
    this.build = ()=>{
        Validator.mustBeTrue(_executors.length > 0, "Execution Chain does not have any executors to run");
        Validator.isDefined("Executor Method Name", _method);
        return new BatchExecutor(_executors, _method, _isChain);
    };
}

/**
 *
 * @param executors
 * @param method
 * @param isChain
 * @constructor
 */
function BatchExecutor(executors, method, isChain){
    this.execute = input =>{
        if(isChain) return executeChain(executors, method, input);
        if(!isChain) return  executeBatch(executors, method, input);
    };
}
function executeBatch(executors, method, input){
    const result = [];
    for(let i = 0; i < executors.length; i++){
        const currentExecutor = executors[i];
        Validator.isDefined("Executor Method: " + method,currentExecutor[method]);
        result.push(currentExecutor[method](input));
    }
    return result;
}
function executeChain(executors, method, input){
    let result = input;
    for(let i = 0; i < executors.length; i++){
        const currentExecutor = executors[i];
        Validator.isDefined("Executor Method: " + method,currentExecutor[method]);
        result = currentExecutor[method](result);
    }
    return result;
}