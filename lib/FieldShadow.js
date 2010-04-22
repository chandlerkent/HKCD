exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);
    
    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isClassDeclaration()) {        
        node.children.forEach(function(child) {
            if (child.isFieldDeclaration()) {
                var foundShadowedField = false;
                var shadowedClassName = "";
                
                env.walkClassHierarchy(node.getClassName(), function(theClass) {
                    if (theClass.hasField(child.getFieldName())) {
                        foundShadowedField = true;
                        shadowedClassName = theClass.getKey();
                    }
                });
                
                if (foundShadowedField) {
                    env.addError(["A field named", child.getFieldName(), "has already been defined in the superclass", shadowedClassName + "."].join(" "));
                }
            }
        });
    }
};