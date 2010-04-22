exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);

    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        
        node.children.forEach(function(child) {
            if (child.isFieldDeclaration()) {
                if (env.classHasField(theClass, child.getFieldName())) {
                    env.addError("A field named " + child.getFieldName() + " has already been defined in this class.");
                }
                
                if (child.getType() != "int" && child.getType() != "boolean" && !env.hasClass(child.getType())) {
                    env.addError("A field named " + child.getFieldName() + 
                        " is initialized with an uninitialized type " + child.getType());
                }
            }
        });
    }
};