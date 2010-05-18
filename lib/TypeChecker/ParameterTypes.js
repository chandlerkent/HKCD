exports.process = function(ast, env) {
    env = ast.walk(checkParameterTypes, env);
    
    return {"ast": ast, "env": env};
};

var checkParameterTypes = function(node, env) {
    if(node.isParameterDeclaration()) {
        if(isInitializedWithUndefinedType(node, env)) {
            env.addInvalidParameterTypeError(node.getParameterName(), node.getType(), node.getLineNumber());
        }
    }
};

function isInitializedWithUndefinedType(node, env) {
    return !env.isPrimitiveType(node.getType()) && !env.isFunctionType(node.getType()) && !env.hasClass(node.getType());
}