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

Environment.prototype.addMultipleClassDeclarationError = function(className, lineno) {
    var message = "Multiple declarations found for class " + className;

    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addInvalidSuperclassError = function(className, lineno) {
    var message = "Cannot extend the unknown superclass " + className;
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addInvalidParameterTypeError = function(paramName, type, lineno) {
    var message = ["The parameter", paramName, "is initialized with undefined type", type].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addParameterRedeclarationError = function(paramName, theClass, lineno) {
    var message = ["The parameter", paramName, "is declared more than once in", theClass].join(" ");
    
    this.addError(new TypeError(message, lineno));
}

Environment.prototype.addFieldShadowingError = function(fieldName, superclass, lineno) {
    var message = ["A field named", fieldName, "has already been defined in the superclass", superclass].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addFieldRedeclarationError = function(fieldName, className, lineno) {
    var message = "A field named " + fieldName + " is defined more than once in " + className;
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addInvalidFieldTypeError = function(fieldName, type, lineno) {
    var message = ["A field named", fieldName, "is initialized with an uninitialized type", type].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addMethodRedeclarationError = function(methodName, theClass, lineno) {
    var message = ["A method named", methodName, "has already been defined in the class", theClass].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addMethodOverrideError = function(overrideMethod, subclass, originalMethod, superclass, lineno) {
    var message = ["The method", overrideMethod.toString(), "in", subclass, "attempts to override the method", originalMethod.toString(), "in", superclass].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addInvalidMethodReturnTypeError = function(returnType, methodName, lineno) {
    var message = "The return type " + returnType + " of method named " + methodName + " is undefined."
    
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
