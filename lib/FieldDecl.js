exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);

    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = env.getClass(node.getClassName());
        
        node.children.forEach(function(child) {
            if (child.isFieldDeclaration()) {
                if (theClass.hasMultipleOfField(child.getFieldName())) {
                    env.addError("A field named " + child.getFieldName() + " is defined more than once in " + node.getClassName() + ".");
                }

                if (!env.isPrimitiveType(child.getType()) && !env.hasClass(child.getType())) {
                    env.addError(["A field named", child.getFieldName(), "is initialized with an uninitialized type", child.getType() + "."].join(" "));
                }
            }
        });
    }
};