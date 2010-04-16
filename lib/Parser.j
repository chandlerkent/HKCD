@import <Foundation/CPObject.j>

var ast = require(require("file").absolute("./lib/ast"));

@implementation Parser : CPObject
{
    JSObject grammar;
}

- (id)initWithGrammar:(JSObject)aGrammar
{
    if (self = [super init])
    {
        grammar = aGrammar;
    }
    return self;
}

- (JSObject)parse:(CPString)input
{
    var parser = new require("jison").Parser(grammar);    
    parser.yy = ast;

    try {
        var node = parser.parse(input);
    } catch(e) {
        // parser.yy.createError(e.message);
    }

    return node;
}

@end