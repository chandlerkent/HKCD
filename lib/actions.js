var ParseResults = exports.ParseResults = function() {
    this.productions = [];
    this.errors = [];
};

ParseResults.prototype.createProduction = function(lhs, rhs) {
    this.productions.push(new Production(lhs, rhs));
};

ParseResults.prototype.createError = function(message) {
    this.errors.push(message);
};

var Production = exports.Production = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
};

Production.prototype.toString = function() {
    return this.lhs + " ::= " + this.rhs;
};

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

