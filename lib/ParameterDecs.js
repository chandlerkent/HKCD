exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverloading, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverloading = function(node, env) {
    if(node.isParameterDeclaration()) {
        if(parameterIsDeclaredMoreThanOnce(node, env)) {
            env.addParameterRedeclarationError(node.getParamaterName(), env.currentClass.getKey(), node.getLineNumber());
        }
    }
};

function parameterIsDeclaredMoreThanOnce(node, env) {
    return env.currentMethod.hasMultipleOfParameter(node.getParameterName());
}