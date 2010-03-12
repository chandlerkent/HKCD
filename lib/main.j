@import <Foundation/Foundation.j>
@import "Lexer.j"

function main(args)
{
    if (args.length < 2)
    {
        print("You must specify an input string.");
        return;
    }
    
    var lexer = [[Lexer alloc] init];
    var tokens = [lexer tokenizeInput:args[1]];
    print(tokens);
    return;
}