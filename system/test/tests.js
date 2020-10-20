const ConfigurationApp = require("../apps/ConfigurationApp");
const Io = require("../io/io");

const SqliteActionTest = require("./SqliteActionTest");
const VirtualOrderTransformationsTest = require("./VirtualOrderTransformationsTest");
const VirtualOrderTest = require("./VirtualOrderTest");
const EnvironmentAppTest = require("./EnvironmentAppTest");
const ExperienceFactoryTest = require("./ExperienceFactoryTest")

const configApp = new ConfigurationApp("test");
const io = new Io(configApp);
SqliteActionTest(io);
VirtualOrderTransformationsTest(io);
VirtualOrderTest(io);
EnvironmentAppTest(io);
ExperienceFactoryTest(io);