var ASTNode = require("./ASTNode");
var Utils = require("./utils");

var Parser = exports.Parser = function(grammar) {
    this.grammar = grammar || Utils.readGrammarFromFile(require("file").absolute("src/grammar.json"));
};

Parser.prototype.parse = function(input) {
    var parser = new require("jison").Parser(this.grammar);    
    parser.yy = ASTNode;

    try {
        var ast = parser.parse(input);
    } catch(e) {
        return { errors: [e.message] };
    }

    return ast;
};

Parser.prototype.execute = function(file, compiler) {
    compiler.debug("Parsing file: " + file);
    
    var result = this.parse(Utils.readFile(file));
    
    if (result.errors) {
        compiler.addErrors(result.errors);
        return false;
    } else {
        compiler.debug("Parsed AST:");
        compiler.debug(result);
        return result;
    }
};

function main() {
    var optionsParser = new (require("args").Parser)();

    optionsParser.usage("INPUT_FILE");
    optionsParser.help("Parses an input file and outputs the generated AST or errors (if any).");

    optionsParser.option("-g", "grammar")
        .def("src/grammar.json")
        .set()
        .help("Specifies the grammar file (default src/grammar.json).");

    optionsParser.helpful();

    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return;
    }
    
    var grammar = Utils.readGrammarFromFile(options.grammar);
    var parser = new Parser(grammar);
    
    return parser.execute(options.args[0]);
}

if (require.main === module)
    require("os").exit(main());