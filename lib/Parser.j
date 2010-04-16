@import <Foundation/CPObject.j>

var actions = require(require("file").absolute("./lib/actions"));

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
    parser.yy = new actions.ParseResults();

    try {
        parser.parse(input);
    } catch(e) {
        parser.yy.createError(e.message);
    }
    
    return parser.yy;
}

@end