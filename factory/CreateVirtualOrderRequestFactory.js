const CreateVirtualOrdersRequest = require("../model/request/CreateVirtualOrdersRequest");
module.exports = CreateVirtualOrderRequestFactory;

/**
 *
 * @constructor
 */
function CreateVirtualOrderRequestFactory(){
    const MIN_MS = 60 * 1000;
    const DAY_MS = 24 * 60 * MIN_MS;
    /**
     *
     * @param {CreateVirtualOrdersUserRequest} userRequest
     */
    this.create = userRequest =>{
        const userStart = userRequest.start.split("-").map(str => {return parseInt(str);});
        const startUtc = Date.UTC(userStart[0], userStart[1] - 1, userStart[2]);
        const endUtc = startUtc + (userRequest.dayCount + 1) * DAY_MS;
        const period = userRequest.rewardPeriod * MIN_MS;
        const step = userRequest.step ? userRequest.step * MIN_MS : undefined;
        return new CreateVirtualOrdersRequest(startUtc, endUtc, period, step);
    };
}