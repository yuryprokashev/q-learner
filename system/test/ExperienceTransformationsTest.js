const Experience = require("../model/entity/Experience");
const ParameterGroup = require("../model/entity/ParameterGroup");
const Parameter = require("../model/entity/Parameter");
const ExperienceDTOFactory = require("../factory/ExperienceDTOFactory");
const ExperienceTableGroupFactory = require("../factory/ExperienceTableGroupFactory");
const Environment = require("../model/entity/Environment").Constructor;

module.exports = (io, configApp)=>{
    QUnit.module("experience-transformation", {
        before: ()=>{
            const emptyParams = [];
            const curEnv1 = new Environment("env-cur-1", 2156, "MSFT", emptyParams);
            const refEnv1 = new Environment("env-ref-1", 1004, "MSFT", emptyParams);
            const curEnv2 = new Environment("env-cur-2", 2456, "MSFT", emptyParams);
            const refEnv2 = new Environment("env-ref-2", 1404, "MSFT", emptyParams);
            const expParams1 = [new Parameter("p1", "test1", 100, "exp-1"), new Parameter("p2", "test2", -100, "exp-1")];
            const expParams2 = [new Parameter("p3", "test3", 872, "exp-2"), new Parameter("p4", "test4", -39, "exp-2")];
            const paramGroup1 = new ParameterGroup(expParams1);
            const paramGroup2 = new ParameterGroup(expParams2);
            const experiences = [
                new Experience("exp-1", curEnv1, refEnv1, paramGroup1, "11|12|-14"),
                new Experience("exp-2", curEnv2, refEnv2, paramGroup2, "-1|7|27")
            ];
            const dtoFactory = new ExperienceDTOFactory();
            const tableGroupFactory = new ExperienceTableGroupFactory();
            // const insertFactory = new InsertExperiencesStatementsFactory();
            this.dtos = experiences.map((exp, index) =>{
                return dtoFactory.create(exp, "vo-" + index);
            });
            this.tableGroups = tableGroupFactory.create(this.dtos);
        }
    });
    QUnit.test("Experience => ExperienceDTO", assert =>{
        const firstDTO = this.dtos[0];
        assert.strictEqual(firstDTO.id, "exp-1");
        assert.strictEqual(firstDTO.currentEnvironmentId, "env-cur-1");
        assert.strictEqual(firstDTO.referenceEnvironmentId, "env-ref-1");
        assert.strictEqual(firstDTO.virtualOrderId, "vo-0");
        assert.strictEqual(firstDTO.code, "11|12|-14");
        const firstParameterDTO = firstDTO.parameters[0];
        assert.strictEqual(firstParameterDTO.id, "p1");
        assert.strictEqual(firstParameterDTO.name, "test1");
        assert.strictEqual(firstParameterDTO.value, 100);
        assert.strictEqual(firstParameterDTO.parentId, "exp-1");
    });
    QUnit.test("ExperienceDTO => TableGroup", assert =>{
        const firstTableGroup = this.tableGroups[0];
        const firstTable = firstTableGroup.tables[0];
        assert.strictEqual(firstTable.name, "Experiences")
        assert.strictEqual(firstTable.columns.join("|"),
            "Id|Virtual Order Id|Current Environment|Reference Environment|Code");
        assert.strictEqual(firstTable.records.length, 1);
        const firstRecord = firstTable.records[0];
        assert.strictEqual(firstRecord.values[0], "exp-1");
        assert.strictEqual(firstRecord.columns[0], "Id");
        assert.strictEqual(firstRecord.types[0], "String");
        assert.strictEqual(firstRecord.values[2], "env-cur-1");
        assert.strictEqual(firstRecord.columns[2], "Current Environment");
        assert.strictEqual(firstRecord.types[2], "String");
        assert.strictEqual(firstRecord.values[4], "11|12|-14");
        assert.strictEqual(firstRecord.columns[4], "Code");
        assert.strictEqual(firstRecord.types[4], "String");
        const secondTable = firstTableGroup.tables[1];
        assert.strictEqual(secondTable.name, "Parameters");
        assert.strictEqual(secondTable.columns.join("|"), "Id|Name|Value|Parent Id");
        assert.strictEqual(secondTable.records.length, 2);
        const firstParamRecord = secondTable.records[0];
        assert.strictEqual(firstParamRecord.values[2], 100);
        assert.strictEqual(firstParamRecord.columns[2], "Value");
        assert.strictEqual(firstParamRecord.types[2], "Number");
    });
    QUnit.test("TableGroup => SQL Statements", assert =>{
        assert.expect(0);
    });
}