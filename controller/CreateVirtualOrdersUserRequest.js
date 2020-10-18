module.exports = CreateVirtualOrdersUserRequest;

/**
 *
 * @param {string} startDay - the start day of the reward calculation period (UTC)
 * @param {number} dayCount - the duration of the reward calculation period (minutes)
 * @param {number} rewardPeriod - the size of the time window where reward is computed
 * @param {number }step - the step between reward calculation periods (minutes)
 * @constructor
 */
function CreateVirtualOrdersUserRequest(startDay, dayCount, rewardPeriod, step){
    this.start = startDay;
    this.dayCount = dayCount;
    this.rewardPeriod = rewardPeriod;
    this.step = step;
}