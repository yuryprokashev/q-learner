const EnvironmentRepositoryTest = require("./EnvironmentRepositoryTest");
const EnvironmentParameterRepositoryTest = require("./EnvironmentParameterRepositoryTest");
const DbTest = require("./DbTest");

const TestEnvironment = require("./TestEnvironment");
const testEnvironment = new TestEnvironment();
process.on('exit', () => testEnvironment.db.close())
//EnvironmentRepositoryTest(testEnvironment);
EnvironmentParameterRepositoryTest(testEnvironment);
//DbTest(testEnvironment);
