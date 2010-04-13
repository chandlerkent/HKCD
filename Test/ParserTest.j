@import "../lib/main.j"
@import "../lib/Parser.j"

var FileList = require("jake").FileList;

@implementation ParserTest : OJTestCase
{
    Parser  parser;
}

- (void)setUp
{
    parser = [[Parser alloc] initWithGrammar:readGrammarFromFile("lib/grammar.json")];
}

- (void)testThatParserDoesInitialize
{
    [self assertNotNull:parser];
}

- (void)testThatParserDoesPassOurTestCases
{
    var inputFiles = new FileList("Test/Files/Parser/Ours/*.java").items();
    var outputFiles = new FileList("Test/Files/BasicParser/Ours/*.out").items();

    [self parserParsesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatParserDoesPassBasicParserTestCases
{
    var inputFiles = new FileList("Test/Files/BasicParser/BasicParserTestCases/FullTests/*.java").items();
    var outputFiles = new FileList("Test/Files/BasicParser/BasicParserTestCases/ExpectedOutput/*.out").items();

    [self parserParsesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (BOOL)parserParsesInputFiles:(CPArray)inputFiles intoOutputFiles:(CPArray)outputFiles
{
    var failures = 0;

    for (var i = 0; i < [inputFiles count]; i++)
    {
        if(![self parserParsesInputFile:inputFiles[i] intoOutputFile:outputFiles[i]])
        {
            failures++;
        }
    }

    if (failures != 0)
        [self fail:failures + " number of tests failed in "+ _cmd];
}

- (BOOL)parserParsesInputFile:(CPString)inputFilename intoOutputFile:(CPString)outputFilename
{
    var input = readFile(inputFilename);   
    var expected_output = parseInt([readFile(outputFilename) stringByTrimmingWhitespace]);
    var output = [parser parse:input];

    try
    {
        [self assert:expected_output equals:output];
        return true;
    }
    catch (e)
    {
        print("\nFailed " + inputFilename);
        return false;
    }
}

@end