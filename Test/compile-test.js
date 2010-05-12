var Compiler = require("../lib/Compiler.js").Compiler;
var ASSERT = require("test/assert");
var FILE = require("file");
var FileList = require("jake").FileList;

var files = [];
var outputs = [];

// Ours
(new FileList("Test/Files/CodeGen/Ours/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/CodeGen/Ours/*.out").items()).forEach(function(file) {
    outputs.push(file);
});

// Turn-In
(new FileList("Test/Files/CodeGen/Turn-In/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/CodeGen/Turn-In/*.out").items()).forEach(function(file) {
    outputs.push(file);
});

// Early Samples
(new FileList("Test/Files/CodeGen/EarlySamples/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/CodeGen/EarlySamples/*.out").items()).forEach(function(file) {
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
    
    var result = compiler.compile();
    
    ASSERT.eq(expectedOutput, result);
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