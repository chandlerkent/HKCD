var TypeChecker = require("../lib/TypeChecker").TypeChecker;
var ASSERT = require("test/assert");

exports.testClassDecl = require("./TypeChecker/ClassDecl-test");
exports.testFieldDecl = require("./TypeChecker/FieldDecl-test");
exports.testFieldShadow = require("./TypeChecker/FieldShadow-test");
exports.testGatherTypeInfo = require("./TypeChecker/GatherTypeInfo-test");
exports.testMethodOverload = require("./TypeChecker/MethodOverload-test");
exports.testMethodOverride = require("./TypeChecker/MethodOverride-test");
exports.testParameterDecl = require("./TypeChecker/ParameterDecl-test");
exports.testParameterTypes = require("./TypeChecker/ParameterTypes-test");
exports.testReturnType = require("./TypeChecker/ReturnType-test");
exports.testAssignment = require("./TypeChecker/Assignment-test");
exports.testIfWhile = require("./TypeChecker/IfWhile-test");
exports.testInitialAssignment = require("./TypeChecker/InitialAssignment-test");
exports.testMethodDecl = require("./TypeChecker/MethodDecl-test");
exports.testPrintLine = require("./TypeChecker/PrintLine-test");

exports.testThatTypeCheckerProcessesSteps = function() {
    var steps = buildFakes();
    var typeChecker = new TypeChecker(steps);
    var initial_ast = {};
    var initial_env = {};
    
    var result = typeChecker.process(initial_ast, initial_env);
    
    ASSERT.eq({"ast": initial_ast, "env": initial_env}, result);
    ASSERT.eq(true, steps[0].called);
    ASSERT.eq(true, steps[1].called);
}

function buildFakes() {
    return [
        {
            "process" : function(ast, env) {
                this.called = true;
                return {"ast": ast, "env": env};
            },
            "called" : false
        },
        {
            "process" : function(ast, env) {
                this.called = true;
                return {"ast": ast, "env": env};
            },
            "called" : false
        }
    ];
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));