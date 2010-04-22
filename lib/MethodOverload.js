exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverloading, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverloading = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = env.getClass(node.getClassName());
        
        node.children.forEach(function(child) {
            if (child.isMethodDeclaration()) {
                if (theClass.hasMultipleOfMethod(child.getMethodName())) {
                    env.addError(["A method named", child.getMethodName(), "has already been defined in the class", theClass.getKey() + "."].join(" "));
                }
            }
        });
    }
};