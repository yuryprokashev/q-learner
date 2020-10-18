module.exports = CreateVirtualOrdersRequest;
/**
 * @param {number} start - the epoch timestamp of start time (ms)
 * @param {number} end - the epoch timestamp of end time (ms)
 * @param {number} period - the duration of the virtual order period (ms)
 * @param {number} [step=10000] - step
 * @param {number} [executionDelay=0] - the delay of the order execution (ms)
 * @constructor
 */
function CreateVirtualOrdersRequest(start, end, period, step, executionDelay){
    this.start = start;
    this.end = end;
    this.period = period;
    this.step = step || 10000;
    this.executionDelay = executionDelay || 0;
}