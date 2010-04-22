exports.process = function(ast) {
    ast.walk(checkParameterTypes);
    return ast;
};

var checkParameterTypes = function(node, env) {
    if (node.isParameterDeclaration()) {
        if(node.getType() != "int" && node.getType() != "boolean" && !env.hasClass(node.getType())) {
            throw new Error("A parameter named " + node.getParameterName() + 
                " is initialized with an uninitialized type " + node.getType());
        }
    }
};