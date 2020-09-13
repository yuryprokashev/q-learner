module.exports = {
    isDefined: function (parameterName, parameterValue, additionalMessage){
        if(!additionalMessage) additionalMessage ="";
        if(parameterValue === undefined || parameterValue === "") throw new Error(`${parameterName} is not defined.\n${additionalMessage}`);
    },
    isOneElement: function (objects, messageIfNothing, messageIfMany){
        if(objects.length === 0){
            throw new Error(messageIfNothing);
        }
        if(objects.length > 1){
            throw new Error(messageIfMany);
        }
    },
    mustBeTrue: function(boolExpression, messageIfFalse){
        if(!boolExpression) throw new Error(messageIfFalse);
    }
};