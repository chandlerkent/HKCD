exports.process = function(ast) {
    var env = ast.walk(gatherTypeInformation);
    
    return {"ast": ast, "env": env};
};

var gatherTypeInformation = function(node, env) {
    if (node.isClassDeclaration()) {
        if (env.hasClass()) {
            env.errors.push("A class named " + node.getClassName() + " has already been defined.");
        } else {
            if (node.hasSuperClass() && !env.hasClass(node.getSuperClassName())) {
                env.errors.push("Cannot extend an undefined class " + node.getSuperClassName());
            } else {
                env.addClass(node.getClassName(), node.getSuperClassName());
                env.enterClassDeclaration(node.getClassName());
            }            
        }
    }
    
    if (node.isFieldDeclaration()) {
        env.addFieldToClass(env.currentClass, node.getFieldName(), node.getType());
    }
    
    if (node.isMethodDeclaration()) {
        env.addMethodToClass(env.currentClass, node.getMethodName(), createMethodType(node));
    }
};

var createMethodType = function(methodDeclNode) {
    var methodType = {};
    
    methodType.returnType = methodDeclNode.getReturnType();
    methodType.parameters = [];
    
    methodDeclNode.getParameters().forEach(function(paramNode) {
        var paramType = {};
        paramType.name = paramNode.getParameterName();
        paramType.type = paramNode.getType();
        methodType.parameters.push(paramType);
    });
};