exports.process = function(ast, env) {
    env = ast.walk(checkMethodOverridding, env);
    
    return {"ast": ast, "env": env};
};

var checkMethodOverridding = function(node, env) {
    if(node.isMethodDeclaration()) {
        env.walkClassHierarchy(env.currentClass, function(aClass){
            if(aClass.hasMethod(node.getMethodName())) {
                if(aClass.getMethod(node.getMethodName()).getReturnType() != node.getReturnType()) {
                    env.addError("The method "+node.getMethodName()+" attempts to change the return type from " +
                        aClass.getKey() + "->" + node.getMethodName() + "->" +
                        aClass.getMethod(node.getMethodName()).getReturnType() + 
                        " to " + 
                        env.currentClass.getKey() + "->" + node.getMethodName() + "->" +
                        node.getReturnType());
                }
            }
        });
        
        env.walkClassHierarchy(env.currentClass, function(aClass){
           if(aClass.hasMethod(node.getMethodName())) {
               if(!aClass.getMethod(node.getMethodName()).equals(env.currentClass.getMethod(node.getMethodName()))) {
                   env.addError("The method "+node.getMethodName()+" attempts to change the parameter types");
               }
           } 
        });
    }
};

var areArraysEqual = function(array1, array2) {
    if(array1 === array2)
        return true;
        
    if(!array1 || !array2)
        return false;
    
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