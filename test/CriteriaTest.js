const CriterionBuilder = require("../criteria/Criterion").Builder;
const CriteriaBuilder = require("../criteria/Criteria").Builder;
module.exports = ()=>{
    QUnit.module("criterion");
    QUnit.test("Criterion for value field", assert =>{
        let c = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        let obj1 = {authorName: "yprokashev"};
        let obj2 = {name: "yprokashev"};
        let obj3 = {authorName: "manimaran.selvan"};
        assert.strictEqual(c.evaluate(obj1), true);
        assert.strictEqual(c.evaluate(obj2), false);
        assert.strictEqual(c.evaluate(obj3), false);
        let map = new Map([["authorName", "username"]]);
        assert.strictEqual(c.asSql(map), "username = 'yprokashev'");
    });
    QUnit.test("Criterion for function field", assert =>{
        let c = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        let obj1 = {authorName: ()=> {return "yprokashev"}};
        let obj2 = {name: ()=>{return "yprokashev"}};
        let obj3 = {authorName: ()=>{"manimaran.selvan"}};
        assert.strictEqual(c.evaluate(obj1), true);
        assert.strictEqual(c.evaluate(obj2), false);
        assert.strictEqual(c.evaluate(obj3), false);
    });

    QUnit.module("criteria");
    QUnit.test("Criterion1 AND Criterion2", assert =>{
        let c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        let c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        let criteria1 = new CriteriaBuilder(c1).and(c2).build();
        let obj1 = {authorName: "yprokashev", roleName: "TPM"};
        let obj2 = {authorName: "yprokashev", roleName: "VP"};
        let obj3 = {authorName: "manimaran.selvan", roleName: "VP"};

        assert.strictEqual(criteria1.evaluate(obj1), false);
        assert.strictEqual(criteria1.evaluate(obj2), true);
        assert.strictEqual(criteria1.evaluate(obj3), false);
    });
    QUnit.test("Criterion1 OR Criterion2", assert =>{
        let c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        let c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        let criteria1 = new CriteriaBuilder(c1).or(c2).build();
        let obj1 = {authorName: "yprokashev", roleName: "TPM"};
        let obj2 = {authorName: "yprokashev", roleName: "VP"};
        let obj3 = {authorName: "manimaran.selvan", roleName: "TPM"};

        assert.strictEqual(criteria1.evaluate(obj1), true);
        assert.strictEqual(criteria1.evaluate(obj2), true);
        assert.strictEqual(criteria1.evaluate(obj3), false);
    });
    QUnit.test("Criterion1 OR Criterion2 AND Criterion 3", assert =>{
        let c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        let c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        let c3 = new CriterionBuilder().setExpectedValue(39).gte().setFieldName("age").build();
        let criteria1 = new CriteriaBuilder(c1).or(c2).and(c3).build();
        let obj1 = {authorName: "yprokashev", roleName: "TPM", age: 40};
        let obj2 = {authorName: "yprokashev", roleName: "VP", age: 40};
        let obj3 = {authorName: "manimaran.selvan", roleName: "TPM", age: 31};
        let obj4 = {authorName: "manimaran.selvan", roleName: "VP", age: 31};
        let obj5= {authorName: "manimaran.selvan", roleName: "VP", age: 40};

        // c1 = true, c2 = false, c3 = true. true or false and true => true or false = true, then true and true = true.
        assert.strictEqual(criteria1.evaluate(obj1), true);
        // c1 = true, c2 = true, c3 = true. true or true and true => true.
        assert.strictEqual(criteria1.evaluate(obj2), true);
        // c1 = false, c2 = false, c3 = false. false or false and false => false.
        assert.strictEqual(criteria1.evaluate(obj3), false);
        // c1 = false, c2 = true, c3 = false. false or true and false => false.
        assert.strictEqual(criteria1.evaluate(obj4), false);
        // c1 = false, c2 = true, c3 = true. false or true and true => true.
        assert.strictEqual(criteria1.evaluate(obj5), true);
    });
}