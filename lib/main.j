@import <Foundation/Foundation.j>
@import "Lexer.j"

var File = require("file");

// Options Parser
var parser = new (require("args").Parser)();

parser.usage("INPUT_FILE");
parser.help("Performs lexical analysis on an input file using a grammar.");

parser.option("-d", "debug")
    .def(false)
    .set(true)
    .help("Debug flag. Use this option to print debug messages.");

parser.option("-g", "grammar")
    .def("lib/grammar.json")
    .set()
    .help("Specifies the grammar file (default lib/grammar.json).");

parser.helpful();

DEBUG = function (debugString) {};

function main(args)
{
    var options = parser.parse(args);
    
    if (options.args.length < 1)
    {
        parser.printUsage(options);
        return;
    }
    
    CPLogRegister(CPLogPrint);
    
    if (options.debug) {
        DEBUG = function(debugString)
        {
            CPLog.debug(debugString);
        }
    }
    
    var fileName = options.args[0];    
    var inputFile = readFile(fileName);
    
    var lexer = [[Lexer alloc] initWithGrammar:readGrammarFromFile(options.grammar)];
    var tokens = [lexer tokenize:inputFile];
    
    print("\nTokens:\n" + tokens);
    return;
}

function readGrammarFromFile(filePath)
{
    try
    {
        return JSON.parse(readFile(filePath));
    }
    catch (e)
    {
        CPLog.error("Error reading grammar file: " + filePath);
        require("os").exit(-1);
    }
}

function readFile(fileName)
{
    try
    {
        var filePath = File.path(File.cwd()).join(fileName);
        DEBUG("Reading file: " + filePath);
        fileBytes = File.read(filePath);
        DEBUG("Read this from file:\n" + fileBytes);
        
        return fileBytes;
    }
    catch (e)
    {
        CPLog.error("Error reading file: " + filePath);
        require("os").exit(-1);
    }
}