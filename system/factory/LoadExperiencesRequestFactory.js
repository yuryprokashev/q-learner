const LoadExperiencesRequest = require("../model/request/LoadExperiencesRequest");
module.exports = LoadExperiencesRequestFactory;

/**
 *
 * @constructor
 */
function LoadExperiencesRequestFactory(){
    const MIN_MS = 60 * 1000;
    const DAY_MS = 24 * 60 * MIN_MS;
    /**
     *
     * @param {LoadExperiencesUserRequest} userRequest
     */
    this.create = userRequest =>{
        const userStart = userRequest.start.split("-").map(str => {return parseInt(str);});
        const startUtc = Date.UTC(userStart[0], userStart[1] - 1, userStart[2]);
        const endUtc = startUtc + (userRequest.dayCount + 1) * DAY_MS;
        const period = userRequest.rewardPeriod * MIN_MS;
        const step = userRequest.step ? userRequest.step * MIN_MS : undefined;
        const executionDelay = userRequest.executionDelay;
        return new LoadExperiencesRequest(startUtc, endUtc, period, step, executionDelay);
    };
}