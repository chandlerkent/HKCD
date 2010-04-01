@import "Lexer.j"

@implementation Parser : Lexer
{
}

- (CPNumber)parse:(CPString)input
{    
    try {
        if (parser.parse(input))
            return [self tokenize:input].length;
    } catch(e) {
        print(e.message);
        return 0;
    }
}

@end