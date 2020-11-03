module.exports = VirtualOrderDTO;

/**
 * Virtual Order data structure to pass around Virtual Order data.
 * @param id {string} - the identifier of the Virtual Order.
 * @param symbol {string} - the symbol of the order ticker.
 * @param orderSentEnvironmentId {string} - the identifier of the Environment at the moment of order sent to broker.
 * @param orderExecutedEnvironmentId {string} - the identifier of Environment at the moment of order execution at broker.
 * @param executionDelay {number} - execution delay between order sent and order executed (milliseconds).
 * @param parameters {ParameterDTO} - the buyer reward parameter.
 * @param sent {number} - the order sent moment timestamp (ms).
 * @param executed {number} - the order executed moment timestamp (ms).
 * @constructor
 */
function VirtualOrderDTO(id, symbol, orderSentEnvironmentId,
                         orderExecutedEnvironmentId, executionDelay,
                         parameters, sent, executed){
    this.id = id;
    this.symbol = symbol;
    this.orderSentEnvironmentId = orderSentEnvironmentId;
    this.orderExecutedEnvironmentId = orderExecutedEnvironmentId;
    this.executionDelay = executionDelay;
    this.parameters = parameters;
    this.sent = sent;
    this.executed = executed
}