exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverloading, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverloading = function(node, env) {
    if(node.isParameterDeclaration()) {
        if(parameterIsDeclaredMoreThanOnce(node, env)) {
            env.addError(["The parameter", node.getParameterName(), "is declared more than once in", 
                env.currentMethod.getKey(), "on line number", node.getLineNumber() + "."].join(" "));
        }
    }
};

function parameterIsDeclaredMoreThanOnce(node, env) {
    return env.currentMethod.hasMultipleOfParameter(node.getParameterName());
}