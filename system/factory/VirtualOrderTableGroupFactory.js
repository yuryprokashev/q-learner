const TableGroup = require("../model/dto/TableGroup");
const VirtualOrderTableFactory = require("./VirtualOrderTableFactory");
const ParameterTableFactory = require("./ParameterTableFactory");

module.exports = VirtualOrderTableGroupFactory;
function VirtualOrderTableGroupFactory(){
    /**
     *
     * @param vOrderDTOs
     * @returns {TableGroup[]}
     */
    this.create = vOrderDTOs =>{
        return vOrderDTOs.map(dto =>{
            const tables = [VirtualOrderTableFactory.bind(null, dto), ParameterTableFactory.bind(null, dto.parameters)].map(factory =>{
                return factory();
            });
            return new TableGroup(tables);
        });
    };
}