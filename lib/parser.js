var Node = require(require("file").absolute("./lib/Node"));

var Parser = exports.Parser = function(grammar) {
    this.grammar = grammar;
}

Parser.prototype.parse = function(input) {
    var parser = new require("jison").Parser(this.grammar);    
    parser.yy = Node;

    try {
        var node = parser.parse(input);
    } catch(e) {
        return createError(e.message);
    }

    return node;
}

function createError(message) {
    return { errors: [message] };
}