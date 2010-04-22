var ClassMap = exports.ClassMap = function(name, superclass) {
    this.name = name;
    this.superclass = superclass;
    this.fields = [];
    this.methods = [];
};

ClassMap.prototype.getKey = function() {
    return this.name;
};

ClassMap.prototype.getSuperclass = function() {
    return this.superclass;
};

ClassMap.prototype.getFieldType = function(fieldName) {
    if (!this.hasField(fieldName)) {
        throw("Cannot access type of undefined field " + fieldName);
    }
    
    return this._getField(fieldName).type;
};

ClassMap.prototype.getMethod = function(methodName) {
    var i = this.methods.length - 1;
    while (i >= 0) {
        var methodMap = this.methods[i];
        if (methodMap.getKey() === methodName) {
            return methodMap;
        }
        i--;
    }
    return null;
};

ClassMap.prototype.addField = function(fieldName, fieldType) {
    this.fields.push({"name": fieldName, "type": fieldType});
};

ClassMap.prototype.addMethod = function(methodMap) {
    this.methods.push(methodMap);
};

ClassMap.prototype.hasField = function(fieldName) {
    return (this._getField(fieldName) !== null);
};

ClassMap.prototype.hasMethod = function(methodName) {
    return (this.getMethod(methodName) !== null);
};

ClassMap.prototype.hasMultipleOfField = function(fieldName) {
    var foundOnce = false;
    
    var i = this.fields.length - 1;
    while (i >= 0) {
        if (this.fields[i].name === fieldName) {
            if (foundOnce)
                return true;
            else
                foundOnce = true;
        }
        i--;
    }
    
    return false;
};

ClassMap.prototype.hasMultipleOfMethod = function(methodName) {
    var foundOnce = false;
    
    var i = this.methods.length - 1;
    while (i >= 0) {
        if (this.methods[i].getKey() === methodName) {
            if (foundOnce)
                return true;
            else
                foundOnce = true;
        }
        i--;
    }
    
    return false;
};


// Private
ClassMap.prototype._getField = function(fieldName) {
    var i = this.fields.length - 1;
    while (i >= 0) {
        if (this.fields[i].name === fieldName) {
            return this.fields[i];
        }
        i--;
    }
    return null;
};