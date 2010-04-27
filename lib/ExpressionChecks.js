var TypeError = require("./TypeError").TypeError;

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
    if(!this.children[0].checkType(this.children[1].getExpressionType(env), env)) {
        env.addError(new TypeError("The left hand side's type ("+this.children[0].getExpressionType(env)
            +") does not equal the right hand side's type ("+this.children[1].getExpressionType(env)+").", 
                this.getLineNumber()));
        return false;
    }
    
    return simpleCheck(aType, "boolean", "Expected not equal to be " + aType, this.getLineNumber(), env);
};

exports.Equals = function(aType, env) {
    if(!this.children[0].checkType(this.children[1].getExpressionType(env), env)) {
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
    return simpleCheck(aType, env.currentClass.getKey(), "Attempting to return " + 
        env.currentClass.getKey() + " but expecting " + aType, this.getLineNumber(), env);
};

exports.Construct = function(aType, env) {
    return simpleCheck(aType, this.constructor, "Attempting to return " +
        this.constructor + " but expecting " + aType, this.getLineNumber(), env);
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

var simpleCheck = function(aType, expectedType, message, lineNumber, env) {
    if(aType !== expectedType) {
        env.addError(new TypeError(message+".", lineNumber));
        return false;
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