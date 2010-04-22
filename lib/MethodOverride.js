exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverridding, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverridding = function(node, env) {
    if(node.isMethodDeclaration()) {
        env.walkClassHierarchy(env.currentClass, function(aClass){
           if(aClass.hasMethod(node.getMethodName())) {
               if(!aClass.getMethod(node.getMethodName()).equals(env.currentClass.getMethod(node.getMethodName()))) {
                   env.addError(["The method", env.currentClass.getMethod(node.getMethodName()), "in",
                        env.currentClass.getKey(), "attempts to override the method", 
                        aClass.getMethod(node.getMethodName()), "in", aClass.getKey()].join(" ") + ".");
               }
           } 
        });
    }
};