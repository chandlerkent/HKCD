var Env = require("./environment.js").environment;

var Node = exports.Node = function(name, children, properties) {
    this.name = name || "UNNAMED";
    this.children = children || [];
    for (var prop in (properties || {})) {
        this[prop] = properties[prop];
    }
    this.errors = [];
};

Node.prototype.addChild = function(child) {
    this.children.unshift(child);
};

Node.prototype.isLeafNode = function() {
    return !(this.children.length > 0);
};

Node.prototype.isClassDeclaration = function() {
    return !!this.class_decl;
};

Node.prototype.getClassName = function() {
    return this.class_decl;
};

Node.prototype.isMethodDeclaration = function() {
    return !!this.method_name;
};

Node.prototype.getMethodName = function() {
    return this.method_name;
};

Node.prototype.printNode = function() {
    var result = [];
    
    result.push("[" + this.name + "]");
    for (var prop in this) {
        if ((typeof this[prop] !== "function") && (prop !== "children") && (prop !== "name")) {
            result.push(prop + ": <" + this[prop] + ">");
        }
    }
    
    return result.join(" ");
};

// visit each node in order and execute
// the function with the node and the
// current environment
Node.prototype.walk = function(fn, env) {
    env = env || (new Env());
    
    this.children.forEach(function(child) {
        if (child instanceof Node) {
            if (child.isLeafNode()) {
                fn(child, env);
            } else {
                child.walk(fn, env);
            }
        }
    });

    fn(this, env);
};

Node.prototype.toString = function() {
    return toStringIndented(0, this);
};

var toStringIndented = function(indents, obj) {
    var result = "";
    for(var i = 0; i < indents; i++) {
        result += "   ";
    }
    
    if (!(obj instanceof Node)) {
        return result + obj.toString();
    }
    
    return result + obj.printNode() + obj.children.map(function(child) {
        if (!child)
            return "\n";
        return "\n" + toStringIndented(indents+1, child);
    }).join(" ");
};

