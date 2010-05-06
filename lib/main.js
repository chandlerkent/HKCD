var File = require("file");
var Parser = require("./parser").Parser;
var TypeChecker = require("./TypeChecker");
var Utils = require("./utils");

// Options Parser
var optionsParser = new (require("args").Parser)();

optionsParser.usage("INPUT_FILE");
optionsParser.help("Compiles an input file.");

optionsParser.option("-g", "grammar")
    .def("src/grammar.json")
    .set()
    .help("Specifies the grammar file (default lib/grammar.json).");

optionsParser.helpful();

function main()
{
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1)
    {
        optionsParser.printUsage(options);
        return;
    }
    
    var parser = new Parser(Utils.readGrammarFromFile(options.grammar));
    if (File.isDirectory(options.args[0])) {
        Utils.processDirectory(options.args[0], function(file) {
            var ast = parseFile(file, parser);
            
            if(ast.errors) {
                return "Parse Error\n\n"+ast.errors.join("\n");
            }
            
            var result = TypeChecker.typeCheck(ast);
            
            return result.env.errors.join("\n");
        });
    } else {
        var ast = parseFile(Utils.readFile(options.args[0]), parser);
        print("AST:");
        print(ast);
        var result = TypeChecker.typeCheck(ast);
        
        print("TypeChecked AST:");
        print(result.ast + "\n\nErrors:\n" + result.env.errors.join("\n"));
    }

    return;
}

function parseFile(file, parser) {
    var result = "";
    
    var ast = parser.parse(file);
    
    result += ast.toString();
    
    return ast;
}

if (require.main === module)
    require("os").exit(main());