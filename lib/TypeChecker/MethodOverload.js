exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverloading, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverloading = function(node, env) {
    if (node.isMethodDeclaration()) {
        if (env.currentClass.hasMultipleOfMethod(node.getMethodName())) {
            env.addMethodRedeclarationError(node.getMethodName(), env.currentClass.getKey(), node.getLineNumber());
        }
    }
};