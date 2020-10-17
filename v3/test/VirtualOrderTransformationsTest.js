const VirtualOrder = require("../model/entity/VirtualOrder").Constructor;
const Timeslot = require("../model/entity/Timeslot");
const Parameter = require("../model/entity/Parameter");
const Environment = require("../model/entity/Environment").Constructor;
const VirtualOrderDTOFactory = require("../factory/VirtualOrderDTOFactory");
const VirtualOrderTablesFactory = require("../factory/VirtualOrderTablesFactory");
const InsertVirtualOrderStatementsFactory = require("../factory/InsertVirtualOrderStatementsFactory");


module.exports = ()=>{
    QUnit.module("virtual-order-transformation", {
        before: ()=>{
            // We don't need env params, since we don't test the Virtual Order Factory.
            const emptyParams = [];
            const environmentSent1 = new Environment("env-sent-1", 1004, "MSFT", emptyParams);
            const environmentSent2 = new Environment("env-sent-2", 2156, "MSFT", emptyParams);
            const environmentExec1 = new Environment("env-exec-1", 1404, "MSFT", emptyParams);
            const environmentExec2 = new Environment("env-exec-2", 2456, "MSFT", emptyParams);
            const reward1 = {buy: new Parameter("buy-vo-1", "buy", -100, "vo-1"), sell: new Parameter("sell-vo-1", "sell", 500, "vo-1")}
            const reward2 = {buy: new Parameter("buy-vo-2", "buy", 700, "vo-2"), sell: new Parameter("sell-vo-2", "sell", -1000, "vo-2")}
            this.orders = [
                new VirtualOrder("vo-1", new Timeslot(1000, 2000), environmentSent1, environmentExec1, reward1),
                new VirtualOrder("vo-2", new Timeslot(2000, 3000), environmentSent2, environmentExec2, reward2)
            ];
            const dtoFactory = new VirtualOrderDTOFactory();
            const tablesFactory = new VirtualOrderTablesFactory();
            const insertFactory = new InsertVirtualOrderStatementsFactory();
            this.orderDTOs = this.orders.map(order =>{
                return dtoFactory.create(order);
            });
            this.voTableGroups = tablesFactory.create(this.orderDTOs);
            this.insertStatements = this.voTableGroups.map(tableGroup=>{
                return insertFactory.create(tableGroup.tables);
            });
        }
    });
    QUnit.test("VirtualOrder => VirtualOrderDTO", assert =>{
        const firstOrderDTO = this.orderDTOs[0];
        //console.log(this.repositoryContext.models[1].dto);
        assert.strictEqual(firstOrderDTO.id, "vo-1");
        assert.strictEqual(firstOrderDTO.symbol, "MSFT");
        assert.strictEqual(firstOrderDTO.orderSentEnvironmentId, "env-sent-1");
        assert.strictEqual(firstOrderDTO.orderExecutedEnvironmentId, "env-exec-1");
        assert.strictEqual(firstOrderDTO.executionDelay, 400);
        assert.strictEqual(firstOrderDTO.buyerReward.id, "buy-vo-1");
        assert.strictEqual(firstOrderDTO.buyerReward.name, "buy");
        assert.strictEqual(firstOrderDTO.buyerReward.value, -100);
        assert.strictEqual(firstOrderDTO.buyerReward.parentId, "vo-1");
        assert.strictEqual(firstOrderDTO.sellerReward.id, "sell-vo-1");
        assert.strictEqual(firstOrderDTO.sellerReward.name, "sell");
        assert.strictEqual(firstOrderDTO.sellerReward.value, 500);
        assert.strictEqual(firstOrderDTO.sellerReward.parentId, "vo-1");
    });
    QUnit.test("VirtualOrderDTO => TableGroup", assert =>{
        const firstVoTableGroup = this.voTableGroups[0];
        const firstTableOfFirstVoTableGroup = firstVoTableGroup.tables[0];
        assert.strictEqual(firstTableOfFirstVoTableGroup.name, "Virtual Orders")
        assert.strictEqual(firstTableOfFirstVoTableGroup.columns.join("|"), "Id|Symbol|Environment When Sent|Environment When Executed|Exec Delay");
        assert.strictEqual(firstTableOfFirstVoTableGroup.records.length, 1);
        const firstVoRecord = firstTableOfFirstVoTableGroup.records[0];
        assert.strictEqual(firstVoRecord.values[0], "vo-1");
        assert.strictEqual(firstVoRecord.columns[0], "Id");
        assert.strictEqual(firstVoRecord.types[0], "String");
        assert.strictEqual(firstVoRecord.values[2], "env-sent-1");
        assert.strictEqual(firstVoRecord.columns[2], "Environment When Sent");
        assert.strictEqual(firstVoRecord.types[2], "String");
        const secondTableOfFirstVoTableGroup = firstVoTableGroup.tables[1];
        assert.strictEqual(secondTableOfFirstVoTableGroup.name, "Parameters");
        assert.strictEqual(secondTableOfFirstVoTableGroup.columns.join("|"), "Id|Name|Value|Parent Id");
        assert.strictEqual(secondTableOfFirstVoTableGroup.records.length, 2);
        const firstParamRecord = secondTableOfFirstVoTableGroup.records[0];
        assert.strictEqual(firstParamRecord.values[2], -100);
        assert.strictEqual(firstParamRecord.columns[2], "Value");
        assert.strictEqual(firstParamRecord.types[2], "Number");

    });
    QUnit.test("TablesDTO[] => SQL Statements", assert=>{
        // console.log(this.sqliteActionContext);
        const firstTransactionStatements = this.insertStatements[0];
        assert.strictEqual(firstTransactionStatements.length, 3);
        assert.strictEqual(firstTransactionStatements[0], "insert into virtual_orders (id, symbol, sent_environment_id, executed_environment_id, exec_delay) values ('vo-1','MSFT','env-sent-1','env-exec-1',400)");
        assert.strictEqual(firstTransactionStatements[1], "insert into parameters (id, name, value, parent_id) values ('buy-vo-1','buy',-100,'vo-1')")
    });
}