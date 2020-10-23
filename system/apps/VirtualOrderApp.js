const VirtualOrderTablesFactory = require("../factory/VirtualOrderTablesFactory");
const InsertVirtualOrderStatementsFactory = require("../factory/InsertVirtualOrderStatementsFactory");
const SqliteTransaction = require("../io/SqliteTransaction");
const VirtualOrderFactory = require("../factory/VirtualOrderFactory");
const EnvironmentIdSetFactory = require("../factory/EnvironmentIdSetFactory");
module.exports = VirtualOrderApp;
function VirtualOrderApp(io, sqlStatementApp, configApp){
    const DB_CONFIG = configApp.getDbConfig();
    const VO_BASE_SQL = sqlStatementApp.getByName("virtual-order-parameters-base");
    const ENV_BASE_SQL = sqlStatementApp.getByName("environment-parameters-base");
    const CREATED_SQL = "where created >= ? and created <= ? order by created asc";

    const _voTableFactory = new VirtualOrderTablesFactory();
    const _insertStatementsFactory = new InsertVirtualOrderStatementsFactory();
    const _voFactory = new VirtualOrderFactory();
    const _envIdSetFactory = new EnvironmentIdSetFactory();
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
    /**
     *
     * @param start
     * @param end
     * @return {VirtualOrder[]}
     */
    this.getBySentDate = (start, end)=>{
        /*
        Сначала надо найти все параметры environments, созданных со старта до конца.
        И надо найти все уникальные ключи этих environments.
        Затем, надо найти все параметры virtual orders, у которых order_sent in эти самые ключи
        Затем идем по параметрам virtual orders. Для каждого создаем VirtualOrder
         */
        const db = io.getDatabase(DB_CONFIG);

        const voTemplate = `${VO_BASE_SQL} ${CREATED_SQL}`;
        console.log(voTemplate);
        const voStatement = db.prepare(voTemplate);
        const voParamsRecords = voStatement.all(start, end);

        const envIds = _envIdSetFactory.fromVirtualOrderRecords(voParamsRecords);

        const envTemplate = `${ENV_BASE_SQL} where p.parent_id in (${envIds})`;
        const envStatement = db.prepare(envTemplate);
        const environmentParamRecords = envStatement.all();

        return _voFactory.fromRecords(voParamsRecords, environmentParamRecords);
    };
}