@import <Foundation/Foundation.j>
@import "Parser.j"

var File = require("file");
var FileList = require("jake").FileList;

// Options Parser
var optionsParser = new (require("args").Parser)();

optionsParser.usage("INPUT_FILE");
optionsParser.help("Performs lexical analysis on an input file using a grammar.");

optionsParser.option("-d", "debug")
    .def(false)
    .set(true)
    .help("Debug flag. Use this option to print debug messages.");

optionsParser.option("-t", "tokenize")
    .def(false)
    .set(true)
    .help("Tokenize flag. Tokenizes the input.");

optionsParser.option("-g", "grammar")
    .def("lib/grammar.json")
    .set()
    .help("Specifies the grammar file (default lib/grammar.json).");

optionsParser.helpful();

DEBUG = function (debugString) {};

function main(args)
{
    var options = optionsParser.parse(args);
    
    if (options.args.length < 1)
    {
        optionsParser.printUsage(options);
        return;
    }
    
    CPLogRegister(CPLogPrint);
    
    if (options.debug) {
        DEBUG = function(debugString)
        {
            CPLog.debug(debugString);
        }
    }
    
    if (options.tokenize) {
        var parser = [[Parser alloc] initWithGrammar:readGrammarFromFile("lib/lexer_grammar.json")];
        if (File.isDirectory(options.args[0])) {
            tokenizeFolder(options.args[0], parser);
        } else {
            tokenizeFile(options.args[0], parser);
        }
    } else {
        var parser = [[Parser alloc] initWithGrammar:readGrammarFromFile(options.grammar)];
        parseFile(options.args[0], parser);
    }
    
    return;
}

function tokenizeFolder(folder, lexer) {
    print("Reading from folder: " + folder);

    recreateFolder(outputPathForFolder(folder));
    
    var files = new FileList(folder + "*.java").items();
    
    for (var i = 0; i < files.length; i++) {
        var inputFile = readFile(files[i]);
        
        File.write(outputPathForFolder(folder) + outputPathForFile(files[i]), tokensForFile(files[i], lexer));
    }
}

function recreateFolder(folder) {
    if (File.exists(folder))
        File.rmtree(folder);
    
    File.mkdir(folder);
}

function outputPathForFolder(folder) {
    return File.absolute(folder) + "Out";
}

function outputPathForFile(file) {
    return "/" + [file lastPathComponent].split(".")[0] + ".out";
}

function parseFile(fileName, parser) {
    print("Matched Tokens:\n" + [parser parse:readFile(fileName)]);
}

function tokenizeFile(fileName, parser) {
    var tokensAndMatches = tokensForFile(fileName, parser);
    
    print("\nTokens:");
    for (var i = 0; i < tokensAndMatches.length; i++) {
        print(tokensAndMatches[i].token + ", " + tokensAndMatches[i].match);
    }
}

function tokensForFile(fileName, parser) {
    return [parser tokenize:readFile(fileName)];
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