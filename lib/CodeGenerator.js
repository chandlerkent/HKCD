var CodeEmitter = require("./CodeEmitter").CodeEmitter;

var CodeGenerator = exports.CodeGenerator = function() {
    // do nothing
};

CodeGenerator.prototype.execute = function(ast_and_env, compiler) {
    var ce = new CodeEmitter();
    
    ast_and_env.ast.emit(ce, ast_and_env.env);
    
    compiler.debug(ce.code.join("\n"));
    require("file").write(UTILS.replaceExtension(compiler.file, "j"), ce.code.join("\n"));

    return ce;
};

var Compiler = require("./Compiler").Compiler;
var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;

var optionsParser = require("./utils").createOptionsParser();

function main() { 
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }
       
    return (new Compiler(options, [new Parser(), new TypeChecker(), new CodeGenerator()]).compile());
}

if (require.main === module)
    require("os").exit(main());