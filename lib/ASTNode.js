var ExpressionChecks = exports.ExpressionChecks = require("./ASTNode/ExpressionChecks");
var ExpressionTypes = exports.ExpressionTypes = require("./ASTNode/ExpressionTypes");
var NodeEmitters = exports.NodeEmitters = require("./ASTNode/NodeEmitters");
var VariableMap = require("./Environment").VariableMap;
var ScopeMap = require("./Environment").ScopeMap;

var ASTNode = exports.ASTNode = function(name, children, properties) {
    this.name = name || "UNNAMED";
    this.children = children || [];
    this.lineNumber = -1;
    this.scope = new ScopeMap();
    
    for (var property in properties) {
        this[property] = properties[property];
    }
    
    // Add expression mixins
    var exprIndex = this.name.indexOf("Expression");
    if (exprIndex > 0) {
        var functionName = this.name.substring(0, exprIndex);
        this.checkType = ExpressionChecks[functionName];
        this.getExpressionType = ExpressionTypes[functionName];
    }
    
    // Add emmiter mixins
    this.emit = NodeEmitters[this.name] || function() { print("NOT YET IMPLEMENTED FOR " + this.name.toUpperCase()); };
};

ASTNode.prototype.addChild = function(child) {
    this.children.unshift(child);
};

ASTNode.prototype.isLeafNode = function() {
    return !(this.children.length > 0);
};

ASTNode.prototype.isClassDeclaration = function() {
    return !!this.className;
};

ASTNode.prototype.getClassName = function() {
    return this.className;
};

ASTNode.prototype.getSuperClassName = function() {
    return this.superClassName;
};

ASTNode.prototype.hasSuperClass = function() {
    return !!this.superClassName;
};

ASTNode.prototype.isMethodDeclaration = function() {
    return !!this.methodName;
};

ASTNode.prototype.isMainMethodDeclaration = function() {
    return this.methodName === "main";
};

ASTNode.prototype.isFieldDeclaration = function() {
    return !!this.fieldName;
};

ASTNode.prototype.isParameterDeclaration = function() {
    return !!this.parameterName;
};

ASTNode.prototype.isInitialAssignment = function() {
    return this.name === "InitialAssignment";
};

ASTNode.prototype.isBlock = function() {
    return this.name === "Block";
};

ASTNode.prototype.isIf = function() {
    return this.name === "If";
};

ASTNode.prototype.isWhile = function() {
    return this.name === "While";
};

ASTNode.prototype.isAssignment = function() {
    return this.name === "Assignment";
};

ASTNode.prototype.isPrintLine = function() {
    return this.name === "PrintLine";
};

ASTNode.prototype.getFieldName = function() {
    return this.fieldName;
};

ASTNode.prototype.getMethodName = function() {
    return this.methodName;
};

ASTNode.prototype.getMethodCallName = function() {
    return this.methodCallName;
};

ASTNode.prototype.getCondition = function() {
    return this.condition;
};

ASTNode.prototype.getExpression = function() {
    return this.expression;
};

ASTNode.prototype.getParameters = function() {
    return this.parameters;
};

ASTNode.prototype.getScope = function() {
    return this.scope;
};

ASTNode.prototype.setScope = function(scope) {
    this.scope = scope;
};

ASTNode.prototype.getValue = function() {
    return this.value;
};

ASTNode.prototype.getParameterName = function() {
    return this.parameterName;
};

ASTNode.prototype.getReturnType = function() {
    return this.returnType;
};

ASTNode.prototype.getReturnExpression = function() {
    return this.returnExpression;
}

ASTNode.prototype.getName = function() {
    return this.name;
};

ASTNode.prototype.getVariableName = function() {
    return this.varName;
};

ASTNode.prototype.getLineNumber = function() {
    if(!!this.lineNumber)
        return this.lineNumber;

    return -1;
};

ASTNode.prototype.getParameterTypesForMethod = function() {
    var types = [];
    
    this.children.forEach(function(child){
       if(child instanceof ASTNode && child.isParameterDeclaration()) {
           types.push(child.getType());
       }
    });
    
    return types;
}

ASTNode.prototype.getType = function() {
    return this.type;
};

ASTNode.prototype.printNode = function() {
    var result = [];
    
    result.push("[" + this.name + "]");
    for (var prop in this) {
        if ((typeof this[prop] !== "function") && (prop !== "children") && (prop !== "name")) {
            result.push(prop + ":");
            result.push("<" + this[prop] + ">");
        }
    }
    
    return result.join(" ");
};

// visit each node in order and execute
// the function with the node and the
// current environment
ASTNode.prototype.walk = function(fn, env) {
    env.pushScope(this.getScope());
      
    if (this.isClassDeclaration()) {
        env.enterClassScope(this.getClassName());
    }

    if (this.isMethodDeclaration()) {
        env.enterMethodScope(this.getMethodName());
    }

    fn(this, env);
    
    this.children.forEach(function(child) {
        if (child instanceof ASTNode) {
            env = child.walk(fn, env);
        }
    });
    
    if (this.isClassDeclaration()) {
        env.exitClassScope();
    }

    if (this.isMethodDeclaration()) {
        env.exitMethodScope();
    }
        
    return env;
};

ASTNode.prototype.toJSON = function() {
    var result = "new ASTNode('" + this.name + "', [";
        
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child instanceof ASTNode) {
            result += child.toJSON();
            if (i < this.children.length - 1) {
                result += ", ";
            }
        } else {
            result += child.toString();
        }
    }
    
    result += "], {";
    
    for (var prop in this) {
        if ((typeof this[prop] !== "function") && (prop !== "children") && (prop !== "name")) {
            result += " '" + prop + "': '" + this[prop] + "',";
        }
    }
    
    result += "})";
    
    return result;
};

ASTNode.prototype.toString = function() {
    return toStringIndented(0, this);
};

var toStringIndented = function(indents, obj) {
    var result = "";
    for(var i = 0; i < indents; i++) {
        result += "   ";
    }
    
    if (!(obj instanceof ASTNode)) {
        return result + obj.toString();
    }
    
    return result + obj.printNode() + obj.children.map(function(child) {
        if (!child)
            return "\n";
        return "\n" + toStringIndented(indents+1, child);
    }).join(" ");
};