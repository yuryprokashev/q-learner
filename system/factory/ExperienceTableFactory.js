const TableDTOFactory = require("./TableDTOFactory");

module.exports = ExperienceTableFactory;
function ExperienceTableFactory(){
    const TABLE_COLUMNS = ["Id", "Virtual Order Id", "Current Environment", "Reference Environment", "Code"];
    const TABLE_COLUMN_TYPES = ["String", "String", "String", "String", "String"];
    const DTO_COLUMNS = ["id", "virtualOrderId", "currentEnvironmentId", "referenceEnvironmentId", "code"];
    const _tableDTOFactory = new TableDTOFactory("Experiences", TABLE_COLUMNS, TABLE_COLUMN_TYPES, DTO_COLUMNS);
    this.create = dto =>{
        return _tableDTOFactory.create(dto);
    };
}