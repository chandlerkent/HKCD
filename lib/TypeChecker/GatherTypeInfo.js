var ClassMap = require("../Environment").ClassMap;
var MethodMap = require("../Environment").MethodMap;
var VariableMap = require("../Environment").VariableMap;
var ScopeMap = require("../Environment").ScopeMap;
var ASTNode = require("../ASTNode").ASTNode;

exports.process = function(ast, env) {
    walkAndProcessAST(ast, env);
    
    return {"ast": ast, "env": env};
};

var walkAndProcessAST = function(node, env) {
    node.setScope(env.getCurrentScope().copy());

    if (node.isClassDeclaration()) {
        if (env.classHasSuperClass(node.getSuperClassName(), node.getClassName())) {
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
        env.pushNewScope();
    }
    
    if (node.isParameterDeclaration()) {
        var param = new VariableMap(node.getParameterName(), node.getType());
        env.getCurrentMethod().addParameter(param);
        env.getCurrentScope().addVariable(param);
    }

    if (node.isBlock()) {
        env.duplicateScope();
    }
    
    if (node.isInitialAssignment()) {
        env.getCurrentScope().addVariable(new VariableMap(node.getVariableName(), node.getType()));
    }

    node.children.forEach(function(child) {
        if (child instanceof ASTNode) {
            walkAndProcessAST(child, env);
        }
    });

    if (node.isClassDeclaration()) {
        env.exitClassScope();
    }

    if (node.isMethodDeclaration()) {
        env.exitMethodScope();
        env.popScope();
    }

    if (node.isBlock()) {
        env.popScope();
    }
};