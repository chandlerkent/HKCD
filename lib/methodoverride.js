exports.process = function(ast) {
    ast.walk(checkMethodOverridding);
    return ast;
};

var checkMethodOverridding = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        if (!env.hasClass(theClass)) {
            env.addClass(theClass, node.getSuperClassName());
        }

        node.children.forEach(function(child) {
            if (child.isMethodDeclaration()) {
                if (env.superHasMethod(theClass, child.getMethodName())) {
                    
                    if(env.supersMethodType(theClass, child.getMethodName()) && 
                            env.supersMethodType(theClass, child.getMethodName()) != child.getReturnType()) {
                        throw new Error("The method "+child.getMethodName()+" attempts to change the type from " +
                            node.getSuperClassName() + ":" + child.getMethodName() + ":" +
                            env.supersMethodType(theClass, child.getMethodName()) + 
                            " to " + 
                            node.getClassName() + ":" + child.getMethodName() + ":" +
                            child.getReturnType());
                    }
                }
                
                env.addMethodToClass(theClass, child.getMethodName(), child.getReturnType());
            }
        });
    }
};