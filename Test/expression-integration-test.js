var FileList = require("jake").FileList;
var TypeChecker = require("../lib/TypeChecker");
var Parser = require("../lib/parser").Parser;
var ASSERT = require("assert");

var inFiles = new FileList("Test/Files/ExpressionTypeChecker/EarlySamples/*.java").items();
var outFiles = new FileList("Test/Files/ExpressionTypeChecker/EarlySamples/*.out").items();

for (var i = 0; i < inFiles.length; i++) {
    var fileParts = inFiles[i].split("/");
    fileParts.shift();
    fileParts.shift();
    var fileNameThatMatters = fileParts.join("/");
    exports["testFile__/" + fileNameThatMatters] = buildTestFunctionForFile(inFiles[i], outFiles[i]);
}

var parser = new Parser(readGrammarFromFile("src/grammar.json"));

function buildTestFunctionForFile(inFile, outFile) {
    return function() {
        var ast = parser.parse(readFile(inFile));
        
        var env = TypeChecker.typeCheck(ast).env;

        var actualMessages = env.errors.map(function(err) {
            return err.message;
        }).join("\n");
        
        var expected = readFile(outFile);
        
        ASSERT.equal(expected, actualMessages, "Error message: <" + actualMessages + 
            ">\n\ndid not match\n\n<" + expected + ">");
    };
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