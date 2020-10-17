const OperatorExpression = require("../model/OperatorExpression");

module.exports = ()=>{
    QUnit.module("operator");
    QUnit.test("Equal", assert=>{
        let op = new OperatorExpression.Builder().eq().expect("expected").build();
        assert.strictEqual(op.evaluate("expected"), true);
        assert.strictEqual(op.evaluate("Expected"), false);
        assert.strictEqual(op.asSql(), " = 'expected'");
        assert.strictEqual(op.name(), "equal");

        let op2 = new OperatorExpression.Builder().expect(5).build();
        assert.strictEqual(op2.evaluate(5), true);
        assert.strictEqual(op2.evaluate("5"), false);
        assert.strictEqual(op2.asSql(), " = 5");
        assert.strictEqual(op.name(), "equal");
    });
    QUnit.test("Greater Than Or Equal", assert=>{
        let op = new OperatorExpression.Builder().expect(5).gte().build();
        assert.strictEqual(op.evaluate(5), true);
        assert.strictEqual(op.evaluate(6), true);
        assert.strictEqual(op.evaluate(4), false);
        assert.strictEqual(op.asSql(), " >= 5");
        assert.strictEqual(op.name(), "gte");
    });
    QUnit.test("Greater", assert=>{
        let op = new OperatorExpression.Builder().expect(5).gt().build();
        assert.strictEqual(op.evaluate(5), false);
        assert.strictEqual(op.evaluate(6), true);
        assert.strictEqual(op.evaluate(4), false);
        assert.strictEqual(op.asSql(), " > 5");
        assert.strictEqual(op.name(), "gt");
    });
    QUnit.test("Less That Or Equal", assert=>{
        let op = new OperatorExpression.Builder().expect(5).lte().build();
        assert.strictEqual(op.evaluate(5), true);
        assert.strictEqual(op.evaluate(6), false);
        assert.strictEqual(op.evaluate(4), true);
        assert.strictEqual(op.asSql(), " <= 5");
        assert.strictEqual(op.name(), "lte");
    });
    QUnit.test("Less", assert=>{
        let op = new OperatorExpression.Builder().expect(5).lt().build();
        assert.strictEqual(op.evaluate(5), false);
        assert.strictEqual(op.evaluate(6), false);
        assert.strictEqual(op.evaluate(4), true);
        assert.strictEqual(op.asSql(), " < 5");
        assert.strictEqual(op.name(), "lt");
    });
    QUnit.test("Match", assert=>{
        let op = new OperatorExpression.Builder().expect("match1|match2").match().build();
        assert.strictEqual(op.evaluate("match1"), true);
        assert.strictEqual(op.evaluate("match2"), true);
        assert.strictEqual(op.evaluate("match3"), false);
        assert.strictEqual(op.asSql(), " glob 'match1|match2'");
        assert.strictEqual(op.name(), "match");
    });
    QUnit.test("Contains", assert=>{
        let op = new OperatorExpression.Builder().expect("match1").contains().build();
        assert.strictEqual(op.evaluate("I contain match1"), true);
        assert.strictEqual(op.evaluate("I do not contain required match"), false);
        assert.strictEqual(op.asSql(), " like '%match1%'");
        assert.strictEqual(op.name(), "contains");
    });
    QUnit.test("Not Equal", assert=>{
        let op = new OperatorExpression.Builder().eq().expect("expected").not().build();
        assert.strictEqual(op.evaluate("expected"), false);
        assert.strictEqual(op.evaluate("Expected"), true);
        assert.strictEqual(op.asSql(), " not 'expected'");
        assert.strictEqual(op.name(), "not");

        let op2 = new OperatorExpression.Builder().expect(5).not().build();
        assert.strictEqual(op2.evaluate(5), false);
        assert.strictEqual(op2.evaluate("5"), true);
        assert.strictEqual(op2.asSql(), " not 5");
        assert.strictEqual(op.name(), "not");
    });
    QUnit.test("Not Match", assert=>{
        let op = new OperatorExpression.Builder().expect("match1|match2").not().match().build();
        assert.strictEqual(op.evaluate("match1"), false);
        assert.strictEqual(op.evaluate("match2"), false);
        assert.strictEqual(op.evaluate("match3"), true);
        assert.strictEqual(op.asSql(), " not glob 'match1|match2'");
        assert.strictEqual(op.name(), "not");
    });
};