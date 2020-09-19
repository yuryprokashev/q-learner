module.exports = testEnv =>{
    QUnit.module("virtual-order");
    QUnit.test("getReward", assert =>{
        const voFactory = testEnv.factoryService.getVirtualOrderFactory();
        const tBucketFactory = testEnv.factoryService.getTimeBucketFactory();
        const eFactory = testEnv.factoryService.getEnvironmentFactory();
        const bucketJobConfig = {start: 1577982720000, end: 1577982721948, length: 1000, step: 1000};
        const timeBuckets = tBucketFactory.fromConfig(bucketJobConfig);
        assert.strictEqual(timeBuckets.length, 2, "2 Time buckets are created");
        const eRecords = testEnv.environmentRecordsGateway.read();
        assert.strictEqual(eRecords.length, 2000, "There are 2000 records in the environment-records.csv file");
        const environments = eFactory.fromRecords(eRecords);
        assert.strictEqual(environments.length, 286, "286 Environments are created");
        timeBuckets.forEach(bucket =>{
            environments.forEach(env=>{
                if(bucket.includes(env.getCreatedAt())) bucket.add(env);
            });
        });
        assert.strictEqual(timeBuckets[0].getObjects().length > 0, true, "First Time Bucket has 3 environments");
        const vo = voFactory.fromTimeBucket(timeBuckets[0]);
        assert.strictEqual(vo.getReward("buy"), -0.07999999999998408, "Buy Reward is computed correctly");
        assert.strictEqual(vo.getReward("sell"), -0.06999999999999318, "Sell Reward is computed correctly");
    });
}