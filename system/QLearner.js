const TimeBucketFactory = require("./factory/TimeBucketFactory");
const VirtualOrderDTOFactory = require("./factory/VirtualOrderDTOFactory");
const EnvironmentApp = require("./apps/EnvironmentApp");
const VirtualOrderFactory = require("./factory/VirtualOrderFactory");
const ConfigurationApp = require("./apps/ConfigurationApp");
const Io = require("./io/io");
const VirtualOrderApp = require("./apps/VirtualOrderApp");
const ExperienceApp = require("./apps/ExperienceApp");
const ExperienceFactory = require("./factory/ExperienceFactory");
const SqlStatementApp = require("./apps/SqlStatementApp");
const ExperienceDTOFactory = require("./factory/ExperienceDTOFactory");

module.exports = QLearnerFacade;
function QLearnerFacade(env){
    const _io = new Io();

    const _configApp = new ConfigurationApp(env);

    const _sqlStatementApp = new SqlStatementApp(_io, _configApp);

    const _environmentApp = new EnvironmentApp(_io, _sqlStatementApp, _configApp);
    const _voApp = new VirtualOrderApp(_io, _sqlStatementApp, _configApp);
    const _experienceApp = new ExperienceApp(_io);

    const _voFactory = new VirtualOrderFactory();
    const _timeBucketFactory = new TimeBucketFactory();
    const _voDTOFactory = new VirtualOrderDTOFactory();
    const _experienceFactory = new ExperienceFactory();
    const _experienceDTOFactory = new ExperienceDTOFactory();

    /**
     *
     * @param loadExperiencesRequest {LoadExperiencesRequest}
     *
     */
    this.loadExperiences = loadExperiencesRequest =>{
        const envs = _environmentApp.getByCreatedDate(loadExperiencesRequest.start, loadExperiencesRequest.end);
        const firstEnvironment = envs[0];
        const lastEnvironment = envs[envs.length - 1];
        const tBucketJob = {
            start: firstEnvironment.getCreatedAt(),
            end: lastEnvironment.getCreatedAt(),
            length: loadExperiencesRequest.period,
            step: loadExperiencesRequest.step
        };
        const tBuckets = _timeBucketFactory.fromConfig(tBucketJob);
        tBuckets.forEach(bucket =>{
            envs.forEach(env =>{
                if(bucket.includes(env.getCreatedAt())) bucket.add(env);
            });
        });
        const orders = tBuckets.map(bucket =>{
            return _voFactory.fromEnvironments(bucket.getObjects(), bucket.getTimeslot().getDuration(), loadExperiencesRequest.executionDelay);
        });
        const orderDTOs = orders.map(vOrder =>{
            return _voDTOFactory.create(vOrder);
        });

        const experienceDTOs = orders.map(order =>{
            const environmentSent = order.getOrderSentEnvironment();
            const refEnvironment = _environmentApp.getReferenceEnvironment(environmentSent, loadExperiencesRequest.referenceTimeShift);
            const experience = _experienceFactory.create(environmentSent, refEnvironment);
            return _experienceDTOFactory.create(experience, order.getId());
        });
        _voApp.save(orderDTOs);
        return _experienceApp.save(experienceDTOs);
    };
}