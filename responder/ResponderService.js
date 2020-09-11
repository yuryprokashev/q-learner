const ConsoleResponder = require("./ConsoleResponder");
module.exports = ResponderService;
function ResponderService(){
    this.getConsoleResponder = useCase =>{
        return new ConsoleResponder(useCase);
    };
}