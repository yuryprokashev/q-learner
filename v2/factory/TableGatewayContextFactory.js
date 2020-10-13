const TableGatewayContext = require("../model/TableGatewayContext");
const OneToManyMap = require("../../basic/OneToManyMap");
const VirtualOrderTablesFactory = require("./VitrualOrderTablesFactory");
module.exports = TableGatewayContextFactory;
function TableGatewayContextFactory(){
    const factoryMap = new Map([["VirtualOrder", new VirtualOrderTablesFactory()]]);
    this.create = repositoryContext =>{
        const tables = [];
        const modelsByName = repositoryContext.models.reduce((acc, model)=>{
            acc.set(model.name, model);
            return acc;
        }, new OneToManyMap());
        modelsByName.keys().forEach(modelName =>{
            const voModels = modelsByName.get(modelName);
            const factory = factoryMap.get(modelName);
            const voTables = factory.create(voModels.map(item => item.dto));
            tables.push(...voTables);
        });
        return new TableGatewayContext(tables);
    };
}