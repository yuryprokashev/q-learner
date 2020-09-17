module.exports = RewardCalculatorRequestFactory;

/**
 *
 * @constructor
 */
function RewardCalculatorRequestFactory(){
    const MIN_MS = 60 * 1000;
    const DAY_MS = 24 * 60 * MIN_MS;
    /**
     *
     * @param {ComputeRewardsRequest} userRequest
     */
    this.create = userRequest =>{
        let userStart = userRequest.start.split("-").map(str => {return parseInt(str);});
        let startUtc = Date.UTC(userStart[0], userStart[1] - 1, userStart[2]);
        let endUtc = startUtc + (userRequest.dayCount + 1) * DAY_MS;
        let period = userRequest.rewardPeriod * MIN_MS;
        let isBuy = userRequest.rewardType.toLowerCase() === "buy";
        let step = userRequest.step ? userRequest.step * MIN_MS : undefined;
        return new RewardCalculatorRequest(startUtc, endUtc, period, isBuy, step);
    };
}

/**
 * @param {number} start - the epoch timestamp of start time (ms)
 * @param {number} end - the epoch timestamp of end time (ms)
 * @param {number} period - the duration of the reward period (ms)
 * @param {boolean} isBuy - buy or not buy (sell)
 * @param {number} [step=10000] - step
 * @constructor
 */
function RewardCalculatorRequest(start, end, period, isBuy, step){
    this.start = start;
    this.end = end;
    this.period = period;
    this.isBuy = isBuy;
    this.step = step || 10000;
}