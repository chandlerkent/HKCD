@import <Foundation/CPObject.j>

@implementation Parser : CPObject
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

- (CPArray)tokenize:(CPString)input
{
    var lexer = parser.lexer;
    lexer.setInput(input);
    
    var result = [];
    
    var token = lexer.lex();
    while (token) {
        result.push({
            "token": parser.terminals_[token],
            "match": lexer.match
        });
        token = lexer.lex();
    }
    
    return result;
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

- (void)writeGeneratedParserToFile
{
    var fs = require("file");
    var cwd = fs.path(fs.cwd());
    var stream = cwd.join("generatedParser.js").open("w");
    stream.print(parser.generate()).close();
}

@end

