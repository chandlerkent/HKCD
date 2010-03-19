@import "../lib/Lexer.j"
@import "../lib/main.j"

var FileList = require("jake").FileList;

@implementation LexerTest : OJTestCase
{
    Lexer           target;
}

- (void)setUp
{
    target = [[Lexer alloc] initWithGrammar:readGrammarFromFile("lib/grammar.json")];
}

- (void)testThatLexerDoesInitialize
{
    [self assertNotNull:target];
}

- (void)testThatLexerDoesLexOurTestFiles
{
    var inputFiles = new FileList("Test/Files/Ours/*.java").items();
    var outputFiles = new FileList("Test/Files/Ours/*.out").items();
    
    [self lexersLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexRoundOneTestFiles
{
    var inputFiles = new FileList("Test/Files/Round1/*.java").items();
    var outputFiles = new FileList("Test/Files/Round1/*.out").items();
    
    [self lexersLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexMilestoneTwoTestFiles
{
    var inputFiles = new FileList("Test/Files/Milestone2/*.java").items();
    var outputFiles = new FileList("Test/Files/Milestone2/*.out").items();
    
    [self lexersLexesInputFiles:inputFiles intoOutputFiles:outputFiles];
}

- (void)testThatLexerDoesLexComments
{
    [self lexerLexes:"/* some comment */" into:""];
}

- (void)testThatLexerDoesLexReservedWords
{
    [self lexerLexesArray:["class", "public", "static", "void", "main", "String", "System.out.println"] forFormat:"ReservedWord, %@\n"];
}

- (void)testThatLexerDoesLexIdentifiers
{
    [self lexerLexes:"bob" into:"ID, bob\n"];
}

- (void)testThatLexerDoesLexDelimiters
{
    [self lexerLexesArray:[";", ".", ",", "=", "{", "}", "(", ")", "[", "]"] forFormat:"Delimiter, %@\n"];
}

- (void)testThatLexerDoesLexIntegers
{
    [self lexerLexes:"123" into:"Integer, 123\n"];
}

- (void)testThatLexerDoesLexOperators
{
    [self lexerLexesArray:["+", "-", "*", "/", "<", "<=", ">=", ">", "==", "!=", "&&", "||", "!"] forFormat:"Operator, %@\n"];
}

- (void)testThatLexerDoesLexCComments
{
    [self lexerLexes:"// cool" into:""];
}

- (void)lexersLexesInputFiles:(CPArray)inputFiles intoOutputFiles:(CPArray)outputFiles
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
    var expected_output = readFile(outputFilename);

    var output = [target tokenize:input];

    try
    {
        [self assert:expected_output equals:output];
    }
    catch (e)
    {
        var file = require("file");
        var filesPath = file.path(file.cwd());
        var actualFile = filesPath.join(outputFilename + ".actual").open("w");
        actualFile.print(output).close();
        
        print("\n\nFailed " + inputFilename);
        
        return false;
    }
    
    return true;
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
    var output = [target tokenize:input];
    
    [self assert:expectedOutput equals:output];
}

@end