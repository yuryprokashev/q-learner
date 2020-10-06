const Validator = require("./Validator");
module.exports.Builder = ExecutionChainBuilder;

/**
 *
 * @constructor
 */
function ExecutionChainBuilder(){
    const _executors = [];
    let _method;
    let _isParallel = false;
    this.addExecutor = executor =>{
        _executors.push(executor);
        return this;
    };
    this.addMethod = str =>{
        _method = str;
        return this;
    };
    this.setParallel = bool =>{
        _isParallel = bool;
        return this;
    };
    this.build = ()=>{
        return new ExecutionChain(_executors, _method, _isParallel)
    };
}

/**
 *
 * @param executors
 * @param method
 * @param isParallel
 * @constructor
 */
function ExecutionChain(executors, method, isParallel){
    this.execute = input =>{
        let result = isParallel ? [] : input;
        for(let i = 0; i < executors.length; i++){
            const currentExecutor = executors[i];
            Validator.isDefined("Executor Method: " + method,currentExecutor[method]);
            if(isParallel) result.push(currentExecutor[method](input));
            if(!isParallel) result = currentExecutor[method](result);
        }
        return result;
    };
}