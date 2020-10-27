const ParameterFactory = require("./ParameterFactory");
const RewardFactory = require("./RewardFactory");
const RiskFactory = require("./RiskFactory");
const ParameterGroup = require("../model/entity/ParameterGroup");

module.exports = VirtualOrderParameterGroupFactory;
function VirtualOrderParameterGroupFactory(){
    const _paramFactory = new ParameterFactory();
    this.create = (environments, orderId) =>{
        const reward = RewardFactory(environments);
        const buyRewardParameterObject = {parentId: orderId, name: `buy-reward`, value: reward.buy};
        const sellRewardParameterObject = {parentId: orderId, name: `sell-reward`, value: reward.sell};

        const risk = RiskFactory(environments);
        const buyRiskParameterObject = {parentId: orderId, name: `buy-risk`, value: risk.buy};
        const sellRiskParameterObject = {parentId: orderId, name: `sell-risk`, value: risk.sell};
        return new ParameterGroup([_paramFactory.fromObject(buyRewardParameterObject),
            _paramFactory.fromObject(sellRewardParameterObject),
            _paramFactory.fromObject(buyRiskParameterObject),
            _paramFactory.fromObject(sellRiskParameterObject)
        ]);
    };

}