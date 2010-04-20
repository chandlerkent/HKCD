exports.process = function(ast) {
    ast.walk(checkClassTypes);

    return ast;
};

var checkClassTypes = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        if (env.hasClass(theClass)) {
            throw new Error("A class named " + theClass + " already exists.");
        }
        
        env.addClass(theClass);
        
        if ((!!node.extension) && (!env.hasClass(node.extension))) {
            throw new Error("No class named " + node.extension + " to extend.");
        }
    }
};