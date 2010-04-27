exports.process = function(ast, env) {
    env = ast.walk(checkClassDeclarations, env);
    
    return {"ast": ast, "env": env};
};

function checkClassDeclarations(node, env) {
    if (node.isClassDeclaration()) {
        if (env.hasMultipleOfClass(node.getClassName())) {
            env.addMultipleClassDeclarationError(node.getClassName(), node.getLineNumber());
        }
        
        if (node.getSuperClassName() && !env.isClassInScopeForClass(node.getSuperClassName(), node.getClassName())) {
            env.addInvalidSuperclassError(node.getSuperClassName(), node.getLineNumber());
        }
    }
}