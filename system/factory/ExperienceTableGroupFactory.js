const TableGroup = require("../model/dto/TableGroup");
const ExperienceTableFactory = require("./ExperienceTableFactory");
const ParameterTableFactory = require("./ParameterTableFactory");
const TableGroupFactory = require("./TableGroupFactory");

module.exports = ExperienceTableGroupFactory;
function ExperienceTableGroupFactory(){
    const _tableFactories = [new ExperienceTableFactory(), new ParameterTableFactory()];
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