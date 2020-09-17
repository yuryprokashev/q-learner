const OneToManyMap = require("../basic/OneToManyMap");
const UseCaseResponseBuilder = require("./UseCaseResponse").Builder;
module.exports = RewardCalculator;

/**
 *
 * @param useCaseRequestFactory
 * @param useCaseContextFactory
 * @constructor
 */
function RewardCalculator(useCaseRequestFactory, useCaseContextFactory){
    this.execute = userRequest =>{
        let responseBuilder = new UseCaseResponseBuilder(userRequest);
        if(userRequest.debug) responseBuilder.addLog(`User Request ${JSON.stringify(userRequest)}`);
        try {
            let rewardCalculatorRequest = useCaseRequestFactory.create(userRequest);
            if(userRequest.debug) responseBuilder.addLog(`Use Case Request: ${JSON.stringify(rewardCalculatorRequest)}`);
            let rewardCalculatorContext = useCaseContextFactory.create(rewardCalculatorRequest);
            if(userRequest.debug) responseBuilder.addLog("Use Case Context is built");
            if(userRequest.debug) responseBuilder.addLog(`Environments: ${rewardCalculatorContext.getEnvironments().length}`);
            if(userRequest.debug) responseBuilder.addLog(`Environments Buckets: ${rewardCalculatorContext.getBuckets().length}`);
            let fB = rewardCalculatorContext.getBuckets()[0];
            if(userRequest.debug) responseBuilder.addLog(`Environments in the first Bucket: ${fB.getObjects().length}`);
            if(userRequest.debug) responseBuilder.addLog(`First Bucket start: ${new Date(fB.getTimeslot().getStart()).toISOString()}`);
            if(userRequest.debug) responseBuilder.addLog(`First Bucket end: ${new Date(fB.getTimeslot().getEnd()).toISOString()}`);
            if(userRequest.debug) responseBuilder.addLog(`First Bucket duration: ${fB.getTimeslot().getDuration()}`);
            let sB = rewardCalculatorContext.getBuckets()[1];
            if(userRequest.debug) responseBuilder.addLog(`Environments in the second Bucket: ${sB.getObjects().length}`);
            if(userRequest.debug) responseBuilder.addLog(`Second Bucket start: ${new Date(sB.getTimeslot().getStart()).toISOString()}`);
            if(userRequest.debug) responseBuilder.addLog(`Second Bucket end: ${new Date(sB.getTimeslot().getEnd()).toISOString()}`);
            if(userRequest.debug) responseBuilder.addLog(`Second Bucket duration: ${sB.getTimeslot().getDuration()}`);

        } catch (err){
            responseBuilder.addLog(JSON.stringify({message: err.message, stack: err.stack}));
        }
        return responseBuilder.build();
    };
}