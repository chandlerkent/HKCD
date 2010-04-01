@import "../lib/Lexer.j"
@import "../lib/main.j"

var FileList = require("jake").FileList;

@implementation ParserTest : OJTestCase
{
    Lexer  lexer;
}

- (void)setUp
{
    lexer = [[Parser alloc] initWithGrammar:readGrammarFromFile("lib/lexer_grammar.json")];
}

- (void)testThatParserDoesInitialize
{
    [self assertNotNull:lexer];
    [self assertNotNull:parser];
}

- (void)testThatLexerDoesLexOurTestFiles
{
    var inputFiles = new FileList("Test/Files/Ours/*.java").items();
    var outputFiles = new FileList("Test/Files/Ours/*.out").items();
    
    [self lexerLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexRoundOneTestFiles
{
    var inputFiles = new FileList("Test/Files/Round1/*.java").items();
    var outputFiles = new FileList("Test/Files/Round1/*.out").items();
    
    [self lexerLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexMilestoneTwoTestFiles
{
    var inputFiles = new FileList("Test/Files/Milestone2/*.java").items();
    var outputFiles = new FileList("Test/Files/Milestone2/Out/*.out").items();
    
    [self lexerLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexComments
{
    [self lexerLexes:"/* some comment */" into:""];
}

- (void)testThatLexerDoesLexReservedWords
{
    [self lexerLexesArray:["class", "public", "static", "void", "main", "String", "System.out.println"] forFormat:"ReservedWord, %@"];
}

- (void)testThatLexerDoesLexIdentifiers
{
    [self lexerLexes:"bob" into:"ID, bob"];
}

- (void)testThatLexerDoesLexDelimiters
{
    [self lexerLexesArray:[";", ".", ",", "=", "{", "}", "(", ")", "[", "]"] forFormat:"Delimiter, %@"];
}

- (void)testThatLexerDoesLexIntegers
{
    [self lexerLexes:"123" into:"Integer, 123"];
}

- (void)testThatLexerDoesLexOperators
{
    [self lexerLexesArray:["+", "-", "*", "/", "<", "<=", ">=", ">", "==", "!=", "&&", "||", "!"] forFormat:"Operator, %@"];
}

- (void)testThatLexerDoesLexCStyleComments
{
    [self lexerLexes:"// cool" into:""];
}

- (void)lexerLexesInputFiles:(CPArray)inputFiles intoOutputFiles:(CPArray)outputFiles
{
    var failures = 0;

    for(var i = 0; i < [inputFiles count]; i++)
    {
        if(![self lexerLexesInputFile:inputFiles[i] intoOutputFile:outputFiles[i]])
        {
            failures++;
        }
    }

    if(failures != 0)
    {
        [self fail:failures + " number of tests failed in "+ _cmd +". Check output files for diffs."];
    }
}

- (BOOL)lexerLexesInputFile:(CPString)inputFilename intoOutputFile:(CPString)outputFilename
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

- (void)lexerLexesArray:(CPArray)inputs forFormat:(CPString)expectedOutputFormat
{
    for(var i = 0; i < [inputs count]; i++) 
    {
        [self lexerLexes:[inputs objectAtIndex:i] into:[CPString stringWithFormat:expectedOutputFormat, [inputs objectAtIndex:i]]];
    }
}

- (void)lexerLexes:(CPString)input into:(CPString)expectedOutput
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