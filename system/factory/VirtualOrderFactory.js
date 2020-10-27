const ParameterFactory = require("./ParameterFactory");
const OneToManyMap = require("../../basic/OneToManyMap");
const EnvironmentFactory = require("./EnvironmentFactory");
const VirtualOrderParameterGroupFactory = require("./VirtualOrderParameterGroupFactory");
const VirtualOrder = require("../model/entity/VirtualOrder");
const VirtualOrderIdFactory = require("./VirtualOrderIdFactory");
const ParameterGroup = require("../model/entity/ParameterGroup");
module.exports = VirtualOrderFactory;

function VirtualOrderFactory(){
    const _paramFactory = new ParameterFactory();
    const _environmentFactory = new EnvironmentFactory();
    const _voParametersFactory = new VirtualOrderParameterGroupFactory()
    this.fromEnvironments = (environments, duration, executionDelay) =>{
        const delay = executionDelay || 0;
        const firstEnv = environments[0];
        const symbol = firstEnv.getSymbol();
        const sent = firstEnv.getCreatedAt();
        const id = VirtualOrderIdFactory(symbol, sent, duration, delay);

        const orderExecutedEnvironment = _getOrderExecutedEnvironment(environments, delay);
        const orderSentEnvironment = _getOrderSentEnvironment(environments);
        const environmentsForParameterFactory = environments.filter(env =>{
            return env.getCreatedAt() >= orderExecutedEnvironment.getCreatedAt();
        });
        const voParameterGroup = _voParametersFactory.create(environmentsForParameterFactory, id);
        return new VirtualOrder(id, orderSentEnvironment, orderExecutedEnvironment, voParameterGroup);
    };

    function _getOrderExecutedEnvironment(environments, executionDelay){
        let currentEnvironment;
        for(let i = 0; i < environments.length; i++){
            currentEnvironment = environments[i];
            if(currentEnvironment.getCreatedAt() >= _getOrderSentEnvironment(environments).getCreatedAt() + executionDelay) {
                break;
            }
        }
        return currentEnvironment;
    }
    function _getOrderSentEnvironment(environments){
        return environments[0];
    }

    /**
     *
     * @param voParamRecords
     * @param envParamRecords
     * @return {VirtualOrder[]}
     * */
    this.fromRecords = (voParamRecords, envParamRecords) =>{
        const voParamsGroups = voParamRecords.reduce((acc, voParamRecord)=>{
            acc.set(voParamRecord.parent_id, voParamRecord);
            return acc;
        }, new OneToManyMap());
        const environmentsById = _environmentFactory.fromRecords(envParamRecords).reduce((acc, environment)=>{
            acc.set(environment.getId(), environment);
            return acc;
        }, new Map());
        return voParamsGroups.keys().map(voId =>{
            const voParamRecords = voParamsGroups.get(voId);
            const envSentId = voParamRecords[0].order_sent;
            const envExecId = voParamRecords[0].order_executed;
            const orderSentEnvironment = environmentsById.get(envSentId);
            const orderExecutedEnvironment = environmentsById.get(envExecId);

            const voParams = voParamRecords.map(paramRecord =>{
                return _paramFactory.fromObject({parentId: paramRecord.parent_id, name: paramRecord.name, value: paramRecord.value});
            });
            const voParameterGroup = new ParameterGroup(voParams);
            return new VirtualOrder(voId, orderSentEnvironment, orderExecutedEnvironment, voParameterGroup);
        })
    };
}