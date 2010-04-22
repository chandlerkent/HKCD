var Env = require("./environment.js").Environment;

var ASTNode = exports.ASTNode = function(name, children, properties) {
    this.name = name || "UNNAMED";
    this.children = children || [];
    for (var property in properties) {
        this[property] = properties[property];
    }
    this.errors = [];
};

ASTNode.prototype.addChild = function(child) {
    this.children.unshift(child);
};

ASTNode.prototype.isLeafNode = function() {
    return !(this.children.length > 0);
};

ASTNode.prototype.isClassDeclaration = function() {
    return !!this.class_decl;
};

ASTNode.prototype.getClassName = function() {
    return this.class_decl;
};

ASTNode.prototype.getSuperClassName = function() {
    return this.extension;
};

ASTNode.prototype.hasSuperClass = function() {
    return !!this.extension;
};

ASTNode.prototype.isMethodDeclaration = function() {
    return !!this.method_name;
};

ASTNode.prototype.isFieldDeclaration = function() {
    return !!this.var_name;
}

ASTNode.prototype.isParameterDeclaration = function() {
    return !!this.param_name;
}

ASTNode.prototype.getFieldName = function() {
    return this.var_name;
}

ASTNode.prototype.getMethodName = function() {
    return this.method_name;
};

ASTNode.prototype.getParameterName = function() {
    return this.param_name;
}

ASTNode.prototype.getReturnType = function() {
    return this.return_type;
};

ASTNode.prototype.getType = function() {
    return this.type;
}

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
    env = env || (new Env());
    
    this.children.forEach(function(child) {
        if (child instanceof ASTNode) {
            if (child.isLeafNode()) {
                fn(child, env);
            } else {
                child.walk(fn, env);
            }
        }
    });

    fn(this, env);
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
        if ((typeof this[prop] !== "function") && (prop !== "children") && (prop !== "name") && (prop !== "errors")) {
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

