var Driver = require("../lib/TypeChecker/Driver").Driver;
var ASSERT = require("test/assert");

exports.testThatDriverProcessesSteps = function() {
    var steps = buildFakes();
    var driver = new Driver(steps);
    var initial_ast = {};
    var initial_env = {};
    
    var result = driver.process(initial_ast, initial_env);
    
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