var Compiler = require("../lib/Compiler.js").Compiler;
var ASSERT = require("test/assert");
var OS = require("os");
var FILE = require("file");

var options = {
    "debug":false,
    "args":["Test/Files/CodeGen/Ours/basic.java"]
};

exports.testThatBasicRuns = function() {
    runCompileTest("Test/Files/CodeGen/Ours/basic.java", "0\n");
};

var runCompileTest = function(file, expectedOutput) {
    var options = {
        "debug": false,
        "args":  [file]
    };
    var compiler = new Compiler(options);
    var compiledFile = options.args[0].replace(/\.java$/, ".j");
    
    compiler.compile();
    
    var jasmine = OS.popen(["java", "-jar", "src/jasmin.jar", compiledFile].join(" "));
    jasmine.wait();
    
    var javaProcess = OS.popen(["java", "Main"].join(" "));
    
    var result = javaProcess.stdout.read();
    
    ASSERT.eq(expectedOutput, result);
    
    FILE.rmtree("Main.class");
    FILE.rmtree(compiledFile);
};

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));