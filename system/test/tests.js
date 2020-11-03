const ConfigurationApp = require("../apps/ConfigurationApp");
const Io = require("../io/io");

const SqliteActionTest = require("./SqliteActionTest");
const VirtualOrderTransformationsTest = require("./VirtualOrderTransformationsTest");
const VirtualOrderTest = require("./VirtualOrderTest");
const EnvironmentAppTest = require("./EnvironmentAppTest");
const ExperienceFactoryTest = require("./ExperienceFactoryTest");
const VirtualOrderAppTest = require("./VirtualOrderAppTest");
const ExperienceTransformationsTest = require("./ExperienceTransformationsTest");

const io = new Io();
const configApp = new ConfigurationApp("test");

SqliteActionTest(io, configApp);
VirtualOrderTransformationsTest(io, configApp);
VirtualOrderTest(io, configApp);
EnvironmentAppTest(io, configApp);
ExperienceFactoryTest(io, configApp);
VirtualOrderAppTest(io, configApp);
ExperienceTransformationsTest(io, configApp);