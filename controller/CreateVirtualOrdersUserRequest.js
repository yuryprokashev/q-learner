module.exports = CreateVirtualOrdersUserRequest;

/**
 *
 * @param {string} startDay - the start day of the reward calculation period (UTC)
 * @param {number} dayCount - the duration of the reward calculation period (minutes)
 * @param {number} rewardPeriod - the size of the time window where reward is computed
 * @param {number }step - the step between reward calculation periods (minutes)
 * @param {number} executionDelay - the delay between the order placed and the order executed
 * @constructor
 */
function CreateVirtualOrdersUserRequest(startDay, dayCount, rewardPeriod, step, executionDelay){
    this.start = startDay;
    this.dayCount = dayCount;
    this.rewardPeriod = rewardPeriod;
    this.step = step;
    this.executionDelay = executionDelay;
}