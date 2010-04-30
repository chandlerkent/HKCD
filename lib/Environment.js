var ClassMap = exports.ClassMap = require("./Environment/ClassMap").ClassMap;
var MethodMap = exports.MethodMap = require("./Environment/MethodMap").MethodMap;
var ScopeMap = exports.ScopeMap = require("./Environment/ScopeMap").ScopeMap;
var VariableMap = exports.VariableMap = require("./Environment/VariableMap").VariableMap;
var TypeError = exports.TypeError = require("./Environment/TypeError").TypeError;

var Environment = exports.Environment = function() {
    this.classes = [];
    this.errors = [];
    this.scopes = [new ScopeMap()];
    this.currentClass = null;
    this.currentMethod = null;
};

Environment.prototype.enterClassScope = function(className) {
    this.currentClass = this.getClass(className);
};

Environment.prototype.exitClassScope = function() {
    this.currentClass = null;
};

Environment.prototype.getCurrentClass = function() {
    return this.currentClass;
};

Environment.prototype.enterMethodScope = function(methodName) {
    this.currentMethod = this.getCurrentClass().getMethod(methodName);
};

Environment.prototype.exitMethodScope = function() {
    this.currentMethod = null;
};

Environment.prototype.getCurrentMethod = function() {
    return this.currentMethod;
};

Environment.prototype.isPrimitiveType = function(aType) {
    return (aType === "int" || aType === "boolean");
};

Environment.prototype.addClass = function(aClass) {
    this.classes.push(aClass);
};

Environment.prototype.getClass = function(className) {
    return this.classes.getByKey(className);
};

Environment.prototype.hasClass = function(className) {
    return this.classes.containsKey(className);
};

Environment.prototype.hasMultipleOfClass = function(className) {
    return this.classes.hasMultipleByKey(className);
};

Environment.prototype.isClassInScopeForClass = function(classToFind, classToBaseSearchAgainst) {
    var maxSearchIndex = this.classes.indexOfByKey(classToBaseSearchAgainst);
    
    for(var i = 0; i < maxSearchIndex; i++) // go up because we need it to be _before_ base search class
        if(this.classes[i].getKey() === classToFind)
            return true;
            
    return false;
};

Environment.prototype.getCurrentScope = function() {
    return this.scopes[0];
};

Environment.prototype.pushNewScope = function() {
    this.scopes.unshift(new ScopeMap());
    return this.getCurrentScope();
};

Environment.prototype.pushScope = function(scope) {
    this.scopes.unshift(scope);
};

Environment.prototype.duplicateScope = function() {
    this.scopes.unshift(this.getCurrentScope().copy());
    return this.getCurrentScope();
};

Environment.prototype.popScope = function() {
    this.scopes.shift();
};

Environment.prototype.isVariableInCurrentScope = function(varName) {
    if (this.getCurrentScope().hasVariable(varName))
        return true;
    
    var inScope = false;
    
    this.walkClassHierarchy(this.getCurrentClass(), function(aClass) {
        if (aClass.hasField(varName))
            inScope = true;
    });
    
    return inScope;
};

Environment.prototype.canCreateNewVariableInCurrentScope = function(varName) {
    return !this.getCurrentScope().hasVariable(varName);
};

Environment.prototype.getVariableInCurrentScope = function(varName) {
    if (this.getCurrentScope().hasVariable(varName))
        return this.getCurrentScope().getVariable(varName);
    
    var variable = null;
    this.walkClassHierarchy(this.getCurrentClass(), function(aClass) {
        if (!variable && aClass.hasField(varName))
            variable = aClass.getField(varName);
    });
    
    return variable;
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

Environment.prototype.addCycleError = function(lineno) {
    this.addError(new TypeError("There was a cycle detected", lineno));
};

Environment.prototype.addReturnTypeError = function(methodReturnType, expressionReturnType, methodLineNo) {
    var message = ["The return type", methodReturnType, "was expected but got", expressionReturnType].join(" ") + ".";
    
    this.addError(new TypeError(message, methodLineNo));
};

Environment.prototype.addVariableRedeclaredInScopeError = function(varName, lineno) {
    var message = ["The variable", varName, "is already declared in the current scope."].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addVariableOutOfScopeError = function(varName, lineno) {
    var message = ["The variable", varName, "is not in the current scope."].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addVariableDeclaredWithMismatchedTypesError = function(varName, lineno) {
    var message = ["The variable", varName, "was assigned with mismatched types."].join(" ");
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addVariableRedeclaredWithMismatchedTypesError = function(varName, type, lineno) {
    var message = ["The type of the right hand side expression of the assignment to variable", varName, "does not match the expected type", type].join(" ") + ".";
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addPrintLineError = function(lineno) {
    var message = "System.out.println only takes an argument of type int.";
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.addBadConditionError = function(nodeType, lineno) {
    var message = "The condition in a(n) " + nodeType + " statement must be of type boolean.";
    
    this.addError(new TypeError(message, lineno));
};

Environment.prototype.classHasSuperClass = function(className, superClassName) {
    if(!this.hasClass(className))
        return false;
    
    if(!this.getClass(className).superclass)
        return false;
        
    if(this.getClass(className).superclass == superClassName)
        return true;
        
    return this.classHasSuperClass(this.getClass(this.getClass(className).superclass), superClassName);
};

Environment.prototype.classHasMethod = function(aClass, methodName) {
    if(!this.hasClass(aClass))
        return false;
    
    if(this.getClass(aClass).hasMethod(methodName))
        return true;

    if(!this.getClass(aClass).getSuperclass())
        return false;
        
    return this.classHasMethod(this.getClass(aClass).getSuperclass(), methodName);
};

Environment.prototype.getMethodForClass = function(aClass, methodName) {
    if(!this.hasClass(aClass))
        return null;
    
    if(this.getClass(aClass).hasMethod(methodName)) {
        return this.getClass(aClass).getMethod(methodName);
    }

    if(!this.getClass(aClass).getSuperclass()) {
        return null;
    }
        
    return this.getMethodForClass(this.getClass(aClass).getSuperclass(), methodName);
};

Environment.prototype.returnTypeOfMethodForClass = function(aClass, methodName) {
    if(this.getClass(aClass).hasMethod(methodName))
        return this.getClass(aClass).getMethod(methodName).getReturnType();
        
    if(!this.getClass(aClass).getSuperclass())
        throw new Error("ERR");
        
    return this.returnTypeOfMethodForClass(this.getClass(aClass).getSuperclass(), methodName);
};

Environment.prototype.toString = function() {
    var result = "";
    
    result += "\nClasses:\n";
    result += this.classes.map(function(aClass) {
        return aClass.toString();
    }).join("\n");
    
    result += "\nScopes:\n";
    result += this.scopes.map(function(scope) {
        return scope.toString();
    }).join("\n");
    
    result += "\nErrors:\n";
    result += this.errors.map(function(error) {
        return error.toString();
    }).join("\n");
    
    return result;
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

require("./Environment/ArrayMap");