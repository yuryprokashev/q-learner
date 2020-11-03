const ExperienceDTO = require("../model/dto/ExperienceDTO");
const InsertExperienceStatementsFactory = require("../factory/InsertExperienceStatementsFactory");
const DTOArrayToSqliteWriter = require("../io/DTOArrayToSqliteWriter");
const ExperienceTableGroupFactory = require("../factory/ExperienceTableGroupFactory");
module.exports = ExperienceApp;
function ExperienceApp(io){
    const _insertStatementsFactory = new InsertExperienceStatementsFactory();
    const _experienceTableFactory = new ExperienceTableGroupFactory();
    const _dtoArrayToSqliteWriter = new DTOArrayToSqliteWriter(io, _experienceTableFactory, _insertStatementsFactory);
    /**
     *
     * @param experiences{ExperienceDTO[]}
     */
    this.save = experiences =>{
        return _dtoArrayToSqliteWriter.execute(experiences);
    };
}