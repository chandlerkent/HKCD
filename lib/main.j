@import <Foundation/Foundation.j>
@import "Lexer.j"

var File = require("file");
var FileList = require("jake").FileList;

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
    
    var lexer = [[Lexer alloc] initWithGrammar:readGrammarFromFile(options.grammar)];
    
    if (File.isDirectory(options.args[0])) {
        var folder = options.args[0];
        print("reading from " + folder);
        var outFolder = File.absolute(folder) + "Out";
        
        if (File.exists(outFolder))
            File.rmtree(outFolder);
        
        File.mkdir(outFolder);
        var files = new FileList(folder + "*.java").items();
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var inputFile = readFile(file);
            var tokens = [lexer tokenize:inputFile];
            
            File.write(outFolder + "/" + [file lastPathComponent].split(".")[0] + ".out", tokens);
        }
    } else {
        var fileName = options.args[0];    
        var inputFile = readFile(fileName);
        
        var tokens = [lexer tokenize:inputFile];

        print("\nTokens:\n" + tokens);
    }
    return;
}

function readGrammarFromFile(filePath) {
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

function readFile(fileName) {
    try
    {
        var filePath = File.absolute(fileName);
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