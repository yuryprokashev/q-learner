const TableGroup = require("../model/dto/TableGroup");
const VirtualOrderTableFactory = require("./VirtualOrderTableFactory");
const ParameterTableFactory = require("./ParameterTableFactory");
const TableGroupFactory = require("./TableGroupFactory");

module.exports = VirtualOrderTableGroupFactory;
function VirtualOrderTableGroupFactory(){
    const _tableFactories = [new VirtualOrderTableFactory(), new ParameterTableFactory()];
    const _tableGroupFactory = new TableGroupFactory(_tableFactories);
    /**
     *
     * @param vOrderDTOs
     * @returns {TableGroup[]}
     */
    this.create = vOrderDTOs =>{
        return _tableGroupFactory.create(vOrderDTOs);
    };
}