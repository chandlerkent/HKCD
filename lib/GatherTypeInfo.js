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
    print("In class " + currentClass);
    print("In method " + currentMethod);
    if (node.isClassDeclaration()) {
        env.addClass(new ClassMap(node.getClassName(), node.getSuperClassName()));
        currentClass = node.getClassName();
        print("Changed class " + currentClass);
    }
    
    if (node.isFieldDeclaration()) {
        env.getClass(currentClass).addField(node.getFieldName(), node.getType());
    }
    
    if (node.isMethodDeclaration()) {
        env.getClass(currentClass).addMethod(new MethodMap(node.getMethodName(), node.getReturnType()));
        currentMethod = node.getMethodName();
        print("Changed method " + currentMethod);
    }
    
    if (node.isParameterDeclaration()) {
        env.getClass(currentClass).getMethod(currentMethod).addParameter(node.getParameterName(), node.getType());
    }
};