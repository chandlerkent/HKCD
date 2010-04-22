exports.process = function(ast, env) {
    env = ast.walk(checkParameterTypes, env);
    
    return {"ast": ast, "env": env};
};

var checkParameterTypes = function(node, env) {
    if (node.isParameterDeclaration()) {
        if(node.getType() != "int" && node.getType() != "boolean" && !env.hasClass(node.getType())) {
            throw new Error("A parameter named " + node.getParameterName() + 
                " is initialized with an uninitialized type " + node.getType());
        }
    }
};