const SqlStatementApp = require("../apps/SqlStatementApp");
const VirtualOrderApp = require("../apps/VirtualOrderApp");
module.exports = (io, configApp) =>{
    QUnit.module("virtual-order-app", {
        before: ()=>{
            const sqlStatementApp = new SqlStatementApp(io, configApp);
            this.voApp = new VirtualOrderApp(io, sqlStatementApp, configApp);
        }
    });

    QUnit.test("Can get virtual orders by sent date", assert =>{
        const start = 1577982720000;
        const end = 1577982840000;
        const orders = this.voApp.getBySentDate(start, end);
        assert.strictEqual(orders.length, 3);
        const firstOrder = orders[0];
        assert.strictEqual(firstOrder.getId(), "v-order-_MSFT-1577982720000-600-20");
        assert.strictEqual(firstOrder.getParameter("buy-reward").getValue(), 1.03999999999999);
        assert.strictEqual(firstOrder.getOrderSentEnvironment().getParameter("bid").getValue(), 158.310000000000002274);
    });
}