const VirtualOrderTablesFactory = require("../factory/VirtualOrderTablesFactory");
const InsertVirtualOrderStatementsFactory = require("../factory/InsertVirtualOrderStatementsFactory");
const SqliteTransaction = require("../io/SqliteTransaction");
module.exports = VirtualOrderApp;
function VirtualOrderApp(io){
    const _voTableFactory = new VirtualOrderTablesFactory();
    const _insertStatementsFactory = new InsertVirtualOrderStatementsFactory();
    /**
     *
     * @param orders{VirtualOrderDTO[]}
     */
    this.save = orders =>{
        const voTableGroups = _voTableFactory.create(orders);
        const statementGroups = voTableGroups.map(tableGroup=>{
            return _insertStatementsFactory.create(tableGroup.tables);
        });
        return statementGroups.map(statementGroup =>{
            const action = new SqliteTransaction(io);
            return action.execute(statementGroup);
        });
    };
}