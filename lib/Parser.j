@import "Lexer.j"

@implementation Parser : Lexer
{
}

- (CPNumber)parse:(CPString)input
{
    ParsedProductions = [];

    try {
        parser.parse(input);
    } catch(e) {
        ParsedProductions.push(e.message);
        CPLog.error(e.message);
    }
    
    return ParsedProductions;
}

@end