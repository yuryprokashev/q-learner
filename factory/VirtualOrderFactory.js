const VirtualOrder = require("../model/VitrualOrder");
module.exports = VirtualOrderFactory;

function VirtualOrderFactory(){
    this.fromTimeBucket = timeBucket =>{
        return new VirtualOrder(timeBucket.getTimeslot(), timeBucket.getObjects());
    };
}