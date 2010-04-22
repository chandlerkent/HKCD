exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);

    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isFieldDeclaration()) {
        if (env.currentClass.hasMultipleOfField(node.getFieldName())) {
            env.addFieldRedeclarationError(node, env.currentClass.getKey());
        }

        if (!env.isPrimitiveType(node.getType()) && !env.hasClass(node.getType())) {
            env.addInvalidFieldTypeError(node);
        }
    }
};