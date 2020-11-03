module.exports = (symbol, sent, duration, executionDelay)=> {
    return `v-order-${symbol}-${sent}-${duration/1000}-${executionDelay}`;
}