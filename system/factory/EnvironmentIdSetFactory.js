const SqlStringSetFactory = require("./SqlStringSetFactory");
module.exports = EnvironmentIdSetFactory;

function EnvironmentIdSetFactory(){
    this.fromVirtualOrderRecords = voRecords =>{
        const ids = voRecords.reduce((acc, record) => {
            acc.push(record.order_sent);
            acc.push(record.order_executed);
            return acc;
        }, []);
        return SqlStringSetFactory(ids);
    };
}