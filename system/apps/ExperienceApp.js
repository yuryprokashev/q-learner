const ExperienceDTO = require("../model/dto/ExperienceDTO");
const ExperienceTablesFactory = require("../factory/TableGroupFactory");
const InsertExperienceStatementsFactory = require("../factory/InsertExperienceStatementsFactory");
const DTOArrayToSqliteWriter = require("../io/DTOArrayToSqliteWriter");
module.exports = ExperienceApp;
function ExperienceApp(io){
    const _insertStatementsFactory = new InsertExperienceStatementsFactory();
    const _experienceTableFactory = new ExperienceTablesFactory();
    const _dtoArrayToSqliteWriter = new DTOArrayToSqliteWriter(io, _experienceTableFactory, _insertStatementsFactory);
    /**
     *
     * @param experiences{ExperienceDTO[]}
     */
    this.save = experiences =>{
        return _dtoArrayToSqliteWriter.execute(experiences);
    };
}