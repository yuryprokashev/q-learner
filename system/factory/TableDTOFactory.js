const TableRecordDTO = require("../model/dto/TableRecordDTO");
const TableDTO = require("../model/dto/TableDTO");
module.exports = TableDTOFactory;
function TableDTOFactory(tableName, columnNames, typeNames, dtoColumns){
    this.create = dtoArray =>{
        const _dtoArray = !Array.isArray(dtoArray) ? [dtoArray] : dtoArray;
        const dtoToColumnMappings = dtoColumns.map((dtoKey, index) =>{
            return [dtoKey, index];
        });
        const dtoToColumnIndexMap = new Map(dtoToColumnMappings);

        const records = _dtoArray.map(dto =>{
            const values = Object.keys(dto).reduce((acc, key)=>{
                if(dtoToColumnIndexMap.has(key)){
                    const index = dtoToColumnIndexMap.get(key);
                    acc[index] = dto[key];
                }
                return acc;
            },[])
            return new TableRecordDTO(columnNames, typeNames, values)
        });
        return new TableDTO(tableName, columnNames, typeNames, records);
    };
}