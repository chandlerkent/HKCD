exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);

    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isFieldDeclaration()) {
        if (env.currentClass.hasMultipleOfField(node.getFieldName())) {
            env.addError("A field named " + node.getFieldName() + " is defined more than once in " + env.currentClass.getKey() + ".");
        }

        if (!env.isPrimitiveType(node.getType()) && !env.hasClass(node.getType())) {
            env.addError(["A field named", node.getFieldName(), "is initialized with an uninitialized type", node.getType()].join(" ") + ".");
        }
    }
};