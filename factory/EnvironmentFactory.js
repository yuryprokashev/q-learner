const OneToManyMap = require("../basic/OneToManyMap");
const EnvironmentBuilder = require("../model/Environment").Builder;
const Parameter = require("../model/Environment").Parameter;
module.exports = EnvironmentFactory;
function EnvironmentFactory(){
    /**
     * @param records[] - parameter records with environment columns.
     * @param records[].id - the id of the environment parameter.
     * @param records[].name - the name of the environment parameter.
     * @param records[].value - the value of the environment parameter.
     * @param records[].symbol - the symbol of the environment.
     * @param records[].created - the timestamp when environment was created.
     * @param records[].parent_id - the id of the environment (parent of the parameter).
     * @returns {Environment}
     */
    this.fromRecords = records =>{
        let recordGroups = records.reduce((acc, record) =>{
            acc.set(record.parent_id, record);
            return acc;
        }, new OneToManyMap());
        return recordGroups.keys().map(environmentId =>{
            let paramRecords = recordGroups.get(environmentId);
            let envBuilder = new EnvironmentBuilder()
                .setId(environmentId)
                .setCreatedAt(paramRecords[0].created)
                .setSymbol(paramRecords[0].symbol);
            paramRecords.forEach(record =>{
                let parameter = new Parameter(record.id, record.name, Number(record.value).toPrecision(21));
                envBuilder.addParameter(parameter);
            });
            return envBuilder.build();
        })
    };
}