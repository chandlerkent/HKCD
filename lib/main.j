@import <Foundation/Foundation.j>
@import "Lexer.j"

CPLogRegister(CPLogPrint);

var File = require("file");
var debugging = NO;

function main(args)
{
    if (args.length < 2)
    {
        CPLog.error("You must specify an input file (e.g. objj main.j <input file>).");
        return;
    }
    
    if (args[2] && args[2] == @"-d")
    {
        debugging = YES;
    }
    
    var fileName = args[1];
    var filePath = File.path(File.cwd()).join(fileName);
    
    var inputFile = readFile(filePath);
    
    var lexer = [[Lexer alloc] init];
    var tokens = [lexer tokenizeInput:inputFile];
    
    print("\nTokens:\n" + tokens);
    return;
}

function readFile(filePath)
{
    DEBUG("Reading file: " + filePath);
    var fileBytes = File.read(filePath);
    DEBUG("Read this from file:\n" + fileBytes);
    
    return fileBytes;
}

DEBUG = function(debugString)
{
    if (debugging)
        CPLog.debug(debugString);
}