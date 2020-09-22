module.exports = SqlStatementFactory;
function SqlStatementFactory(mappings){
    const _map = new Map(mappings);
    const _operatorMap = new Map()
        .set("equal", "= ??")
        .set("gte", ">= ??")
        .set("gt", "> ??")
        .set("lte", "<= ??")
        .set("lt", "< ??")
        .set("match", "glob ??")
        .set("contains", "like '%??%'");
    this.where = criteria =>{
        return criteria.asSql(mappings);
    };
    this.values = criteria =>{

    };
    function _whereCriterionData(criterionData){
        const dbColumnName = _map.get(criterionData);
        return `${dbColumnName} ${_operatorExpressionSql(criterionData)}`
    }
    function _operatorExpressionSql(criterionData){
        if(criterionData.operator === "contains") return _operatorMap.get(criterionData.operator).replace("??", criterionData.expected);
        return _operatorMap.get(criterionData.operator).replace("??", _sqlNumberOrString(criterionData.expected));
    }
    function _sqlNumberOrString(value){
        return `${typeof value === "string" ? `'${value}'` : value}`;
    }
}