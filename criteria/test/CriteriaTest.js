const CriteriaFactory = require("../factory/CriteriaFactory");
const CriterionBuilder = require("../model/Criterion").Builder;
const CriteriaBuilder = require("../model/Criteria").Builder;
module.exports = ()=>{
    QUnit.module("criterion");
    QUnit.test("Criterion for value field", assert =>{
        const c = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const obj1 = {authorName: "yprokashev"};
        const obj2 = {name: "yprokashev"};
        const obj3 = {authorName: "manimaran.selvan"};
        assert.strictEqual(c.evaluate(obj1), true);
        assert.strictEqual(c.evaluate(obj2), false);
        assert.strictEqual(c.evaluate(obj3), false);
        const map =[["authorName", "username"]];
        assert.strictEqual(c.asSql(map), "username = 'yprokashev'");
    });
    QUnit.test("Criterion for function field", assert =>{
        const c = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const obj1 = {authorName: ()=> {return "yprokashev"}};
        const obj2 = {name: ()=>{return "yprokashev"}};
        const obj3 = {authorName: ()=>{"manimaran.selvan"}};
        assert.strictEqual(c.evaluate(obj1), true);
        assert.strictEqual(c.evaluate(obj2), false);
        assert.strictEqual(c.evaluate(obj3), false);
    });

    QUnit.module("criteria", {
        before: ()=>{
            this.criteriaFactory = new CriteriaFactory();
        }
    });
    QUnit.test("Can be produced from the plain object", assert =>{
        const sourceObj = {authorName: "yprokashev", roleName: "TPM"};
        const criteria1 = this.criteriaFactory.fromObject(sourceObj);
        const targetObj = {authorName: "yprokashev", roleName: "TPM"};
        assert.strictEqual(criteria1.evaluate(targetObj), true);
    });
    QUnit.test("Criterion1 AND Criterion2", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        const criteria1 = new CriteriaBuilder(c1).and(c2).build();
        const obj1 = {authorName: "yprokashev", roleName: "TPM"};
        const obj2 = {authorName: "yprokashev", roleName: "VP"};
        const obj3 = {authorName: "manimaran.selvan", roleName: "VP"};

        assert.strictEqual(criteria1.evaluate(obj1), false);
        assert.strictEqual(criteria1.evaluate(obj2), true);
        assert.strictEqual(criteria1.evaluate(obj3), false);
    });
    QUnit.test("Criterion1 OR Criterion2", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        const criteria1 = new CriteriaBuilder(c1).or(c2).build();
        const obj1 = {authorName: "yprokashev", roleName: "TPM"};
        const obj2 = {authorName: "yprokashev", roleName: "VP"};
        const obj3 = {authorName: "manimaran.selvan", roleName: "TPM"};

        assert.strictEqual(criteria1.evaluate(obj1), true);
        assert.strictEqual(criteria1.evaluate(obj2), true);
        assert.strictEqual(criteria1.evaluate(obj3), false);
    });
    QUnit.test("Criterion1 OR Criterion2 AND Criterion 3", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        const c3 = new CriterionBuilder().setExpectedValue(39).gte().setFieldName("age").build();
        const criteria1 = new CriteriaBuilder(c1).or(c2).and(c3).build();
        const obj1 = {authorName: "yprokashev", roleName: "TPM", age: 40};
        const obj2 = {authorName: "yprokashev", roleName: "VP", age: 40};
        const obj3 = {authorName: "manimaran.selvan", roleName: "TPM", age: 31};
        const obj4 = {authorName: "manimaran.selvan", roleName: "VP", age: 31};
        const obj5= {authorName: "manimaran.selvan", roleName: "VP", age: 40};

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
    QUnit.test("Criteria with AND conjunctions and only equal operators can be converted to Object", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").build();
        const criteria1 = new CriteriaBuilder(c1).and(c2).build();
        assert.strictEqual(criteria1.asObject().authorName, "yprokashev");
        assert.strictEqual(criteria1.asObject().roleName, "TPM");
    })
    QUnit.test("Criteria with OR conjunction can not be converted to Object", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").not().build();
        const criteria1 = new CriteriaBuilder(c1).or(c2).build();
        try {
            criteria1.asObject();
        } catch (err){
            assert.strictEqual(err.message.includes("Criteria containing OR conjunctions can not be converted to Object form"), true);
        }
    })

    QUnit.test("Criteria that has Criterion with operator name other than 'equal' can not be converted to Object", assert =>{
        const c1 = new CriterionBuilder().setFieldName("authorName").setExpectedValue("yprokashev").eq().build();
        const c2 = new CriterionBuilder().setFieldName("roleName").setExpectedValue("TPM").contains().build();
        const criteria1 = new CriteriaBuilder(c1).and(c2).build();
        try {
            criteria1.asObject();
        } catch (err){
            assert.strictEqual(err.message.includes("Criterion with operator name other than 'equal' can not be converted to Object form"), true)
        }
    });
}