@import "Lexer.j"

@implementation Parser : Lexer
{
}

- (CPNumber)parse:(CPString)input
{
    parser.yy = require(require("file").absolute("./lib/actions"));

    try {
        parser.parse(input);
    } catch(e) {
        CPLog.error(e.message);
        parser.yy.productions.push("\n");
        parser.yy.productions.push(e.message);
    }
    
    return parser.yy.productions;
}

@end