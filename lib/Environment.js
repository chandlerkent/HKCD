require("./ArrayMap");
var TypeError = require("./TypeError").TypeError;


var Environment = exports.Environment = function() {
    this.classes = [];
    this.errors = [];
};

Environment.prototype.isPrimitiveType = function(aType) {
    return (aType === "int" || aType === "boolean");
};

Environment.prototype.addClass = function(aClass) {
    this.classes.push(aClass);
};

Environment.prototype.getClass = function(aClassName) {
    return this.classes.getByKey(aClassName);
};

Environment.prototype.hasClass = function(aClassName) {
    return this.classes.containsKey(aClassName);
};

Environment.prototype.hasMultipleOfClass = function(aClassName) {
    var count = 0;
    
    for(var i = this.classes.length-1; i >= 0; i--)
        if(this.classes[i].getKey() === aClassName)
            count++;
            
    return (count > 1);
};

Environment.prototype.isClassInScopeForClass = function(classToFind, classToBaseSearchAgainst) {
    var maxSearchIndex = this.classes.indexOfByKey(classToBaseSearchAgainst);
    
    for(var i = 0; i < maxSearchIndex; i++) // go up because we need it to be _before_ base search class
        if(this.classes[i].getKey() === classToFind)
            return true;
            
    return false;
};

Environment.prototype.addError = function(message) {
    this.errors.push(message);
};

Environment.prototype.addMultipleClassDeclarationError = function(node) {
    var message = "Multiple declarations found for class " + node.getClassName();

    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addInvalidSuperclassError = function(node) {
    var message = "Cannot extend the unknown superclass " + node.getSuperClassName();
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addInvalidParameterTypeError = function(node) {
    var message = ["The parameter", node.getParameterName(), "is initialized with undefined type", node.getType()].join(" ");
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addParameterRedeclarationError = function(paramName, theClass, lineno) {
    var message = ["The parameter", paramName, "is declared more than once in", theClass].join(" ");
    
    this.addError(new TypeError(message, lineno));
}

Environment.prototype.addFieldShadowingError = function(node, superclass) {
    var message = ["A field named", node.getFieldName(), "has already been defined in the superclass", superclass].join(" ");
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addFieldRedeclarationError = function(node, theClass) {
    var message = "A field named " + node.getFieldName() + " is defined more than once in " + theClass;
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addInvalidFieldTypeError = function(node) {
    var message = ["A field named", node.getFieldName(), "is initialized with an uninitialized type", node.getType()].join(" ");
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addMethodRedeclarationError = function(node, theClass) {
    var message = ["A method named", node.getMethodName(), "has already been defined in the class", theClass].join(" ");
    
    this.addError(new TypeError(message, node.getLineNumber()));
};

Environment.prototype.addMethodOverrideError = function(overrideMethod, subclass, originalMethod, superclass, lineno) {
    var message = ["The method", overrideMethod.toString(), "in", subclass, "attempts to override the method", originalMethod.toString(), "in", superclass].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.toString = function() {
    return "ENV\n\nClasses\n" + 
                this.classes.map(function(aClass) {
                    return aClass.toString();
                }).join("\n") +     
            "\nErrors\n" + 
                this.errors.join("\n");
};

Environment.prototype.walkClassHierarchy = function(startingClass, fn) {
    this._walkClassHierarchyHelper(fn, startingClass);
};

Environment.prototype._walkClassHierarchyHelper = function(fn, current) {
    fn(current);
    
    if (current.superclass && this.getClass(current.superclass)) {
        this._walkClassHierarchyHelper(fn, this.getClass(current.superclass));
    }
};
