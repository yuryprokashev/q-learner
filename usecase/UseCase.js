const UseCaseResponseBuilder = require("./UseCaseResponse").Builder;
module.exports = UseCase;

/**
 *
 * @param useCaseRequestFactory
 * @param useCaseContextFactory
 * @param useCaseActionFactory
 * @constructor
 */
function UseCase(useCaseRequestFactory, useCaseContextFactory, useCaseActionFactory){
    this.execute = userRequest =>{
        let responseBuilder = new UseCaseResponseBuilder(userRequest);
        if(userRequest.debug) responseBuilder.addLog(`User Request ${JSON.stringify(userRequest)}`);
        try {
            let useCaseRequest = useCaseRequestFactory.create(userRequest);
            if(userRequest.debug) responseBuilder.addLog(`Use Case Request: ${JSON.stringify(useCaseRequest)}`);
            let useCaseContext = useCaseContextFactory.create(useCaseRequest);
            if(userRequest.debug) {
                if(useCaseContext.getLogs) useCaseContext.getLogs().forEach(str => {
                    responseBuilder.addLog(str);
                });
            }
            let useCaseAction = useCaseActionFactory.create(useCaseContext);
            let actionResponse = useCaseAction.execute(useCaseRequest);
            if(userRequest.debug){
                if(actionResponse.getLogs) actionResponse.getLogs().forEach(str =>{
                    responseBuilder.addLog(str);
                });
            }
            responseBuilder.setData(actionResponse.getData());
        } catch (err){
            responseBuilder.addLog(JSON.stringify({message: err.message, stack: err.stack}));
        }
        return responseBuilder.build();
    };
}