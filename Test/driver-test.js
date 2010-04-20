var Driver = require("../lib/driver").Driver;
var ASSERT = require("assert");

exports.testThatDriverProcessesSteps = function() {
    var steps = buildFakes();
    var driver = new Driver(steps);
    var initial = {};
    
    var result = driver.process(initial);
    
    ASSERT.equal(result, initial);
    ASSERT.equal(true, steps[0].called);
    ASSERT.equal(true, steps[1].called);
}

function buildFakes() {
    return [
        {
            "process" : function(ast) {
                this.called = true;
                return ast;
            },
            "called" : false
        },
        {
            "process" : function(ast) {
                this.called = true;
                return ast;
            },
            "called" : false
        }
    ];
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));