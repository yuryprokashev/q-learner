const OneToManyMap = require("../../basic/OneToManyMap");
const ParameterFactory = require("./ParameterFactory");
const EnvironmentBuilder = require("../model/entity/Environment").Builder;
module.exports = EnvironmentFactory;
function EnvironmentFactory(){
    const _paramFactory = new ParameterFactory();
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
        const recordGroups = records.reduce((acc, record) =>{
            acc.set(record.parent_id, record);
            return acc;
        }, new OneToManyMap());
        return recordGroups.keys().map(environmentId =>{
            const paramRecords = recordGroups.get(environmentId);
            const envBuilder = new EnvironmentBuilder()
                .setId(environmentId)
                .setCreatedAt(paramRecords[0].created)
                .setSymbol(paramRecords[0].symbol);
            paramRecords.forEach(record =>{
                const parameter = _paramFactory.fromRecord(record);
                envBuilder.addParameter(parameter);
            });
            return envBuilder.build();
        })
    };
}