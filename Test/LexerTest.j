@import "../lib/Lexer.j"

@implementation LexerTest : OJTestCase
{
    CPDictionary    sampleInputs;
    Lexer           target;
}

- (void)setUp
{
    sampleInputs = [CPDictionary dictionaryWithObjects:[@"number 123\nplus +\nminus -\nnumber 312\n", @"plus +\nminus -\nminus -\nplus +\nplus +\nminus -\n"] forKeys:[@"123+-312", @"+--++-"]];
    target = [[Lexer alloc] init];
}

- (void)testThatLexerDoesInitialize
{
    [self assertNotNull:target];
}

- (void)testThatLexerDoesTokenizeSampleInputs
{
    var keys = [sampleInputs allKeys];
    for (var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        [self assert:[sampleInputs objectForKey:key] equals:[target tokenizeInput:key]];
    }
}

@end