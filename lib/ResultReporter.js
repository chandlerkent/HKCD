var ResultReporter = exports.ResultReporter = function() {
    // do nothing
};

ResultReporter.prototype.execute = function(data, compiler) {
    if (compiler.errors.length > 0) {
        print("===============");
        print("COMPILE FAILED.");
        print("===============");
        print(compiler.errors.join("\n"));
        return compiler.errors.join("\n");
    } else {
        print("===============================");
        print("COMPILE FINISHED SUCCESSFULLLY.");
        print("===============================");
        return true;
    }
};

var Compiler = require("./Compiler").Compiler;
var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var CodeGenerator = require("./CodeGenerator").CodeGenerator;

var optionsParser = require("./utils").createOptionsParser();

function main() { 
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }
       
    return (new Compiler(options, [new Parser(), new TypeChecker(), new CodeGenerator(), new ResultReporter()]).compile());
}

if (require.main === module)
    require("os").exit(main());