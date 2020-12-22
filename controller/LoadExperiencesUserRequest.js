module.exports = LoadExperiencesUserRequest;

/**
 *
 * @param {string} startDay - the start day of the reward calculation period (UTC)
 * @param {number} dayCount - the duration of the reward calculation period (minutes)
 * @param {number} rewardPeriod - the size of the time window where reward is computed (minutes)
 * @param {number} step - the step between reward calculation periods (minutes)
 * @param {number} executionDelay - the delay between the order placed and the order  (ms)
 * @constructor
 */
function LoadExperiencesUserRequest(startDay, dayCount, rewardPeriod, step, executionDelay){
    this.start = startDay;
    this.dayCount = dayCount;
    this.rewardPeriod = rewardPeriod;
    this.step = step;
    this.executionDelay = executionDelay;
}