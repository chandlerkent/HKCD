var TypeError = require("./TypeError").TypeError;

exports.Add = function(aType, env) {
    var valid = true;
    
    if(!this.children[0].checkType("int", env)) {
        env.addError(new TypeError("The left side of the add expression is not an integer!", this.getLineNumber()));
        valid = false;
    }
        
    if(!this.children[1].checkType("int", env)) {
        env.addError(new TypeError("The right side of the add expression is not an integer!", this.getLineNumber()));
        valid = false;
    }
        
    if(aType !== "int") {
        env.addError(new TypeError("An add expression does not return " + aType, this.getLineNumber()));
        valid = false;
    }
        
    return valid;
};

exports.Integer = function(aType, env) {
    return simpleCheck(aType, "int", "Expected an integer to be " + aType, this.getLineNumber(), env);
};

exports.True = function(aType, env) {
    return simpleCheck(aType, "boolean", "Expected true to be " + aType, this.getLineNumber(), env);
};

exports.False = function(aType, env) {
    return simpleCheck(aType, "boolean", "Expected false to be " + aType, this.getLineNumber(), env);
};

exports.Null = function(aType, env) {
    if(env.isPrimitiveType(aType)) {
        env.addError(new TypeError("Attempting to set null to a primitive type "+aType, this.getLineNumber()));
        return false;
    }
    
    return true;
};

exports.This = function(aType, env) {
    return simpleCheck(aType, env.currentClass.getKey(), "Attempting to return " + 
        env.currentClass.getKey() + " but expecting " + aType, this.getLineNumber(), env);
}

exports.Construct = function(aType, env) {
    return simpleCheck(aType, this.constructor, "Attempting to return " +
        this.constructor + " but expecting " + aType, this.getLineNumber(), env);
}

var simpleCheck = function(aType, expectedType, message, lineNumber, env) {
    if(aType !== expectedType) {
        env.addError(new TypeError(message+".", lineNumber));
        return false;
    }
    
    return true;
};