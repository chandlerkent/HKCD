var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var CodeGenerator = require("./CodeGenerator").CodeGenerator;
var CodeRunner = require("./CodeRunner").CodeRunner;

var Compiler = exports.Compiler = function(options, steps, reporter) {    
    this.steps = steps || [new Parser(), new TypeChecker(), new CodeGenerator(), new CodeRunner()];
    this.debugMode = options.debug;
    this.file = options.args[0];
    this.errors = [];
    this.result = null;
    this.reporter = reporter || null;
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
    
    if (this.reporter) {
        this.reporter.execute(data, this);
    }
    
    return (data === false) ? false : data;
};