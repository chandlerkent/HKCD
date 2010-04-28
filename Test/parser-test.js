var Parser = require("../lib/parser").Parser;
var FileList = require("jake").FileList;
var ASSERT = require("assert");

exports.testThatParserDoesInitialize = function() {
    var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
    assertNotNull(parser);
}

exports.testThatParserDoesPassOurGoodTestCases = function() {
    parserParsesWithNoErrorsInputFilesFromLocation("Test/Files/Parser/Ours/Good/*.java");
}

exports.testThatParserDoesPassEarlyGoodTestCases = function() {
    parserParsesWithNoErrorsInputFilesFromLocation("Test/Files/Parser/Early/Good/*.java");
}

exports.testThatParserDoesPassFullGoodTestCases = function() {
    parserParsesWithNoErrorsInputFilesFromLocation("Test/Files/Parser/FullParserTestCases/Good/FullTests/*.java");
}

exports.testThatParserDoesFailFullBadTestCases = function() {
    parserParsesWithErrorsInputFilesFromLocation("Test/Files/Parser/FullParserTestCases/Bad/FullTests/*.java");
}

function parserParsesWithNoErrorsInputFilesFromLocation(location) {
    parserParsesWithAssertionInputFilesFromLocation(
            function(parsedFile) {
                ASSERT.equal(undefined, parsedFile.errors);
            }, location);
}

function parserParsesWithErrorsInputFilesFromLocation(location) {
    parserParsesWithAssertionInputFilesFromLocation(
            function(parsedFile) {
                ASSERT.equal(true, parsedFile.errors.length > 0);
            }, location);
}

function parserParsesWithAssertionInputFilesFromLocation(assertion, location) {
    var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
    var inputFiles = new FileList(location).items();

    inputFiles.forEach(function(file) {
        var bytes = readFile(file);

        try {
            var parsedFile = parser.parse(bytes);
            assertion(parsedFile);
        } catch(e) {
            ASSERT.fail("Failed test case: " + file + " :: " + e.message);
        }
    });
}

function assertNotNull(obj) {
    if(!obj || obj === null) {
        ASSERT.fail("Expecting a non null object.");
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