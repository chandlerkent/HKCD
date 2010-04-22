exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverridding, env);
    
    return {"ast": ast, "env": env};
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
                    if(env.supersMethodType(theClass, child.getMethodName()) != child.getReturnType()) {
                        throw new Error("The method "+child.getMethodName()+" attempts to change the type from " +
                            node.getSuperClassName() + "->" + child.getMethodName() + "->" +
                            env.supersMethodType(theClass, child.getMethodName()) + 
                            " to " + 
                            node.getClassName() + "->" + child.getMethodName() + "->" +
                            child.getReturnType());
                    }

                    if(!areArraysEqual(env.supersMethodParameterTypes(theClass, child.getMethodName()), 
                            child.getParameterTypesForMethod())) {
                        throw new Error("The method "+child.getMethodName()+" attempts to change the parameters from " +
                            node.getSuperClassName() + "->" + child.getMethodName() + "->" +
                            env.supersMethodParameterTypes(theClass, child.getMethodName()) +
                            " to " +
                            node.getClassName() + "->" + child.getMethodName() + "->" +
                            child.getParameterTypesForMethod());
                    }
                }
                
                env.addMethodToClass(theClass, child.getMethodName(), child.getParameterTypesForMethod(), 
                    child.getReturnType());
            }
        });
    }
};

var areArraysEqual = function(array1, array2) {
    if(array1.length != array2.length)
        return false;
        
    var i = array1.length-1;
    while(i >= 0) {
        if(array1[i] != array2[i])
            return false;
        i--;
    }
    
    return true;
}