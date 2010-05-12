var OS = require("os");
var FILE = require("file");

var CodeRunner = exports.CodeRunner = function() {
    // do nothing
};

CodeRunner.prototype.execute = function(emitter, compiler) {
    var files = [];
    for (var file in emitter.files) {
        files.push(file + ".j");
    }
    
    compiler.debug("Running jasmin with files " + files.join(", "));
    
    var jasmin = OS.popen(["java", "-jar", "src/jasmin.jar", files.join(" ")].join(" "));
    jasmin.wait();
    
    compiler.debug("Running 'java Main'");
    
    var javaProcess = OS.popen(["java", "Main"].join(" "));
    var result = javaProcess.stdout.read();

    // Clean-up
    for (var file in emitter.files) {
        compiler.debug("Removing file " + file);
        FILE.remove(file + ".j");
        FILE.remove(file + ".class");
    }
    
    return result;
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
       
    return (new Compiler(options, [new Parser(), new TypeChecker(), new CodeGenerator(), new CodeRunner()]).compile());
}

if (require.main === module)
    require("os").exit(main());