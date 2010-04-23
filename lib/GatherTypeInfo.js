var ClassMap = require("./ClassMap").ClassMap;
var MethodMap = require("./MethodMap").MethodMap;

var currentClass = null;
var currentMethod = null;

exports.process = function(ast) {
    currentClass = null;
    currentMethod = null;
    
    var env = ast.walk(gatherTypeInformation);
    
    return {"ast": ast, "env": env};
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