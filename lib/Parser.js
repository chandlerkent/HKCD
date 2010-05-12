var ASTNode = require("./ASTNode");
var Compiler = require("./Compiler").Compiler;
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

var ResultReporter = require("./ResultReporter").ResultReporter;

var optionsParser = Utils.createOptionsParser();

function main() {
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }  
      
    return (new Compiler(options, [new Parser()], new ResultReporter()).compile());
}

if (require.main === module)
    require("os").exit(main());