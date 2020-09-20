const VirtualOrder = require("../model/VitrualOrder");
module.exports = VirtualOrderFactory;

function VirtualOrderFactory(){
    this.fromTimeBucket = (timeBucket, executionDelay) =>{
        let delay = executionDelay || 0;
        let firstEnv = timeBucket.getObjects()[0];
        let symbol = firstEnv.getSymbol();
        let sent = firstEnv.getCreatedAt();
        let duration = timeBucket.getTimeslot().getDuration();
        let id = _virtualOrderId(symbol, sent, duration,delay);
        return new VirtualOrder(id, timeBucket.getTimeslot(), timeBucket.getObjects(), delay);
    };
    function _virtualOrderId(symbol, sent, duration, executionDelay){
        return `v-order-${symbol}-${sent}-${duration}-${executionDelay}`;
    }
}