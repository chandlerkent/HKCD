exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);
    
    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isFieldDeclaration()) {
        env.walkClassHierarchy(env.currentClass, function(theClass) {
            if ((theClass !== env.currentClass) && (theClass.hasField(node.getFieldName()))) {
                env.addError(["A field named", node.getFieldName(), 
                    "has already been defined in the superclass", theClass.getKey(), "on line number", 
                    node.getLineNumber() + "."].join(" "));
            }
        });
    }
};