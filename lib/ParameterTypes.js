exports.process = function(ast, env) {
    env = ast.walk(checkParameterTypes, env);
    
    return {"ast": ast, "env": env};
};

var checkParameterTypes = function(node, env) {
    if(node.isParameterDeclaration()) {
        if(isInitializedWithUndefinedType(node, env)) {
            env.addInvalidParameterTypeError(node);
        }
    }
};

function isInitializedWithUndefinedType(node, env) {
    return !env.isPrimitiveType(node.getType()) && !env.isClassInScopeForClass(node.getType(), env.currentClass);
}