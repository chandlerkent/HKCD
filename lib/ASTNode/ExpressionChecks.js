var TypeError = require("../Environment").TypeError;
var VariableMap = require("../Environment").VariableMap;

var EXPECTED_TYPE = "EXPECTED_TYPE";
var ACTUAL_TYPE = "ACTUAL_TYPE";

exports.Add = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of an add operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of an add operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "int",
                                        "errorMessage": "An add expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.Subtract = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a subtract operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a subtract operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "int",
                                        "errorMessage": "A subtract expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.Multiply = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a multiply operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a multiply operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "int",
                                        "errorMessage": "A multiply expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.Divide = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a divide operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a divide operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "int",
                                        "errorMessage": "A divide expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.LessThan = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a less than operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a less than operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "boolean",
                                        "errorMessage": "A less than expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.LessThanEqual = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a less than or equal to operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a less than or equal to operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "boolean",
                                        "errorMessage": "A less than or equal to expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.NotEqual = function(aType, env) {
    if((env.isPrimitiveType(this.children[0].getExpressionType(env)) || 
                env.isPrimitiveType(this.children[1].getExpressionType(env)))
            && this.children[0].getExpressionType(env) != this.children[1].getExpressionType(env)) {
        env.addError(new TypeError("The left hand side's type ("+this.children[0].getExpressionType(env)
            +") does not equal the right hand side's type ("+this.children[1].getExpressionType(env)+").", 
                this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "boolean", "Expected not equal to be " + aType, this.getLineNumber(), env);
};

exports.Equal = function(aType, env) {
    
    if((env.isPrimitiveType(this.children[0].getExpressionType(env)) || 
                env.isPrimitiveType(this.children[1].getExpressionType(env)))
            && this.children[0].getExpressionType(env) != this.children[1].getExpressionType(env)) {
        env.addError(new TypeError("The left hand side's type ("+this.children[0].getExpressionType(env)
            +") does not equal the right hand side's type ("+this.children[1].getExpressionType(env)+").", 
                this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "boolean", "Expected equal to be " + aType, this.getLineNumber(), env);
};

exports.GreaterThanEqual = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a greater than or equal to operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a greater than or equal to operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "boolean",
                                        "errorMessage": "A greater than or equal to expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.GreaterThan = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "int",
                                        "errorMessage": "The left side of a greater than operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "int",
                                        "errorMessage": "The right side of a greater than operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "boolean",
                                        "errorMessage": "A greater than expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.Integer = function(aType, env) {
    return simpleCheck(aType, "int", "Expected an integer to be " + aType, this.getLineNumber(), env);
};

exports.True = function(aType, env) {
    return simpleCheck(aType, "boolean", "Expected true to be " + aType, this.getLineNumber(), env);
};

exports.False = function(aType, env) {
    return simpleCheck(aType, "boolean", "Expected false to be " + aType, this.getLineNumber(), env);
};

exports.Null = function(aType, env) {
    if(env.isPrimitiveType(aType)) {
        env.addError(new TypeError("Attempting to set null to a primitive type "+aType, this.getLineNumber()));
        return false;
    }
    
    return true;
};

exports.This = function(aType, env) {
    if (env.getCurrentMethod().getKey() === "main") {
        env.addError(new TypeError("Cannot access variable this in static methods.", this.getLineNumber()));
        return false;
    }
    
    var match = false;
    env.walkClassHierarchy(env.getCurrentClass(), function(theClass) {
        if (theClass.getKey() === aType) {
            match = true;
        }
    });
    
    if (!match) {
        env.addError(new TypeError("The variable 'this' is not of type " + aType, this.getLineNumber()));
    }
    
    return match;
};

exports.Return = function(aType, env) {
    env.pushScope(this.getScope().copy());
    this.secretReturnType = aType;
    
    if(env.isPrimitiveType(this.expression.getExpressionType(env)))
        return this.expression.checkType(aType, env);
        
    if(env.isFunctionType(this.expression.getExpressionType(env))) {
        env.getCurrentMethod().setReturnType(aType);
        return this.expression.checkType(aType, env);
    }
        
    var match = false;
    
    if(this.expression.getExpressionType(env) != "void" && !env.hasClass(this.expression.getExpressionType(env))) {
        env.addError(new TypeError("Expected the return expression to be undefined type " + aType + ".",
            this.getLineNumber()));
        return false;
    }
    
    if(this.expression.getExpressionType(env) == "void")
        match = true;
    else
        env.walkClassHierarchy(env.getClass(this.expression.getExpressionType(env)), function(theClass) {
            if (aType === theClass.getKey()) {
                match = true;
            }
        });
    
    if (!match) {
        env.addError(new TypeError("Expected the return expression to be " + aType + 
            " but was " + this.expression.getExpressionType(env) + ".", this.getLineNumber()));
    }
    
    return match;
};

exports.Construct = function(aType, env) {
    if (!env.hasClass(this.getClassName())) {
        env.addError(new TypeError("Cannot instantiate the type " + this.getClassName() + " because it was never defined.", this.getLineNumber()));
        return false;
    }
    
    var match = false;
    
    env.walkClassHierarchy(env.getClass(this.getClassName()), function(theClass) {
        if (theClass.getKey() === aType) {
            match = true;
        }
    });
    
    if (!match) {
        env.addError(new TypeError("Attempting to return " + this.getClassName() + " but expecting " + aType + ".", this.getLineNumber()));
    }
    
    return match;
};

exports.Negate = function(aType, env) {
    if(!this.children[0].checkType("int", env)) {
        env.addError(new TypeError("Trying to negate a non-integer!", this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "int", "Expecting negate to return a " + aType, this.getLineNumber(), env);
};

exports.Not = function(aType, env) {
    if(!this.children[0].checkType("boolean", env)) {
        env.addError(new TypeError("Trying to not a non-boolean!", this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "boolean", "Expecting not to return a " + aType, this.getLineNumber(), env);
};

exports.Or = function(aType, env) {
    return binaryOperatorCheck([
                                    {
                                        "node": this.children[0],
                                        "expectedType": "boolean",
                                        "errorMessage": "The left side of an or operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "node": this.children[1],
                                        "expectedType": "boolean",
                                        "errorMessage": "The right side of an or operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                    },
                                    {
                                        "overallType": aType,
                                        "expectedType": "boolean",
                                        "errorMessage": "An or expression does not return type " + ACTUAL_TYPE + "."
                                    }
                                ], this.getLineNumber(), env);
};

exports.And = function(aType, env) {
    return binaryOperatorCheck([
                                {
                                    "node": this.children[0],
                                    "expectedType": "boolean",
                                    "errorMessage": "The left side of an and operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                },
                                {
                                    "node": this.children[1],
                                    "expectedType": "boolean",
                                    "errorMessage": "The right side of an and operation was expected to be of type " + EXPECTED_TYPE + " but was " + ACTUAL_TYPE + "."
                                },
                                {
                                    "overallType": aType,
                                    "expectedType": "boolean",
                                    "errorMessage": "An and expression does not return type " + ACTUAL_TYPE + "."
                                }
                                ], this.getLineNumber(), env);  
};

exports.ID = function(aType, env) {
    if (!env.isVariableInCurrentScope(this.getValue())) {
        env.addError(new TypeError("No variable named " + this.getValue() + " in the current scope.", this.getLineNumber()));
        return false;
    }
    var actualType = this.getExpressionType(env);
    return simpleCheck(aType, actualType, "Expected variable " + this.getValue() + " to be of type " + aType + ", but was of type " + actualType, this.getLineNumber(), env);
};

exports.Call = function(aType, env) {
    var classType = this.children[0].getExpressionType(env);
    
    if (!classType) {
        env.addError(new TypeError("No variable named " + this.children[0].getValue() + " in the current scope.", this.getLineNumber()));
        return false;
    }
    
    var methodCallName = this.getMethodCallName();
    
    if (!env.classHasMethod(classType, methodCallName)) {
        env.addError(new TypeError("The class " + classType + " does not have the method " + methodCallName + ".", this.getLineNumber()));
        return false;
    }
    
    var expectedMethodParams = env.getMethodForClass(classType, methodCallName).getParameters();
    var actualMethodParamExpr = this.children[1];
    
    if (expectedMethodParams.length !== actualMethodParamExpr.length) {
        env.addError(new TypeError("Incorrect number of arguments to method " + methodCallName + ". Expected " + expectedMethodParams.length + " but received " + actualMethodParamExpr.length + ".", this.getLineNumber()));
        return false;
    }
    
    var badParams = false;
    for (var i = 0; i < expectedMethodParams.length; i++) {
        var expectedParam = expectedMethodParams[i];
        var actualExpr = actualMethodParamExpr[i];
        if (!actualExpr.checkType(expectedParam.getType(), env)) {
            env.addError(new TypeError("Argument type " + actualExpr.getExpressionType(env) + " does not match expected type " + expectedParam.getType() + " for method " + methodCallName + ".", this.getLineNumber()));
            badParams = true;
        }
    }
    
    if (badParams)
        return false;

    var actualType = env.returnTypeOfMethodForClass(classType, methodCallName);
    if(!env.isTypeOrSuperType(aType, actualType)) {
        env.addError(new TypeError("The return type of the method " + methodCallName + " was expected to be " 
            + aType + " but is of type " + actualType), this.getLineNumber());
        return false;
    }
    
    return true;
};

exports.Closure = function(aType, env) {
    env.pushScope(this.getReturnExpression().getScope());
    var success = this.getReturnExpression().expression.checkType(this.getReturnExpression().getExpressionType(env), env);
    this.getReturnExpression().secretReturnType = this.getReturnExpression().getExpressionType(env);
    env.popScope();
    
    
    var paramTypes = [];
    this.children.forEach(function(child) {
        if(child.isParameterDeclaration()) {
            paramTypes.push(child.getType());
        }
    });
    
    if (env.getInterfaceTypeOfClosure(paramTypes, this.getReturnExpression().secretReturnType) !== aType &&
            !simpleCheck("Function", aType, "The type of a closure was expected to be " + aType + " but is really a Function", this.getLineNumber(), env)) {
        return false;
    }
    
    return success;
};

exports.ClosureCall = function(aType, env) {
    var closureName = this.getClosureName();
    
    if (!env.getCurrentScope().hasVariable(closureName)) {
        env.addError(new TypeError("The closure " + closureName + " is not in the current scope.", this.getLineNumber()));
        return false;
    }
    
    var closure = env.getVariableInCurrentScope(closureName).getValue();
    
    if(!closure) {
        closure = new (require("../Environment").MethodMap)(closureName, aType);
        var paramTypesForClosure = [];
        
        this.children[1].forEach(function(child) {
            closure.addParameter(new (require("../Environment").VariableMap)(child.getParameterName(), child.getExpressionType(env)));
            paramTypesForClosure.push(child.getExpressionType(env));
        });
        
        env.getVariableInCurrentScope(closureName).setValue(closure);
        
        if(env.getCurrentMethod().getParameter(closureName)) {
            env.getCurrentMethod().getParameter(closureName).setType(env.getInterfaceTypeOfClosure(paramTypesForClosure, aType));
        }
        
        this.secretClosure = closure;
    }

    var expectedMethodParams = closure.getParameters();
    var actualMethodParamExpr = this.children[1];
    
    if (expectedMethodParams.length !== actualMethodParamExpr.length) {
        env.addError(new TypeError("Incorrect number of arguments to closure " + closureName + ". Expected " + expectedMethodParams.length + " but received " + actualMethodParamExpr.length + ".", this.getLineNumber()));
        return false;
    }
    
    var badParams = false;
    for (var i = 0; i < expectedMethodParams.length; i++) {
        var expectedParam = expectedMethodParams[i];
        var actualExpr = actualMethodParamExpr[i];
        if (!actualExpr.checkType(expectedParam.getType(), env)) {
            env.addError(new TypeError("Argument type " + actualExpr.getExpressionType(env) + " does not match expected type " + expectedParam.getType() + " for closure " + closureName + ".", this.getLineNumber()));
            badParams = true;
        }
    }
    
    if (badParams)
        return false;

    var actualType = closure.getReturnType();
    if(!env.isTypeOrSuperType(aType, actualType)) {
        env.addError(new TypeError("The return type of the closure " + closureName + " was expected to be " 
            + aType + " but is of type " + actualType + ".", this.getLineNumber()));
        return false;
    }
    
    return true;
};

var simpleCheck = function(aType, expectedType, message, lineNumber, env) {
    if (env.isPrimitiveType(aType) || env.isFunctionType(aType)) {
        if (aType !== expectedType) {
            env.addError(new TypeError(message+".", lineNumber));
            return false;
        }        
    } else {
        var match = false;
        
        if(aType.match(/\$/))
            return true;

        env.walkClassHierarchy(env.getClass(aType), function(theClass) {
            if (theClass.getKey() === expectedType) {
                match = true;
            }
        });

        if (!match) {
            env.addError(new TypeError(message + ".", lineNumber));
            return false;
        }
    }
    
    return true;
};

var binaryOperatorCheck = function(typeObjects, lineno, env) {
    var valid = true;
    
    for (var i = 0; i < typeObjects.length; i++) {
        var typeObject = typeObjects[i];
        typeObject.errorMessage = typeObject.errorMessage || "Expected EXPECTED_TYPE but got ACTUAL_TYPE.";
        
        if (typeObject.node) {
            if (!typeObject.node.checkType(typeObject.expectedType, env)) {
                typeObject.errorMessage = typeObject.errorMessage.replace(EXPECTED_TYPE, typeObject.expectedType).replace(ACTUAL_TYPE, typeObject.node.getExpressionType(env));
                env.addError(new TypeError(typeObject.errorMessage, lineno));
                valid = false;
            }
        } else if (typeObject.overallType) {
            if (typeObject.overallType !== typeObject.expectedType) {
                typeObject.errorMessage = typeObject.errorMessage.replace(EXPECTED_TYPE, typeObject.expectedType).replace(ACTUAL_TYPE, typeObject.overallType);
                env.addError(new TypeError(typeObject.errorMessage, lineno));
                valid = false;
            }
        }
    }
        
    return valid;
};