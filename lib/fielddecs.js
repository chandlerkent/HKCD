exports.process = function(ast) {
    ast.walk(checkFields);

    return ast;
};

var checkFields = function(node, env) {
    if (node.isClassDeclaration()) {
        var theClass = node.getClassName();
        if (!env.hasClass(theClass)) {
            env.addClass(theClass);
        }
        
        node.children.forEach(function(child) {
            if (child.isFieldDeclaration()) {
                if (env.classHasField(theClass, child.getFieldName())) {
                    throw new Error("A field named " + child.getFieldName() + " has already been defined in this class.");
                }
                
                env.addFieldToClass(theClass, child.getFieldName(), child.getType());
            }
        });
    }
};