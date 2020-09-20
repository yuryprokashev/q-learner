module.exports = testEnv =>{
    QUnit.module("virtual-order", {
        before: ()=>{
            const voFactory = testEnv.factoryService.getVirtualOrderFactory();
            const tBucketFactory = testEnv.factoryService.getTimeBucketFactory();
            const eFactory = testEnv.factoryService.getEnvironmentFactory();
            const bucketJobConfig = {start: 1577982720000, end: 1577982721948, length: 1000, step: 1000};
            const timeBuckets = tBucketFactory.fromConfig(bucketJobConfig);
            const eRecords = testEnv.environmentRecordsGateway.read();
            const environments = eFactory.fromRecords(eRecords);
            timeBuckets.forEach(bucket =>{
                environments.forEach(env=>{
                    if(bucket.includes(env.getCreatedAt())) bucket.add(env);
                });
            });
            this.timeBuckets = timeBuckets;
            this.eRecords = eRecords;
            this.environments = environments;
            this.vo = voFactory.fromTimeBucket(timeBuckets[0]);
        }
    });
    QUnit.test("Virtual Order Assembly Process", assert =>{
        assert.strictEqual(this.timeBuckets.length, 2, "2 Time buckets are created");
        assert.strictEqual(this.eRecords.length, 2000, "There are 2000 records in the environment-records.csv file");
        assert.strictEqual(this.environments.length, 286, "286 Environments are created");
        assert.strictEqual(this.timeBuckets[0].getObjects().length > 0, true, "First Time Bucket has 3 environments");
    })
    QUnit.test("getId", assert =>{
        assert.strictEqual(this.vo.getId(), "v-order-_MSFT-1577982720000-1000-0");
    });
    QUnit.test("getReward", assert =>{
        assert.strictEqual(this.vo.getReward("buy"), -0.07999999999998408, "Buy Reward is computed correctly");
        assert.strictEqual(this.vo.getReward("sell"), -0.06999999999999318, "Sell Reward is computed correctly");
    });
}