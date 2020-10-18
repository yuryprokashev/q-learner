const Timeslot = require("../model/entity/Timeslot");
const TimeBucket = require("../model/entity/TimeBucket");
const Validator = require("../../basic/Validator");
module.exports = TimeBucketFactory;

function TimeBucketFactory(){
    this.fromCriteria = criteria =>{
        let start = criteria.getCriterion("start").expected();
        let end = criteria.getCriterion("end").expected();
        let duration = criteria.getCriterion("length").expected();
        let step = criteria.getCriterion("step").expected();
        return _createTimeBuckets(start, end, duration, step);
    };
    /**
     *
     * @param jobConfig.start {number} - timestamp (ms) defining the start of first time bucket.
     * @param jobConfig.end {number} - timestamp (ms) defining the end of the last time bucket.
     * @param jobConfig.length {number} - the duration of each time bucket (ms).
     * @param jobConfig.step {number} - the duration between the start of the first time bucket and the start of the next time bucket.
     * @returns {TimeBucket[]}
     */
    this.fromConfig = jobConfig =>{
        return _createTimeBuckets(jobConfig.start, jobConfig.end, jobConfig.length, jobConfig.step);
    };
    function _createTimeBuckets(start, end, duration, step){
        _validateInput(start, end, duration, step);
        let buckets = [];
        let bucketCount = 0;
        while(true){
            if(start + step * bucketCount > end) break;
            let timeslot = new Timeslot(start + step * bucketCount, start + step * bucketCount + duration);
            buckets.push(new TimeBucket(timeslot));
            bucketCount++;
        }
        return buckets;
    }
    function _validateInput(start, end, duration, step){
        Validator.isDefined("Buckets Start Timestamp", start);
        Validator.isDefined("Buckets End Timestamp", end);
        Validator.isDefined("Bucket Duration", duration);
        Validator.isDefined("Bucket Step", step);
    }
}