var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var CodeGenerator = require("./CodeGenerator").CodeGenerator;

var Compiler = exports.Compiler = function(options, steps) {    
    this.steps = steps || [new Parser(), new TypeChecker(), new CodeGenerator()];
    this.debugMode = options.debug;
    print(options.args[0]);
    this.file = options.args[0];
    this.errors = [];
};

Compiler.prototype.addErrors = function(errors) {
    this.errors = this.errors.concat([].concat(errors));
};

Compiler.prototype.debug = function(message) {
    if (this.debugMode)
        print(message);
};

Compiler.prototype.compile = function() {
    var i = 0;
    var data = this.file;
    while ((data !== false) && (i < this.steps.length)) {
        data = this.steps[i].execute(data, this);
        i++;
    }
    
    if (data === false) {
        print("===============");
        print("COMPILE FAILED.");
        print("===============");
        print(this.errors.join("\n"));
        return this.errors.join("\n");
    } else {
        print("===============================");
        print("COMPILE FINISHED SUCCESSFULLLY.");
        print("===============================");
        return "SUCCESS!";
    }
};