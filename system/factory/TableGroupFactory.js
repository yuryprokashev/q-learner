
const TableGroup = require("../model/dto/TableGroup");
module.exports = TableGroupFactory;
function TableGroupFactory(tableFactories){
    /**
     *
     * @param dtos{Object[]}
     * @returns {TableGroup[]}
     */
    this.create = dtos =>{
        return dtos.map(dto =>{
            const tables = tableFactories.map(factory =>{
                return factory.create(dto);
            });
            return new TableGroup(tables);
        });
    };
}