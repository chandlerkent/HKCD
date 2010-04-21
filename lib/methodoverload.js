exports.process = function(ast) {
    ast.walk(checkMethodOverloading);
    return ast;
};

var checkMethodOverloading = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        if (!env.hasClass(theClass)) {
            env.addClass(theClass);
        }
        
        node.children.forEach(function(child) {
            if (child.isMethodDeclaration()) {
                if (env.classHasMethod(theClass, child.getMethodName())) {
                    throw new Error("A method named " + child.getMethodName() + " has already been defined in this class.");
                }
                
                env.addMethodToClass(theClass, child.getMethodName(), child.getReturnType());
            }
        });
    }
};