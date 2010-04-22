exports.process = function(ast, env) {
    env = ast.walk(checkParameterTypes, env);
    
    return {"ast": ast, "env": env};
};

var checkParameterTypes = function(node, env) {
    if(node.isParameterDeclaration()) {
        if(isInitializedWithUndefinedType(node, env)) {
            env.addError(["The parameter", node.getParameterName(), "is initialized with undefined type", 
                node.getType(), "on line number", node.getLineNumber() + "."].join(" "));
        }
    }
};

function isInitializedWithUndefinedType(node, env) {
    return !env.isPrimitive(node.getType()) && !env.isClassInScopeForClass(node.getType(), env.currentClass);
}