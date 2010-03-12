@import <Foundation/CPObject.j>

@implementation Lexer : CPObject
{
    JSObject    parser;
    JSObject    grammar;
}

- (id)init
{
    return [self initWithGrammar:nil];
}

- (id)initWithGrammar:(JSObject)aGrammar
{
    if (self = [super init])
    {
        grammar = aGrammar;
        parser = new require("jison").Parser(grammar);
    }
    return self;
}

- (CPString)tokenize:(CPString)input
{
    var lexer = parser.lexer;
    
    lexer.setInput(input);
    
    var result = "";
    var token = lexer.lex();
    while (token) {
        result += parser.terminals_[token] + ", " + lexer.match + "\n";
        token = lexer.lex();
    }
    return result;
}

- (void)writeLexerToFile
{
    var fs = require("file");
    var cwd = fs.path(fs.cwd());
    var stream = cwd.join("generatedParser.js").open("w");
    stream.print(parser.generate()).close();
}

@end

