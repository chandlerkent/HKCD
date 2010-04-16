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