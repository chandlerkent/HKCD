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
        ParsedProductions.push("\n");
        ParsedProductions.push(e.message);
    }
    
    return ParsedProductions;
}

@end