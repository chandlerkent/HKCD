var Node = exports.Node = function(name, children, properties) {
    this.name = name;
    for (prop in (properties || {})) {
        this[prop] = properties[prop];
    }
    this.children = children || [];
};

Node.prototype.addChild = function(child) {
    this.children.unshift(child);
};

Node.prototype.walk = function(fn) {
    
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

