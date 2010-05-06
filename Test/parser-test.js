var Parser = require("../lib/parser").Parser;
var FileList = require("jake").FileList;
var UTILS = require("../lib/utils");
var ASSERT = require("assert");

var parser = new Parser(UTILS.readGrammarFromFile("src/grammar.json"));

exports.testThatParserDoesInitialize = function() {
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
    var inputFiles = new FileList(location).items();

    inputFiles.forEach(function(file) {
        var bytes = UTILS.readFile(file);

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

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));