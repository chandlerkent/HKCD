exports.process = function(ast) {
    ast.walk(checkClassTypes);
    return ast;
};

var checkClassTypes = function(node, typeEnvironment) {
    // potentially throw
}