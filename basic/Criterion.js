const Validator = require("./Validator");
const OperatorExpressionBuilder = require("./OperatorExpression").Builder;
module.exports.Builder = CriterionBuilder;
/**
 *
 * @constructor
 */
function CriterionBuilder() {
    let _objectFieldName;
    const _operatorExpressionBuilder = new OperatorExpressionBuilder();
    this.setFieldName = str =>{
        _objectFieldName = str;
        return this;
    };
    this.setExpectedValue = value =>{
        _operatorExpressionBuilder.expect(value);
        return this;
    };
    this.setOperatorName = str => {
        Validator.isDefined("Operator Name", _operatorExpressionBuilder[str], "Operator Expression Builder does not support: " + str);
        _operatorExpressionBuilder[str]();
        return this;
    };
    this.eq = ()=>{
        _operatorExpressionBuilder.eq();
        return this;
    };
    this.gte = ()=>{
        _operatorExpressionBuilder.gte();
        return this;
    };
    this.gt = ()=>{
        _operatorExpressionBuilder.gt();
        return this;
    };
    this.lt = ()=>{
        _operatorExpressionBuilder.lt();
        return this;
    };
    this.lte = ()=>{
        _operatorExpressionBuilder.lte();
        return this;
    };
    this.not = ()=>{
        _operatorExpressionBuilder.not();
        return this;
    };
    this.match = ()=>{
        _operatorExpressionBuilder.match();
        return this;
    };
    this.contains = ()=>{
        _operatorExpressionBuilder.contains();
        return this;
    };
    this.build = function () {
        let operatorExpression = _operatorExpressionBuilder.build();
        return new Criterion(_objectFieldName, operatorExpression);
    }
}

/**
 *
 * @param objectFieldName
 * @param operatorExpression
 * @constructor
 */
function Criterion(objectFieldName, operatorExpression) {
    /**
     * Evaluates if object matches this criterion.
     * @param object
     * @returns {boolean}
     */
    this.evaluate = object =>{
        let objectField = object[objectFieldName];
        let actual = typeof objectField === "function" ? objectField() : objectField;
        return operatorExpression.evaluate(actual);
    };
    /**
     *
     * @param map - the 1-to-1 Map FROM object field names TO datasource column names.
     * @returns {string}
     */
    this.asSql = map =>{
        let sqlColumnName = map.get(objectFieldName);
        return `${sqlColumnName}${operatorExpression.asSql()}`;
    };
}