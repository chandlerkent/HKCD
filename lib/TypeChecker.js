var Environment = require("./Environment").Environment;

var ClassDecl = exports.ClassDecl = require("./TypeChecker/ClassDecl");
var MethodOverload = exports.MethodOverload = require("./TypeChecker/MethodOverload");
var FieldDecl = exports.FieldDecl = require("./TypeChecker/FieldDecl");
var FieldShadow = exports.FieldShadow = require("./TypeChecker/FieldShadow");
var ParameterDecl = exports.ParameterDecl = require("./TypeChecker/ParameterDecl");
var ParameterTypes = exports.ParameterTypes = require("./TypeChecker/ParameterTypes");
var MethodOverride = exports.MethodOverride = require("./TypeChecker/MethodOverride");
var MethodDecl = exports.MethodDecl = require("./TypeChecker/MethodDecl");
var GatherTypeInfo = exports.GatherTypeInfo = require("./TypeChecker/GatherTypeInfo");
var ReturnType = exports.ReturnType = require("./TypeChecker/ReturnType");
var InitialAssignment = exports.InitialAssignment = require("./TypeChecker/InitialAssignment");
var Assignment = exports.Assignment = require("./TypeChecker/Assignment");
var PrintLine = exports.PrintLine = require("./TypeChecker/PrintLine");
var IfWhile = exports.IfWhile = require("./TypeChecker/IfWhile");

var TypeChecker = exports.TypeChecker = function(steps) {
    this.steps = []; // steps;
    
    // randomization to test steps are not dependent on order
    var i = 0;
    while (i < steps.length) {
        var random = Math.floor(Math.random()*steps.length);
        if (this.steps.indexOf(steps[random]) < 0) {
            this.steps[i] = steps[random];
            i++;
        }
    }
};

TypeChecker.prototype.process = function(ast, env) {
    var currentResult = {"ast": ast, "env": env};
    
    this.steps.forEach(function(step) {
        currentResult = step.process(currentResult.ast, currentResult.env);
    });
    
    return currentResult;
};

TypeChecker.prototype.typeCheck = function(ast) {
    var env = GatherTypeInfo.process(ast, new Environment()).env;

    return this.process(ast, env);
};


var UTILS = require("./utils");

function main() {
    var optionsParser = new (require("args").Parser)();

    optionsParser.usage("INPUT_FILE");
    optionsParser.help("Parses then type checks an input file and outputs the generated AST or errors (if any).");

    optionsParser.option("-g", "grammar")
        .def("src/grammar.json")
        .set()
        .help("Specifies the grammar file (default src/grammar.json).");

    optionsParser.helpful();

    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }
    
    print("Type checking file: " + options.args[0]);

    var parser = new (require("./parser").Parser)(UTILS.readGrammarFromFile(options.grammar));
    var result = parser.parse(UTILS.readFile(options.args[0]));
    if (result.errors) {
        print(result.errors.join("\n"));
        return -1;
    }

    var env = exports.typeCheck(result).env;
    print("Environment:");
    print(env.toString());
    return (env.errors.length > 0) ? -1 : 0;
}

if (require.main === module)
    require("os").exit(main());