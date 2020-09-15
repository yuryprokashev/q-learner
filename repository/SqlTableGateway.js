module.exports = SqlTableGateway;

/**
 *
 * @param db - connection to sql database
 * @param tableDefinition {string} - the sql query that defines the sql table.
 * @example <caption>Simple table definition:</caption>
 * select * from environments
 * @example <caption>Table as query definition</caption>
 * select e.id, e.symbol, e.created, p.name, p.value from parameters as p left join environments as e on e.id = p.environment_id
 * @constructor
 */
function SqlTableGateway(db, tableDefinition){
    const SELECT_ALL = `select * from (${tableDefinition})`;
    /**
     *
     * @param where {string} - the sql formatted string starting from 'where'
     * @example 'where name like '%Jon%' and age >= 30'
     * @returns {*}
     */
    this.read = where =>{
        let template = !where ? SELECT_ALL : `${SELECT_ALL} where${where}`;
        const statement = db.prepare(template);
        return statement.all();
    };
}