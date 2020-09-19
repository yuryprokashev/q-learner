const OperatorTest = require("./OperatorExpressionTest");
const CriteriaTest = require("./CriteriaTest");
const EnvironmentRepositoryTest = require("./EnvironmentRepositoryTest");
const DbTest = require("./DbTest");
const VirtualOrderTest = require("./VirtualOrderTest");

const TestEnvironment = require("./TestEnvironment");
const testEnvironment = new TestEnvironment();
OperatorTest();
CriteriaTest();
EnvironmentRepositoryTest(testEnvironment);
DbTest(testEnvironment);
VirtualOrderTest(testEnvironment);
