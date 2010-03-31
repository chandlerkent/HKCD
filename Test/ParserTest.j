@import "../lib/Parser.j"
@import "../lib/main.j"

var FileList = require("jake").FileList;

@implementation ParserTest : OJTestCase
{
    Parser           lexer;
}

- (void)setUp
{
    lexer = [[Parser alloc] initWithGrammar:readGrammarFromFile("lib/lexer_grammar.json")];
}

- (void)testThatParserDoesInitialize
{
    [self assertNotNull:lexer];
}

- (void)testThatParserDoesLexOurTestFiles
{
    var inputFiles = new FileList("Test/Files/Ours/*.java").items();
    var outputFiles = new FileList("Test/Files/Ours/*.out").items();
    
    [self parserLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatParserDoesLexRoundOneTestFiles
{
    var inputFiles = new FileList("Test/Files/Round1/*.java").items();
    var outputFiles = new FileList("Test/Files/Round1/*.out").items();
    
    [self parserLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatParserDoesLexMilestoneTwoTestFiles
{
    var inputFiles = new FileList("Test/Files/Milestone2/*.java").items();
    var outputFiles = new FileList("Test/Files/Milestone2/Out/*.out").items();
    
    [self parserLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatParserDoesLexComments
{
    [self parserLexes:"/* some comment */" into:""];
}

- (void)testThatParserDoesLexReservedWords
{
    [self parserLexesArray:["class", "public", "static", "void", "main", "String", "System.out.println"] forFormat:"ReservedWord, %@"];
}

- (void)testThatParserDoesLexIdentifiers
{
    [self parserLexes:"bob" into:"ID, bob"];
}

- (void)testThatParserDoesLexDelimiters
{
    [self parserLexesArray:[";", ".", ",", "=", "{", "}", "(", ")", "[", "]"] forFormat:"Delimiter, %@"];
}

- (void)testThatParserDoesLexIntegers
{
    [self parserLexes:"123" into:"Integer, 123"];
}

- (void)testThatParserDoesLexOperators
{
    [self parserLexesArray:["+", "-", "*", "/", "<", "<=", ">=", ">", "==", "!=", "&&", "||", "!"] forFormat:"Operator, %@"];
}

- (void)testThatParserDoesLexCComments
{
    [self parserLexes:"// cool" into:""];
}

- (void)parserLexesInputFiles:(CPArray)inputFiles intoOutputFiles:(CPArray)outputFiles
{
    var failures = 0;

    for(var i = 0; i < [inputFiles count]; i++)
    {
        if(![self parserLexesInputFile:inputFiles[i] intoOutputFile:outputFiles[i]])
        {
            failures++;
        }
    }

    if(failures != 0)
    {
        [self fail:failures + " number of tests failed in "+ _cmd +". Check output files for diffs."];
    }
}

- (BOOL)parserLexesInputFile:(CPString)inputFilename intoOutputFile:(CPString)outputFilename
{
    var input = readFile(inputFilename);    
    var expected_output = [readFile(outputFilename) stringByTrimmingWhitespace];
    var output = transformTokenArrayToString([lexer tokenize:input]);

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

- (void)parserLexesArray:(CPArray)inputs forFormat:(CPString)expectedOutputFormat
{
    for(var i = 0; i < [inputs count]; i++) 
    {
        [self parserLexes:[inputs objectAtIndex:i] into:[CPString stringWithFormat:expectedOutputFormat, [inputs objectAtIndex:i]]];
    }
}

- (void)parserLexes:(CPString)input into:(CPString)expectedOutput
{
    var output = transformTokenArrayToString([lexer tokenize:input]);
    
    [self assert:expectedOutput equals:output];
}

@end

function transformTokenArrayToString(tokens) {
    tokens = tokens.map(function(item) {
        return item.token + ", " + item.match;
    });
    tokens = tokens.join("\n");

    return tokens;
}