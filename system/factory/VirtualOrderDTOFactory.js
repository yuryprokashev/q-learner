const VirtualOrderDTO = require("../model/dto/VirtualOrderDTO");
const ParameterDTOFactory = require("./ParameterDTOFactory");
module.exports = VirtualOrderDTOFactory;
function VirtualOrderDTOFactory(){
    const _paramDtoFactory = new ParameterDTOFactory();
    this.create = vOrder =>{

        const parameterDTOs = vOrder.getParameters().map(parameter =>{
            return _paramDtoFactory.create(parameter);
        })
        return new VirtualOrderDTO(
            vOrder.getId(),
            vOrder.getSymbol(),
            vOrder.getOrderSentEnvironment().getId(),
            vOrder.getOrderExecutedEnvironment().getId(),
            vOrder.getExecutionDelay(),
            parameterDTOs,
            vOrder.getSentAt(),
            vOrder.getExecutedAt()
        );
    };
}