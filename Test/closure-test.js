var Parser = require("../lib/Parser").Parser;
var TypeChecker = require("../lib/TypeChecker").TypeChecker;
var UTILS = require("../lib/utils");

exports.testThatTypeCheckerProcessesSteps = function() {
    var bytes = UTILS.readFile("Test/Files/Closure/testcase00_00.java");
    var parser = new Parser();
    var ast = parser.parse(bytes);

    print(ast.errors);
    print(ast);
};

exports.testThatTypeCheckerProcessesSteps = function() {
    var ast = (new Parser()).parse(UTILS.readFile("Test/Files/Closure/testcase00_00.java"));
    var typeChecker = new TypeChecker();
    
    var result = typeChecker.typeCheck(ast);
    
    print(result.env.errors);
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));