exports.process = function(ast, env) {
    env = ast.walk(checkClassDeclarations, env);
    
    return {"ast": ast, "env": env};
};

function checkClassDeclarations(node, env) {
    if (node.isClassDeclaration()) {
        if (env.hasMultipleOfClass(node.getClassName())) {
            env.addError("Multiple declarations found for class " + node.getClassName());
        }
        
        if (!env.isClassInScopeForClass(node.getSuperClassName(), node.getClassName())) {
            env.addError("Cannot extend the unknown superclass " + node.getSuperClassName());
        }
    }
}