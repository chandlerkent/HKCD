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
        if (env.isFunctionType(node.getType()) && node.getType() !== node.getValue().getExpressionType(env)) {
            env.addError(new TypeError("Variable declared as type " + node.getType() + " but is really of type " + node.getValue().getExpressionType(env) + ".", node.getLineNumber()));
            return;
        }
        
        if (env.isFunctionType(node.getValue().getExpressionType(env))) {            
            var closureNode = node.getValue();
            var closure = new MethodMap(node.getVariableName(), null);
            var variable = new VariableMap(node.getVariableName(), "TEST");
            variable.setValue(closure);
            env.getCurrentScope().addVariable(variable);
            
            env.duplicateScope();
            closureNode.children.forEach(function(child) {
                if (child.isParameterDeclaration()) {
                    var param = new VariableMap(child.getParameterName(), child.getType());
                    env.getCurrentScope().addVariable(param);
                    closure.addParameter(param);
                }
            });
        } else {
            env.getCurrentScope().addVariable(new VariableMap(node.getVariableName(), node.getType()));
        }
    }

    node.children.forEach(function(child) {
        if (child instanceof ASTNode) {
            walkAndProcessAST(child, env);
        }
    });
    
    if (node.isInitialAssignment() || node.isAssignment() || node.isPrintLine()) {
        if (node.getValue().name == "ClosureExpression") {
            node.getValue().children.filter(function(child) { return !child.isParameterDeclaration(); })
                .forEach(function (child) {
                    walkAndProcessAST(child, env);
                });
        }
        
        if (node.getValue().isCallExpression()) {
            node.getValue().children[1].forEach(function (child) {
                if(child.name === "ClosureExpression") {
                    var closureNode = child;

                    env.duplicateScope();
                    closureNode.children.forEach(function(child) {
                        if (child.isParameterDeclaration()) {
                            var param = new VariableMap(child.getParameterName(), child.getType());
                            env.getCurrentScope().addVariable(param);
                        }
                    });
                    
                    
                    var nonParams = child.children.filter(function(child) { return !child.isParameterDeclaration(); })
                    nonParams
                        .forEach(function (child) {
                            print(child);
                            walkAndProcessAST(child, env);
                        });
                        
                    env.popScope();
                }
            })
        }
    }

    if (node.isClassDeclaration()) {
        env.exitClassScope();
    }

    if (node.isMethodDeclaration()) {
        env.exitMethodScope();
        env.popScope();
    }
    
    if (node.isInitialAssignment()) {        
        if (env.isFunctionType(node.getValue().getExpressionType(env))) {
            var closure = env.getVariableInCurrentScope(node.getVariableName()).getValue();
            var closureNode = node.getValue();
            closure.setReturnType(closureNode.getReturnExpression().getExpressionType(env));

            env.popScope();
            
            var variable = env.getVariableInCurrentScope(node.getVariableName());
            var interfaceType = env.getInterfaceTypeOfClosure(closure.getParameters().map(function(param) {
                    return param.getType();
                }), closure.getReturnType());
            variable.setType(interfaceType);
        }
    }
    
    if (node.isBlock()) {
        env.popScope();
    }
};