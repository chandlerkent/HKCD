exports.process = function(ast) {
    ast.walk(checkClassTypes);
    return ast;
};

var checkClassTypes = function(node, env) {
    var classDecls = ["MainClassDecl", "ClassDecl"];
    if (classDecls.indexOf(node.name) >= 0) {
        if (env["classes"].indexOf(node.value) >= 0) {
            throw("A class named " + node.value + " already exists.");
        }
        env["classes"].push(node.value);
    }
};