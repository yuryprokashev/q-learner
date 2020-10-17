module.exports = ComputeRewardsRequest;

/**
 *
 * @param {string} startDay - the start day of the reward calculation period (UTC)
 * @param {number} dayCount - the duration of the reward calculation period (minutes)
 * @param {number} rewardPeriod - the size of the time window where reward is computed
 * @param {string} rewardType - either "buy" or "sell"
 * @param {number }step - the step between reward calculation periods (minutes)
 * @constructor
 */
function ComputeRewardsRequest(startDay, dayCount, rewardPeriod, rewardType, step){
    this.useCaseId = "create-virtual-orders";
    this.start = startDay;
    this.dayCount = dayCount;
    this.rewardPeriod = rewardPeriod;
    this.rewardType = rewardType;
    this.debug = true;
    this.step = step;
}