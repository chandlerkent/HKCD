exports.process = function(ast, env) {
    env = ast.walk(checkParameterTypes, env);
    
    return {"ast": ast, "env": env};
};

var checkParameterTypes = function(node, env) {
    if (node.isMethodDeclaration()) {
        node.getParameters().forEach(function(parameter){
            if(!env.isPrimitiveType(parameter.getType()) && !env.hasClass(parameter.getType())) {
                env.addError("A parameter named " + parameter.getParameterName() + 
                    " is initialized with an uninitialized type " + parameter.getType());
            } 
        });
    }
};