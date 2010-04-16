var Production = exports.Production = function(lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
};

Production.prototype.toString = function() {
    return this.lhs + " ::= " + this.rhs;
};

var productions = exports.productions = [];

var createProduction = exports.createProduction = function(lhs, rhs) {
    productions.push(new Production(lhs, rhs));
};