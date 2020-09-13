const Validator = require("./Validator");
module.exports.Builder = OperatorExpressionBuilder;

/**
 *
 * @constructor
 */
function OperatorExpressionBuilder(){
    let _Operator;
    let _isNot= false;
    let _expectedValue;
    this.eq = ()=>{
        _Operator = Equal;
        return this;
    };
    this.gte = ()=>{
        _Operator = Gte;
        return this;
    };
    this.gt = ()=>{
        _Operator = Gt;
        return this;
    };
    this.lt = ()=>{
        _Operator = Lt;
        return this;
    };
    this.lte = ()=>{
        _Operator = Lte;
        return this;
    };
    this.not = ()=>{
        _isNot = true;
        return this;
    };
    this.match = ()=>{
        _Operator = Match;
        return this;
    };
    this.contains = ()=>{
        _Operator = Contains;
        return this;
    };
    this.expect = value =>{
        _expectedValue = value;
        return this;
    };
    this.build = ()=>{
        Validator.isDefined("Operator Expression. Excepted Value", _expectedValue);
        let result;
        if(_isNot && !_Operator) {
            //Equal.prototype = base;
            result = new Not(new Equal(_expectedValue));
        }
        if(_isNot && _Operator) {
            //_Operator.prototype = base;
            result = new Not(new _Operator(_expectedValue));
        }
        if(!_isNot && _Operator) {
            //_Operator.prototype = base;
            result = new _Operator(_expectedValue);
        }
        if(!_isNot && !_Operator) {
            //Equal.prototype = base;
            result = new Equal(_expectedValue);
        }
        return result
    };
}

function Equal(expected) {
    this.evaluate = actual =>{
        return actual === expected;
    }
    this.asSql = ()=>{
        return ` = ${sqlNumberOrString(expected)}`
    };
    this.expected = ()=>{
        return expected;
    };
}
function Gte(expected){
    this.evaluate = actual =>{
        return actual >= expected;
    };
    this.asSql = ()=>{
        return ` >= ${sqlNumberOrString(expected)}`;
    };
    this.expected = ()=>{
        return expected;
    };
}
function Gt(expected) {
    this.evaluate = actual =>{
        return actual > expected;
    };
    this.asSql = ()=>{
        return ` > ${sqlNumberOrString(expected)}`;
    };
    this.expected = ()=>{
        return expected;
    };
}
function Lte(expected){
    this.evaluate = actual =>{
        return actual <= expected;
    };
    this.asSql = ()=>{
        return ` <= ${sqlNumberOrString(expected)}`;
    };
    this.expected = ()=>{
        return expected;
    };
}
function Lt(expected) {
    this.evaluate = actual =>{
        return actual < expected;
    };
    this.asSql = ()=>{
        return ` < ${sqlNumberOrString(expected)}`;
    };
    this.expected = ()=>{
        return expected;
    };
}
function Not(operator){
    this.evaluate = actual =>{
        return !operator.evaluate(actual);
    };
    this.asSql = ()=>{
        return operator.constructor.name === "Equal" ? ` not ${sqlNumberOrString(operator.expected())}` : ` not${operator.asSql()}`;
    };
}
function Match(expected) {
    this.evaluate = actual =>{
        if(typeof expected === "string"){
            let expression = expected.split(",")[0];
            let flags = expected.split(",")[1];
            let regexp = new RegExp(expression, flags);
            return actual.match(regexp) !== null;
        }
        return false;
    };
    this.asSql = ()=>{
        return ` glob ${sqlNumberOrString(expected)}`;
    };
    this.expected = ()=>{
        return expected;
    };
}
function Contains(expected) {
    this.evaluate = actual =>{
        return actual.indexOf(expected) >= 0;
    };
    this.asSql = ()=>{
        return ` like '%${expected}%'` ;
    };
    this.expected = ()=>{
        return expected;
    };
}
function sqlNumberOrString(value){
    return `${typeof value === "string" ? `'${value}'` : value}`;
}