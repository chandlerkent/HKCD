require("./ArrayMap");

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
    var field = this.fields.getByKey(fieldName);
    if (!field) {
        throw new Error("Cannot access type of undefined field " + fieldName);
    }
    
    return field.getType();
};

ClassMap.prototype.getMethod = function(methodName) {
    return this.methods.getByKey(methodName);
};

ClassMap.prototype.getField = function(fieldName) {
    return this.fields.getByKey(fieldName);
};

ClassMap.prototype.addField = function(fieldMap) {
    this.fields.push(fieldMap);
};

ClassMap.prototype.addMethod = function(methodMap) {
    this.methods.push(methodMap);
};

ClassMap.prototype.hasField = function(fieldName) {
    return this.fields.containsKey(fieldName);
};

ClassMap.prototype.hasMethod = function(methodName) {
    return this.methods.containsKey(methodName);
};

ClassMap.prototype.hasMultipleOfField = function(fieldName) {
    return this.fields.hasMultipleByKey(fieldName);
};

ClassMap.prototype.hasMultipleOfMethod = function(methodName) {
    return this.methods.hasMultipleByKey(methodName);
};

ClassMap.prototype.toString = function() {
    var result = "{";
    
    result += "name: ";
    result += "<" + this.name + ">, ";
    
    result += "superclass: ";
    result += "<" + this.superclass + ">, ";
    
    result += "fields: ";
    result += "<[";
    result += this.fields.map(function(field) {
        return "{name: <" + field.name + ">, type: <" + field.type + ">}";
    }).join(", ");
    
    result += "]>, ";
    
    result += "methods: ";
    result += "<[";
    result += this.methods.map(function(method) {
        return method.toString();
    }).join(", ");
    result += "]>";
    
    result += "}";
    return result;
};