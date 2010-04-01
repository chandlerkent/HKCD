@import "../lib/main.j"
@import "../lib/Parser.j"

@implementation ParserTest : OJTestCase
{
    Parser  target;
}

- (void)testThatParserDoesInitialize
{
    target = [[Parser alloc] initWithGrammar:readGrammarFromFile("lib/grammar.json")];
    [self assertNotNull:target];
}

@end