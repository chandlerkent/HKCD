var CodeEmitter = require("./CodeEmitter").CodeEmitter;
var UTILS = require("./utils");
var OS = require("os");
var FILE = require("file");

var CodeGenerator = exports.CodeGenerator = function() {
    // do nothing
};

CodeGenerator.prototype.execute = function(ast_and_env, compiler) {
    var ce = new CodeEmitter();
    
    ast_and_env.ast.emit(ce, ast_and_env.env);
    
    for (var file in ce.files) {
        var code = ce.files[file].join("\n");
        compiler.debug(code);
        FILE.write(file + ".j", code);
    }

    return ce;
};

var Compiler = require("./Compiler").Compiler;
var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var ResultReporter = require("./ResultReporter").ResultReporter;

var optionsParser = require("./utils").createOptionsParser();

function main() { 
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }
       
    return (new Compiler(options, [new Parser(), new TypeChecker(), new CodeGenerator()], new ResultReporter()).compile());
}

if (require.main === module)
    require("os").exit(main());