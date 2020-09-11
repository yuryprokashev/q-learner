module.exports = ConsoleResponder;

/**
 * Handles User Request with provided Use Case and outputs UseCaseResponse to console.
 * @param useCase - the instance of the specific use case
 * @constructor
 */
function ConsoleResponder(useCase){
    /**
     * @param userRequest
     */
    this.respond = userRequest =>{
        let useCaseResponse;
        let logs = [];
        try {
            useCaseResponse = useCase.execute(userRequest);
            logs = logs.concat(useCaseResponse.getLogs());
        } catch (err){
            logs.push(`Error: ${err.message}\n${err.stack}`);
        }
        logs.forEach(str=> console.log(str));
    };
}