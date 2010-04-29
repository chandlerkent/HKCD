exports.Add = function(env) {
    return "int";
};

exports.Subtract = function(env) {
    return "int";
};

exports.Multiply = function(env) {
    return "int";
};

exports.Divide = function(env) {
    return "int";
};

exports.Integer = function(env) {
    return "int";
};

exports.True = function(env) {
    return "boolean";
};

exports.False = function(env) {
    return "boolean";
};

exports.Null = function(env) {
    return "void";
};

exports.This = function(env) {
    return env.currentClass.getKey();
};

exports.ID = function(env) {    
    if (!env.getCurrentScope().hasVariable(this.getValue()))
        return null;

    return env.getCurrentScope().getVariable(this.getValue()).getType();
};

exports.Construct = function(env) {
    return this.constructor;
};

exports.Call = function(env) {
    return env.getClass(this.children[0].getExpressionType()).getMethod(this.methodCallName).getReturnType();
};

exports.Negate = function(env) {
    return "int";
};

exports.Not = function(env) {
    return "boolean";
};

exports.Or = function(env) {
    return "boolean";
};

exports.And = function(env) {
    return "boolean";
};

exports.NotEqual = function(env) {
    return "boolean";
};

exports.Equal = function(env) {
    return "boolean";
};

exports.GreaterThan = function(env) {
    return "boolean";
};

exports.GreaterThanEqual = function(env) {
    return "boolean";
};

exports.LessThanEqual = function(env) {
    return "boolean";
};

exports.LessThan = function(env) {
    return "boolean";
};