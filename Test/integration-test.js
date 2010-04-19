// This is a test file for testing full-stack integration. We actually build ASTs for the unit testing portion
// of the project but we are required to submit functional test cases. Since we are writing them, we may as well
// leverage them. This is where they go.

File = require("file");
Parser = require(File.absolute("lib/parser.js")).Parser;
Driver = require(File.absolute("lib/driver.js")).Driver;
ClassTypes = require(File.absolute("lib/classtypes.js"));
ASSERT = require("assert");

exports.testThatDuplicateClassesGetTypeChecked = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/testcase01.java", "A class named Foo already exists.");
}

function compilingFileResultsInError(filename, error) {
    var finished = false;
    try {
        var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
        var ast = parser.parse(readFile(filename));
        
        if(ast.errors.length > 0)
            throw new Error("Error in parsing: " + ast.errors[0]);
        
        var driver = new Driver([ClassTypes]);
        var results = driver.process(ast);
        
        finished = true;
    }
    catch (e) {
        ASSERT.equal(error, e.message, "Error message: <" + e.message + "> did not match <" + error + ">");
    }
    
    if(finished)
        ASSERT.fail("We were expecting an error!");
}

function readGrammarFromFile(filePath) {
    try
    {
        return JSON.parse(readFile(filePath));
    }
    catch (e)
    {
        print("Error reading grammar file: " + filePath);
    }
}

function readFile(fileName) {
    try
    {
        var filePath = require("file").absolute(fileName);
        return require("file").read(filePath);
    }
    catch (e)
    {
        require("os").exit(-1);
    }
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));