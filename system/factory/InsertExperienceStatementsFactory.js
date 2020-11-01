const TableGroupInsertStatementsFactory = require("./TableGroupInsertStatementsFactory");
module.exports = InsertExperienceStatementsFactory;

function InsertExperienceStatementsFactory(){
    const EXPERIENCE_COLUMN_MAP = [
        ["id", "Id"], ["virtual_order_id", "Virtual Order Id"], ["current_environment_id", "Current Environment"],
        ["reference_environment_id", "Reference Environment"], ["code", "Code"]
    ];
    const SQL_COLUMNS_MAP = [
        ["experiences", "id, virtual_order_id, current_environment_id, reference_environment_id, code"],
        ["experience_parameters", "id, name, value, parent_id"]
    ]
    const PARAM_COLUMNS_MAP = [
        ["id", "Id"], ["name", "Name"], ["value", "Value"], ["parent_id", "Parent Id"]
    ];
    const TABLE_MAP = [["Experiences", "experiences"], ["Parameters", "experience_parameters"]];
    const RECORD_MAPPINGS_BY_TABLE = [
        ["Experiences", EXPERIENCE_COLUMN_MAP],
        ["Parameters", PARAM_COLUMNS_MAP]
    ];
    /**
     *
     * @param tables{TableDTO[]}
     * @returns {string[]}
     */
    this.create = tables =>{
        return TableGroupInsertStatementsFactory(tables, TABLE_MAP, SQL_COLUMNS_MAP, RECORD_MAPPINGS_BY_TABLE);
    };
}