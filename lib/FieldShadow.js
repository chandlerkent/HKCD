exports.process = function(ast, env) {
    env = ast.walk(checkFields, env);
    
    return {"ast": ast, "env": env};
};

var checkFields = function(node, env) {
    if (node.isFieldDeclaration()) {
        var foundShadowedField = false;
        var shadowedClassName = "";
        
        env.walkClassHierarchy(env.currentClass.getKey(), function(theClass) {
            if ((theClass !== env.currentClass) && (theClass.hasField(node.getFieldName()))) {
                foundShadowedField = true;
                shadowedClassName = theClass.getKey();
            }
        });
        
        if (foundShadowedField) {
            env.addError(["A field named", node.getFieldName(), 
                "has already been defined in the superclass", shadowedClassName + "."].join(" "));
        }
    }
};