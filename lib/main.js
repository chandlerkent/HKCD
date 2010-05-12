var File = require("file");
var Compiler = require("./Compiler").Compiler;
var Utils = require("./utils");

var Parser = require("./Parser").Parser;
var TypeChecker = require("./TypeChecker").TypeChecker;
var CodeGenerator = require("./CodeGenerator").CodeGenerator;
var CodeRunner = require("./CodeRunner").CodeRunner;
var ResultReporter = require("./ResultReporter").ResultReporter;

var optionsParser = Utils.createOptionsParser();

function main() {
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1) {
        optionsParser.printUsage(options);
        return -1;
    }

    if (File.isDirectory(options.args[0])) {
        Utils.processDirectory(options.args[0], function(file) {
            options.args[0] = file;
            var compiler = new Compiler(options, [new Parser(), new TypeChecker(), new CodeGenerator(), new CodeRunner()]);
            var success = compiler.compile();
            
            return (success) ? compiler.result : compiler.errors.join("\n");
        });
    } else {
        var compiler = new Compiler(options);
        compiler.reporter = new ResultReporter();
        var success = compiler.compile();
    }

    return true;
}

if (require.main === module)
    require("os").exit(main());