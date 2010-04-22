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
                
                if (child.getType() != "int" && child.getType() != "boolean" && !env.hasClass(child.getType())) {
                    throw new Error("A field named " + child.getFieldName() + 
                        " is initialized with an uninitialized type " + child.getType());
                }
                
                env.addFieldToClass(theClass, child.getFieldName(), child.getType());
            }
        });
    }
};