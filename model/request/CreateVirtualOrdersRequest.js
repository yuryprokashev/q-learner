module.exports = CreateVirtualOrdersRequest;
/**
 * @param {number} start - the epoch timestamp of start time (ms)
 * @param {number} end - the epoch timestamp of end time (ms)
 * @param {number} period - the duration of the virtual order period (ms)
 * @param {number} [step=10000] - step
 * @constructor
 */
function CreateVirtualOrdersRequest(start, end, period, step){
    this.start = start;
    this.end = end;
    this.period = period;
    this.step = step || 10000;
}