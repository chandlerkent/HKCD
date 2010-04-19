exports.process = function(ast) {
    ast.walk(checkClassTypes);

    return ast;
};

var checkClassTypes = function(node, env) {
    if (node.class_decl) {
        if (env["classes"].indexOf(node.class_decl) >= 0) {
            throw new Error("A class named " + node.class_decl + " already exists.");
        }
        env["classes"].push(node.class_decl);
    }
    
    if (node.extension) {
        if (env["classes"].indexOf(node.extension) < 0) {
            throw new Error("No class named " + node.extension + " to extend.");
        }
    }
};