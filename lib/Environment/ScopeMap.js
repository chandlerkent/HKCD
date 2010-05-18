require("./ArrayMap");
var VariableMap = require("./VariableMap").VariableMap;

var ScopeMap = exports.ScopeMap = function() {
    this.variables = [];
    this.closures = [];
};

ScopeMap.prototype.addVariable = function(variableMap) {
    this.variables.push(variableMap);
};

ScopeMap.prototype.hasVariable = function(varName) {
    return this.variables.containsKey(varName);
};

ScopeMap.prototype.getVariable = function(varName) {
    return this.variables.getByKey(varName);
};

ScopeMap.prototype.addClosure = function(methodMap) {
    this.closures.push(methodMap);
};

ScopeMap.prototype.hasClosure = function(closureName) {
    return this.closures.containsKey(closureName);
};

ScopeMap.prototype.getClosure = function(closureName) {
    return this.closures.getByKey(closureName);
};

ScopeMap.prototype.copy = function() {
    var aCopy = new ScopeMap();
    this.variables.forEach(function(varMap) {
        aCopy.addVariable(varMap.copy());
    });
    this.closures.forEach(function(closure) {
        aCopy.addClosure(closure.copy());
    });
    return aCopy;
};

ScopeMap.prototype.toString = function() {
    var result = "[";
    
    result += this.variables.map(function(variable) {
        return variable.toString();
    }).join("\n");
    
    result += "]";
    return result;
};