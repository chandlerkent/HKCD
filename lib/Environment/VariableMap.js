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

VariableMap.prototype.getValue = function() {
    return this.value;
};

VariableMap.prototype.getType = function() {
    return this.type;
};

VariableMap.prototype.setType = function(aType) {
    this.type = aType;
};


VariableMap.prototype.toString = function() {
    return "{name: <" + this.name + ">, type: <" + this.type + ">, value: <" + this.value + ">}";
};

VariableMap.prototype.copy = function() {
    var aCopy = new VariableMap(this.name, this.type);
    aCopy.setValue(this.value);
    return aCopy;
};