var Node = exports.Node = function(name, children, properties) {
    this.name = name;
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

// visit each node in order and execute
// the function with the node and the
// current environment
Node.prototype.walk = function(fn, env) {
    env = env || {
        "classes": []
    };
    
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
    
    return result + obj.name + obj.children.map(function(child) {
        if (!child)
            return "\n";
        return "\n" + toStringIndented(indents+1, child);
    }).join(" ");
};

