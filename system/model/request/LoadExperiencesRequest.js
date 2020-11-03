module.exports = LoadExperiencesRequest;
/**
 * @param {number} start - the epoch timestamp of start time (ms)
 * @param {number} end - the epoch timestamp of end time (ms)
 * @param {number} period - the duration of the virtual order period (ms)
 * @param {number} [step=10000] - step
 * @param {number} [executionDelay=0] - the delay of the order execution (ms)
 * @param {number} [refTimeShift = 10000] - the minimum shift (ms) of the reference environment timestamp for experience calculation
 * @constructor
 */
function LoadExperiencesRequest(start, end, period, step, executionDelay, refTimeShift){
    this.start = start;
    this.end = end;
    this.period = period;
    this.step = step || 10000;
    this.executionDelay = executionDelay || 0;
    this.referenceTimeShift = refTimeShift || 10000;
}