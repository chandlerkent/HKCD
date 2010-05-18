require("./ArrayMap");

var MethodMap = exports.MethodMap = function(name, returnType) {
    this.name = name;
    this.returnType = returnType;
    this.parameters = [];
};

MethodMap.prototype.getKey = function(key) {
    return this.name;
};

MethodMap.prototype.getReturnType = function() {
    return this.returnType;
};

MethodMap.prototype.setReturnType = function(aType) {
    this.returnType = aType;
};

MethodMap.prototype.getParameterType = function(paramName) {
    var param = this.parameters.getByKey(paramName);
    if (!param) {
        throw("Cannot access type of undefined parameter " + paramName);
    }
    
    return param.getType();
};

MethodMap.prototype.getParameters = function() {
    return this.parameters;
};

MethodMap.prototype.getParameter = function(paramName) {
    return this.parameters.getByKey(paramName);
}

MethodMap.prototype.addParameter = function(param) {
    this.parameters.push(param);
};

MethodMap.prototype.hasMultipleOfParameter = function(paramName) {
    return this.parameters.hasMultipleByKey(paramName);
};

MethodMap.prototype.equals = function(other) {
    return (this._hash() === other._hash());
};

MethodMap.prototype.toString = function() {
    var result = "{";
    
    result += "name: ";
    result += "<" + this.name + ">, ";
    
    result += "returnType: ";
    result += "<" + this.returnType + ">, ";
    
    result += "parameters: ";
    result += "<[";
    result += this.parameters.map(function(param) {
        return "{name: <" + param.name + ">, type: <" + param.type + ">}";
    }).join(", ");
    result += "]>";
    
    result += "}";
    return result;
};

MethodMap.prototype.copy = function() {
    var aCopy = new MethodMap(this.name, this.returnType);
    this.parameters.forEach(function(param) {
        aCopy.addParameter(param.copy());
    });
    return aCopy;
};

MethodMap.prototype._hash = function() {
    var hash = [];
    
    hash.push(this.name);
    hash.push(this.returnType);
    this.parameters.forEach(function(param) {
        hash.push(param.type);
    });
    
    return hash.join("__++__");
};