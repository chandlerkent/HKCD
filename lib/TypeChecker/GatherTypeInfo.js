var ClassMap = require("../Environment").ClassMap;
var MethodMap = require("../Environment").MethodMap;

exports.process = function(ast, env) {
    var newEnv = ast.walk(gatherTypeInformation, env);
    
    return {"ast": ast, "env": newEnv};
};

var gatherTypeInformation = function(node, env) {
    if (node.isClassDeclaration()) {
        if(env.classHasSuperClass(node.getSuperClassName(), node.getClassName())) {
            env.addCycleError(node.getLineNumber());
            env.addClass(new ClassMap(node.getClassName(), null));
        } else {
            env.addClass(new ClassMap(node.getClassName(), node.getSuperClassName()));
        }
        
        env.enterClassScope(node.getClassName());
    }
    
    if (node.isFieldDeclaration()) {
        env.getCurrentClass().addField(node.getFieldName(), node.getType());
    }
    
    if (node.isMethodDeclaration()) {
        env.getCurrentClass().addMethod(new MethodMap(node.getMethodName(), node.getReturnType()));
        env.enterMethodScope(node.getMethodName());
    }
    
    if (node.isParameterDeclaration()) {
        env.getCurrentMethod().addParameter(node.getParameterName(), node.getType());
    }
};