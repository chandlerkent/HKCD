@import <Foundation/CPObject.j>

@implementation Lexer : CPObject
{
    JSObject    jison;
    JSObject    grammar;
}

- (id)init
{
    if (self = [super init])
    {
        grammar = generateGrammar();
        jison = require("jison");
    }
    return self;
}

- (CPString)tokenizeInput:(CPString)input
{
    var parser = new jison.Parser(grammar);
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
    var parser = new jison.Parser(grammar);
    stream.print(parser.generate()).close();
}

@end

function generateGrammar()
{
    return {
        "lex": {
            "rules": [
                ["[0-9]+", "return 'number';"],
                ["\\+", "return 'plus';"],
                ["-", "return 'minus';"]
            ]
        },

        "bnf": {
            "stmt": ["symbol stmt", ""],
            "symbol": ["number", "plus", "minus"]
        }
    };
}