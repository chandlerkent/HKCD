var Compiler = require("../lib/Compiler.js").Compiler;
var ASSERT = require("test/assert");
var OS = require("os");
var FILE = require("file");
var FileList = require("jake").FileList;

var files = [];
var outputs = [];

(new FileList("Test/Files/CodeGen/Ours/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/CodeGen/Ours/*.out").items()).forEach(function(file) {
    outputs.push(file);
});

(new FileList("Test/Files/CodeGen/Turn-In/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/CodeGen/Turn-In/*.out").items()).forEach(function(file) {
    outputs.push(file);
});

var buildCompileTest = function(file, expectedOutputFile) {
    var expectedOutput = FILE.read(expectedOutputFile);
    
    return function() {
        runCompileTest(file, expectedOutput);
    };
};

var runCompileTest = function(file, expectedOutput) {
    var options = {
        "debug": false,
        "args":  [file]
    };
    var compiler = new Compiler(options);
    
    compiler.compile();
    
    var jasmine = OS.popen(["java", "-jar", "src/jasmin.jar", "*.j"].join(" "));
    jasmine.wait();
    
    var javaProcess = OS.popen(["java", "Main"].join(" "));
    
    var result = javaProcess.stdout.read();
    
    ASSERT.eq(expectedOutput, result);
    // 
    // FILE.rmtree("Main.class");
    // FILE.rmtree(new FileList("*.j").items());
};

for (var i = 0; i < files.length; i++) {
    var fileParts = files[i].split("/");
    fileParts.shift();
    fileParts.shift();
    var fileNameThatMatters = fileParts.join("/");
    exports["testFile__/" + fileNameThatMatters] = buildCompileTest(files[i], outputs[i]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));