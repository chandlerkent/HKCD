// This is a nasty hack, but because of objj file-scoping its global vars., I don't think it can happen any other way.
ParsedProduction = [];

@import <Foundation/Foundation.j>
@import "Lexer.j"
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
        var lexer = [[Lexer alloc] initWithGrammar:readGrammarFromFile("lib/lexer_grammar.json")];
        if (File.isDirectory(options.args[0])) {
            processDirectory(options.args[0], function(file) {
                return [lexer tokenize:file];
            });
        } else {
            tokenizeFile(options.args[0], lexer);
        }
    } else {
        var parser = [[Parser alloc] initWithGrammar:readGrammarFromFile(options.grammar)];
        if (File.isDirectory(options.args[0])) {
            processDirectory(options.args[0], function(file) {
                return String([parser parse:file]);
            });
        } else {
            parseFile(options.args[0], parser);
        }
    }

    return;
}

function processDirectory(directory, processFunction) {
    print("Processing directory: " + directory);
    
    var outputDirectoryPath = outputPathForDirectory(directory);
    createDirectory(outputDirectoryPath);
    
    (new FileList(directory + "*.java").items()).forEach(function(file) {
        File.write(outputDirectoryPath + outputPathForFile(file), processFunction(readFile(file)));
    });
}

function createDirectory(folder) {
    if (File.exists(folder))
        File.rmtree(folder);
    
    File.mkdir(folder);
}

function outputPathForDirectory(dir) {
    return File.absolute(dir) + "Out";
}

function outputPathForFile(file) {
    return "/" + [file lastPathComponent].split(".")[0] + ".out";
}

function parseFile(fileName, parser) {
    var parsedProductions = [parser parse:readFile(fileName)];
    
    print("\nParsed Productions:");
    parsedProductions.map(function(parsedProduction) {
        print(parsedProduction);
    });
}

function tokenizeFile(fileName, parser) {
    var tokensAndMatches = tokensForFile(fileName, parser);
    
    print("\nTokens:");
    for (var i = 0; i < tokensAndMatches.length; i++) {
        print(tokensAndMatches[i].token + ", " + tokensAndMatches[i].match);
    }
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