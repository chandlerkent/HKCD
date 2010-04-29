var ClassMap = require("../Environment").ClassMap;
var MethodMap = require("../Environment").MethodMap;
var VariableMap = require("../Environment").VariableMap;
var Environment = require("../Environment").Environment;

exports.process = function(ast, env) {
    ast.walk(gatherTypeInformation, env, false);
    
    return {"ast": ast, "env": env};
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
        env.getCurrentClass().addField(new VariableMap(node.getFieldName(), node.getType()));
    }
    
    if (node.isMethodDeclaration()) {
        env.getCurrentClass().addMethod(new MethodMap(node.getMethodName(), node.getReturnType()));
        env.enterMethodScope(node.getMethodName());
    }
    
    if (node.isParameterDeclaration()) {
        env.getCurrentMethod().addParameter(new VariableMap(node.getParameterName(), node.getType()));
    }
};