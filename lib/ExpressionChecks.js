var TypeError = require("./TypeError").TypeError;

exports.Add = function(aType, env) {
    binaryOperatorCheck(aType, "add", this.children[0], this.children[1], this.getLineNumber(), env);
};

exports.Subtract = function(aType, env) {
    binaryOperatorCheck(aType, "subtract", this.children[0], this.children[1], this.getLineNumber(), env);
};

exports.Multiply = function(aType, env) {
    binaryOperatorCheck(aType, "multiply", this.children[0], this.children[1], this.getLineNumber(), env);
};

exports.Divide = function(aType, env) {
    binaryOperatorCheck(aType, "divide", this.children[0], this.children[1], this.getLineNumber(), env);    
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
};

exports.Construct = function(aType, env) {
    return simpleCheck(aType, this.constructor, "Attempting to return " +
        this.constructor + " but expecting " + aType, this.getLineNumber(), env);
};

exports.Negate = function(aType, env) {
    if(!this.children[0].checkType("int", env)) {
        env.addError(new TypeError("Trying to negate a non-integer!", this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "int", "Expecting negate to return a " + aType, this.getLineNumber(), env);
};

exports.Not = function(aType, env) {
    if(!this.children[0].checkType("boolean", env)) {
        env.addError(new TypeError("Trying to not a non-boolean!", this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "boolean", "Expecting not to return a " + aType, this.getLineNumber(), env);
};

exports.Or = function(aType, env) {
    return binaryBooleanOperatorCheck(aType, "or", this.children[0], this.children[1], this.getLineNumber(), env);
}

var simpleCheck = function(aType, expectedType, message, lineNumber, env) {
    if(aType !== expectedType) {
        env.addError(new TypeError(message+".", lineNumber));
        return false;
    }
    
    return true;
};

var binaryOperatorCheck = function(aType, operator, lhs, rhs, lineno, env) {
    var valid = true;
    
    if(!lhs.checkType("int", env)) {
        env.addError(new TypeError("The left side of the " + operator + " expression is not an integer!", lineno));
        valid = false;
    }
        
    if(!rhs.checkType("int", env)) {
        env.addError(new TypeError("The right side of the " + operator + " expression is not an integer!", lineno));
        valid = false;
    }
        
    if(aType !== "int") {
        env.addError(new TypeError("A(n) " + operator + " expression does not return " + aType, lineno));
        valid = false;
    }
        
    return valid;
};

var binaryBooleanOperatorCheck = function(aType, operator, lhs, rhs, lineno, env) {
    var valid = true;

    if(!lhs.checkType("boolean", env)) {
        env.addError(new TypeError("The left side of the " + operator + " expression is not a boolean!", lineno));
        valid = false;
    }

    if(!rhs.checkType("boolean", env)) {
        env.addError(new TypeError("The right side of the " + operator + " expression is not a boolean!", lineno));
        valid = false;
    }

    if(aType !== "boolean") {
        env.addError(new TypeError("A(n) " + operator + " expression does not return " + aType, lineno));
        valid = false;
    }

    return valid;
};