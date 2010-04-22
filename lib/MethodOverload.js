exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverloading, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverloading = function(node, env) {
    if (node.isMethodDeclaration()) {
        if (env.currentClass.hasMultipleOfMethod(node.getMethodName())) {
            env.addError(["A method named", node.getMethodName(), "has already been defined in the class", 
                env.currentClass.getKey(), "on line number", node.getLineNumber() + "."].join(" "));
        }
    }
};