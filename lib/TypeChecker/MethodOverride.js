exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverridding, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverridding = function(node, env) {
    if(node.isMethodDeclaration()) {
        env.walkClassHierarchy(env.currentClass, function(aClass){
           if(aClass.hasMethod(node.getMethodName())) {
               if(!aClass.getMethod(node.getMethodName()).equals(env.currentClass.getMethod(node.getMethodName()))) {
                   env.addMethodOverrideError(
                                              env.currentClass.getMethod(node.getMethodName()),
                                              env.currentClass.getKey(),
                                              aClass.getMethod(node.getMethodName()),
                                              aClass.getKey(),
                                              node.getLineNumber()
                                             );
               }
           } 
        });
    }
};