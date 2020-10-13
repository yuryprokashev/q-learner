const RepositoryContext = require("../model/RepositoryContext");
const ModelDTO = require("../model/ModelDTO");
const VirtualOrderDTOFactory = require("./VirtualOrderDTOFactory");
module.exports = RepositoryContextFactory;
function RepositoryContextFactory(){
    const _voDtoFactory = new VirtualOrderDTOFactory();
    this.create = useCaseContext =>{
        const models = [];
        useCaseContext.getVirtualOrders().forEach(vOrder=>{
            const vOrderDto = _voDtoFactory.create(vOrder);
            models.push(new ModelDTO("VirtualOrder", vOrderDto));
        })
        return new RepositoryContext(models);
    };
}