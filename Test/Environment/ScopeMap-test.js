var ScopeMap = require("../../lib/Environment").ScopeMap;
var ASSERT = require("test/assert");
var VariableMap = require("../../lib/Environment").VariableMap;

exports.testThatScopeMapInitializes = function() {
    var scope = new ScopeMap();
    
    ASSERT.eq("[]", scope.toString());
};

exports.testThatScopeMapAddVariable = function() {
    var scope = new ScopeMap();
    var variable = new VariableMap("x", "int");
    
    scope.addVariable(variable);
    
    ASSERT.isTrue(scope.hasVariable("x"));
    
    ASSERT.eq(variable, scope.getVariable("x"));
};

exports.testThatScopeMapCopies = function() {
    var scope = new ScopeMap();
    var variable = new VariableMap("x", "int");
    
    scope.addVariable(variable);
    
    var copy = scope.copy();
    
    ASSERT.eq("[{name: <x>, type: <int>, value: <null>}]", copy.toString());
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));