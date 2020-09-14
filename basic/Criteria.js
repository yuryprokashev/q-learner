module.exports.Builder = CriteriaBuilder;

/**
 *
 * @constructor
 */
function CriteriaBuilder(criterion){
    let _conjunctions = [];
    let _criteria = [criterion];
    this.and = criterion =>{
        _criteria.push(criterion);
        _conjunctions.push("and");
        return this;
    };
    this.or = criterion =>{
        _criteria.push(criterion);
        _conjunctions.push("or");
        return this;
    };
    this.build = ()=>{
        return new Criteria(_criteria, _conjunctions);
    };
}

/**
 * Criteria is a group of 2..N Criterion, united with logical operators.
 * @param criteria
 * @param conjunctions
 * @constructor
 */
function Criteria(criteria, conjunctions){
    /**
     * Evaluates if object matches the criteria. Criteria is evaluated from left to right.
     * The result of the first conjunction becomes the first operand for the next expression evaluation.
     * E.g. A and B or C will be computed as A and B = Z, then Z or C => is your result.
     * So 'true and false or true' will be 'true'. 'true and false or false' will be 'false'.
     * @param object
     * @returns {boolean}
     */
    this.evaluate = object =>{
        if(criteria.length === 0) return true;
        let result;
        criteria.forEach((criterion, index)=>{
            let conjunction = conjunctions[index - 1];
            if(!conjunction) result = criterion.evaluate(object);
            if(conjunction && conjunction === "and") result = result && criterion.evaluate(object);
            if(conjunction && conjunction === "or") result = result || criterion.evaluate(object);
        });
        return result;
    };
    /**
     *
     * @param map - the 1-to-1 Map FROM object field names TO datasource column names.
     * @returns {string}
     */
    this.asSql = map =>{
        return criteria.map((criterion, index) => {
            let conjunction = conjunctions[index - 1];
            return `${criterion.asSql(map)} ${conjunction || ""}`;
        }).join(" ");
    };
}