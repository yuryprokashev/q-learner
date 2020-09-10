const ComputeRewardsUserRequest = require("./ComputeRewardUserRequest");
const RewardCalculatorRequestFactory = require("./RewardCalculatorRequestFactory");
const RewardCalculator = require("./RewardCalculator");
const ConsoleResponder = require("./ConsoleResponder");
const RewardCalculatorContextFactory = require("./RewardCalculatorContextFactory");
const EnvironmentRepository = require("./EnvironmentRepository")
const Database = require("better-sqlite3");
const db = new Database("C:/Users/yuryp/AppData/Roaming/MetaQuotes/Terminal/Common/Files/mt5.sqlite");
let parameterRepository = new EnvironmentParameterRepository(db);
let environmentRepository = new EnvironmentRepository(db);
let environmentApp = new EnvironmentApp(environmentRepository, parameterRepository);
let useCaseRequestFactory = new RewardCalculatorRequestFactory();
let useCaseContextFactory = new RewardCalculatorContextFactory(environmentRepository);
let useCase = new RewardCalculator(useCaseRequestFactory, useCaseContextFactory);
let responder = new ConsoleResponder(useCase);
process.on('exit', () => db.close());
let userRequest = new ComputeRewardsUserRequest("2020-01-02", 0, 10, "buy");
responder.respond(userRequest);