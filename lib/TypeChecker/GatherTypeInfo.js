var ClassMap = require("../Environment").ClassMap;
var MethodMap = require("../Environment").MethodMap;

var currentClass, currentMethod;

exports.process = function(ast, env) {
    currentClass = currentMethod = null;
    
    var newEnv = ast.walk(gatherTypeInformation, env);
    
    return {"ast": ast, "env": newEnv};
};

var gatherTypeInformation = function(node, env) {
    if (node.isClassDeclaration()) {
        if(env.classHasSuperClass(node.getSuperClassName(), node.getClassName())) {
            env.addCycleError(node.getLineNumber());
            env.addClass(new ClassMap(node.getClassName(), null));
            currentClass = node.getClassName();
        } else {
            env.addClass(new ClassMap(node.getClassName(), node.getSuperClassName()));
            currentClass = node.getClassName();
        }
    }
    
    if (node.isFieldDeclaration()) {
        env.getClass(currentClass).addField(node.getFieldName(), node.getType());
    }
    
    if (node.isMethodDeclaration()) {
        env.getClass(currentClass).addMethod(new MethodMap(node.getMethodName(), node.getReturnType()));
        currentMethod = node.getMethodName();
    }
    
    if (node.isParameterDeclaration()) {
        env.getClass(currentClass).getMethod(currentMethod).addParameter(node.getParameterName(), node.getType());
    }
};