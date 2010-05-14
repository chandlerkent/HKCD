var Parser = require("../lib/Parser").Parser;
var UTILS = require("../lib/utils");

exports.testThatTypeCheckerProcessesSteps = function() {
    var bytes = UTILS.readFile("Test/Files/Closure/testcase00_00.java");
    var parser = new Parser();
    var ast = parser.parse(bytes);

    print(ast.errors);
    print(ast);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));