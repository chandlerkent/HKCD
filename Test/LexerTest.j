@import "../lib/Lexer.j"
@import "../lib/main.j"

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

- (void)testThatLexerDoesLexInputFiles
{
    var inputFiles = new (require("jake").FileList)("Test/Files/*Input.txt").items();
    var outputFiles = new (require("jake").FileList)("Test/Files/*Output.txt").items();
    
    for(var i = 0; i < [inputFiles count]; i++)
    {
        [self lexerLexesInputFile:inputFiles[i] intoOutputFile:outputFiles[i]];
    }
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

- (void)lexerLexesInputFile:(CPString)inputFilename intoOutputFile:(CPString)outputFilename
{
    var input = readFile(inputFilename);
    var expected_output = readFile(outputFilename);

    var output = [target tokenize:input];

    [self assert:expected_output equals:output];
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