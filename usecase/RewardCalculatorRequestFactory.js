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
        let startUtc = Date.UTC(userStart[0], userStart[1], userStart[2]);
        let endUtc = startUtc + userRequest.dayCount * DAY_MS;
        let period = userRequest.rewardPeriod * MIN_MS;
        let isBuy = userRequest.rewardType.toLowerCase() === "buy";
        return new RewardCalculatorRequest(startUtc, endUtc, period, isBuy);
    };
}

/**
 * @param {number} start - the epoch timestamp of start time (ms)
 * @param {number} end - the epoch timestamp of end time (ms)
 * @param {number} period - the duration of the reward period (ms)
 * @param {boolean} isBuy - buy or not buy (sell)
 * @constructor
 */
function RewardCalculatorRequest(start, end, period, isBuy){
    this.getStart = ()=>{
        return start;
    };
    this.getEnd = ()=>{
        return end;
    };
    this.getPeriod = ()=>{
        return period;
    };
    this.isBuy = ()=>{
        return isBuy;
    };
}