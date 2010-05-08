var VariableMap = require("../../lib/Environment").VariableMap;
var ASSERT = require("test/assert");

exports.testThatVariableMapInitializes = function() {
    var varMap = new VariableMap("x", "int");
    
    ASSERT.eq("x", varMap.getKey());
    ASSERT.eq("int", varMap.getType());
};

exports.testThatVariableMapPrintsToString = function() {
    var varMap = new VariableMap("x", "int");
    
    varMap.setValue(2);
    
    ASSERT.eq("{name: <x>, type: <int>, value: <2>}");
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));