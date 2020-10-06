const ExecutionChainBuilder = require("../../basic/ExecutionChain").Builder;
module.exports = ()=>{
    QUnit.module("execution-chain", {
        before: ()=>{
            const exec1 = {
                create: input =>{
                    return {
                        exec1: input.key + " exec1 done"
                    }
                }
            }
            const exec2 = {
                create: input =>{
                    const key = input.exec1 ? input.exec1 : input.key;
                    return {
                        exec2: key + " exec2 done"
                    }
                }
            }
            this.input = {
                key: "value"
            };
            this.sChain = new ExecutionChainBuilder()
                .addExecutor(exec1)
                .addExecutor(exec2)
                .addMethod("create")
                .build()
            this.pChain = new ExecutionChainBuilder()
                .addExecutor(exec1)
                .addExecutor(exec2)
                .addMethod("create")
                .setParallel(true)
                .build()
        }
    });
    QUnit.test("Can run executors on the input sequentially", assert =>{
        const result = this.sChain.execute(this.input);
        assert.strictEqual(result.exec2, "value exec1 done exec2 done");
    });
    QUnit.test("Can run executors on the input in parallel", assert =>{
        const result = this.pChain.execute(this.input);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0].exec1, "value exec1 done");
        assert.strictEqual(result[0].exec2, undefined);
        assert.strictEqual(result[1].exec1, undefined);
        assert.strictEqual(result[1].exec2, "value exec2 done");
    });
}