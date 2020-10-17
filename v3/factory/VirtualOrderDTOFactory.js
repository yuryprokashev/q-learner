const VirtualOrderDTO = require("../model/dto/VirtualOrderDTO");
const ParameterDTOFactory = require("./ParameterDTOFactory");
module.exports = VirtualOrderDTOFactory;
function VirtualOrderDTOFactory(){
    const _paramDtoFactory = new ParameterDTOFactory();
    this.create = vOrder =>{
        const buyReward = vOrder.getReward("buy");
        const buyRewardDTO = _paramDtoFactory.create(buyReward);
        const sellReward = vOrder.getReward("sell");
        const sellRewardDTO = _paramDtoFactory.create(sellReward);
        return new VirtualOrderDTO(
            vOrder.getId(),
            vOrder.getSymbol(),
            vOrder.getOrderSentEnvironment().getId(),
            vOrder.getOrderExecutedEnvironment().getId(),
            vOrder.getExecutionDelay(),
            buyRewardDTO,
            sellRewardDTO
        );
    };
}