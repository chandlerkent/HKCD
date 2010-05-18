require("./ArrayMap");
var VariableMap = require("./VariableMap").VariableMap;

var ScopeMap = exports.ScopeMap = function() {
    this.variables = [];
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

ScopeMap.prototype.copy = function() {
    var aCopy = new ScopeMap();
    this.variables.forEach(function(varMap) {
        aCopy.addVariable(varMap.copy());
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