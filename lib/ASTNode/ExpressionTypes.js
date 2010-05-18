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
    if (env.getCurrentMethod().getKey() === "main") {
        return "null";
    }
    
    return env.currentClass.getKey();
};

exports.Return = function(env) {
    return this.expression.getExpressionType(env);
};

exports.ID = function(env) {
    if(!env.getVariableInCurrentScope(this.getValue()))
        return "null";
    
    return env.getVariableInCurrentScope(this.getValue()).getType();
};

exports.Construct = function(env) {
    return this.getClassName();
};

exports.Call = function(env) {
    if(!env.getMethodForClass(this.children[0].getExpressionType(env), this.methodCallName))
        return "null";
    
    return env.getMethodForClass(this.children[0].getExpressionType(env), this.methodCallName).getReturnType();
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

exports.Closure = function(env) {
    return "Function";
};

exports.ClosureCall = function(env) {
    if(!env.getVariableInCurrentScope(this.getClosureName()))
        return "null";
    
    return env.getVariableInCurrentScope(this.getClosureName()).getValue().getReturnType();
};