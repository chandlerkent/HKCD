var ASTNode = require("./ASTNode");

var Parser = exports.Parser = function(grammar) {
    this.grammar = grammar;
}

Parser.prototype.parse = function(input) {
    var parser = new require("jison").Parser(this.grammar);    
    parser.yy = ASTNode;

    try {
        var ast = parser.parse(input);
    } catch(e) {
        return createError(e.message);
    }

    return ast;
}

function createError(message) {
    return { errors: [message] };
}