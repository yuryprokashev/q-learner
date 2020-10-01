const CriteriaBuilder = require("../model/Criteria").Builder;
const CriterionBuilder = require("../model/Criterion").Builder;
module.exports = CriteriaFactory;

function CriteriaFactory(){
    this.fromObject = obj =>{
        let criteriaBuilder;
        Object.keys(obj).forEach(key =>{
            const value = typeof obj[key] === "function" ? obj[key]() : obj[key];
            const criterion = new CriterionBuilder().setExpectedValue(value).setFieldName(key).build();
            if(!criteriaBuilder) criteriaBuilder = new CriteriaBuilder(criterion);
            if(criteriaBuilder) criteriaBuilder.and(criterion);
        });
        return criteriaBuilder.build();
    };
}