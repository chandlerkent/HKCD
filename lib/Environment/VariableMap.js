require("./ArrayMap");

var VariableMap = exports.VariableMap = function(name, type) {
    this.name = name;
    this.type = type;
    this.value = null;
};

VariableMap.prototype.getKey = function() {
    return this.name;
};

VariableMap.prototype.setValue = function(val) {
    this.value = val;
};

VariableMap.prototype.getType = function() {
    return this.type;
};

VariableMap.prototype.toString = function() {
    return "{name: <" + this.name + ">, type: <" + this.type + ">, value: <" + this.value + ">}";
};