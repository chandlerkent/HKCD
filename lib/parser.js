var Node = require(require("file").absolute("./lib/Node"));

var Parser = exports.Parser = function(grammar) {
    this.grammar = grammar;
}

Parser.prototype.parse = function(input) {
    var parser = new require("jison").Parser(this.grammar);    
    parser.yy = Node;

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