exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);
    
    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        
        node.children.forEach(function(child) {
            if (child.isFieldDeclaration()) {
                if (env.superClassHasField(theClass, child.getFieldName())) {
                    env.addError("A field named " + child.getFieldName() + 
                        " has already been defined in the superclass " + 
                            env.superClassThatHasField(theClass, child.getFieldName()) + ".");
                }
            }
        });
    }
};