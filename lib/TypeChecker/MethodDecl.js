exports.process = function(ast, env) {
    env = ast.walk(checkMethodDeclarations, env);
    
    return {"ast": ast, "env": env};
};

function checkMethodDeclarations(node, env) {
    if (node.isMethodDeclaration()) {
        if (!env.isPrimitiveType(node.getReturnType()) && !env.hasClass(node.getReturnType())) {
            env.addInvalidMethodReturnTypeError(node.getReturnType(), node.getMethodName(), node.getLineNumber());
        }
    }
}