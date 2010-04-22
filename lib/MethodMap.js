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

MethodMap.prototype.getParameterType = function(paramName) {
    if (!this._hasParameter(paramName)) {
        throw("Cannot access type of undefined parameter " + paramName);
    }
    
    return this._getParameter(paramName).type;
};

MethodMap.prototype.addParameter = function(paramName, paramType) {
    this.parameters.push({"name": paramName, "type": paramType});
};

MethodMap.prototype.hasMultipleOfParameter = function(paramName) {
    var foundOnce = false;
    
    var i = this.parameters.length - 1;
    while (i >= 0) {
        if (this.parameters[i].name === paramName) {
            if (foundOnce)
                return true;
            else
                foundOnce = true;
        }
        i--;
    }
    
    return false;
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
    for (var i = 0; i < this.parameters.length; i++) {
        var param = this.parameters[i];
        result += "{";
        result += "name: ";
        result += "<" + param.name + ">, ";
        result += "type: ";
        result += "<" + param.type + ">";
        result += "}" + ((i === this.parameters.length - 1) ? "" : ", ");
    }
    result += "]>";
    
    result += "}";
    return result;
};

// Private
MethodMap.prototype._getParameter = function(paramName) {
    var i = this.parameters.length - 1;
    while (i >= 0) {
        if (this.parameters[i].name === paramName) {
            return this.parameters[i];
        }
        i--;
    }
    return null;
};

MethodMap.prototype._hasParameter = function(paramName) {
    return (this._getParameter(paramName) !== null);
};

MethodMap.prototype._hash = function() {
    var hash = [];
    
    hash.push(this.name);
    hash.push(this.returnType);
    this.parameters.forEach(function(param) {
        hash.push(param.name);
        hash.push(param.type);
    });
    
    return hash.join("__++__");
};