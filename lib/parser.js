var ASTNode = require("./ASTNode");
var Utils = require("./utils");

var Parser = exports.Parser = function(grammar) {
    this.grammar = grammar;
}

Parser.prototype.parse = function(input) {
    var parser = new require("jison").Parser(this.grammar);    
    parser.yy = ASTNode;

    try {
        var ast = parser.parse(input);
    } catch(e) {
        return { errors: [e.message] };
    }

    return ast;
}

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
    
    print("Parsing file: " + options.args[0]);
    
    var grammar = Utils.readGrammarFromFile(options.grammar);
    var parser = new Parser(grammar);
    
    var file = Utils.readFile(options.args[0]);
    var result = parser.parse(file);
    
    if (result.errors) {
        print(result.errors.join("\n"));
    } else {
        print("Parsed AST:");
        print(result.toString());
    }
}

if (require.main === module)
    require("os").exit(main());