module.exports = Timeslot;

/**
 *
 * @param start
 * @param end
 * @constructor
 */
function Timeslot(start, end){
    this.getDuration = ()=>{
        return end - start;
    };
    this.getStart = ()=>{
        return start;
    };
    this.getEnd = ()=>{
        return end;
    };
    this.includes = timestamp =>{
        return timestamp <= end && timestamp >= start;
    };
}