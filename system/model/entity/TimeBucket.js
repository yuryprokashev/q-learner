module.exports = TimeBucket;

/**
 *
 * @param timeslot
 * @constructor
 */
function TimeBucket(timeslot){
    let _objects = [];
    this.add = obj =>{
        _objects.push(obj);
        return this;
    };
    this.getObjects = ()=>{
        return _objects;
    }
    this.getTimeslot = ()=>{
        return timeslot;
    };
    this.includes = timestamp =>{
        return timeslot.includes(timestamp);
    };
}