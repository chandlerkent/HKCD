var FileList = require("jake").FileList;
var TypeChecker = require("../lib/TypeChecker");
var Parser = require("../lib/parser").Parser;
var ASSERT = require("assert");

exports.testThatEarlySamplesEqualExpectedOutput = function() {
    var pathOfInputFiles = "Test/Files/ExpressionTypeChecker/EarlySamples/*.java";
    var pathOfOutputFiles = "Test/Files/ExpressionTypeChecker/EarlySamples/*.out";
    
    var inputFiles = new FileList(pathOfInputFiles).items();
    var outputFiles = new FileList(pathOfOutputFiles).items();
    
    for(var i = 0; i < inputFiles.length; i++) {
        print("TypeChecking " + inputFiles[i]);
        
        var parser = new Parser(readGrammarFromFile("src/grammar.json"));
        var ast = parser.parse(readFile(inputFiles[i]));

        var env = TypeChecker.typeCheck(ast).env;

        var actualMessages = env.errors.map(function(err) {
            return err.message;
        }).join("\n");
        
        var expected = readFile(outputFiles[i]);
        
        ASSERT.equal(expected, actualMessages, "Error message: <" + actualMessages + 
            ">\n\ndid not match\n\n<" + expected + ">");
    }
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