var File = require("file");
var FileList = require("jake").FileList;
var Parser = require(File.absolute("lib/parser")).Parser;
var TypeChecker = require(File.absolute("lib/TypeChecker"));

// Options Parser
var optionsParser = new (require("args").Parser)();

optionsParser.usage("INPUT_FILE");
optionsParser.help("Performs lexical analysis on an input file using a grammar.");

optionsParser.option("-d", "debug")
    .def(false)
    .set(true)
    .help("Debug flag. Use this option to print debug messages.");

optionsParser.option("-g", "grammar")
    .def("lib/grammar.json")
    .set()
    .help("Specifies the grammar file (default lib/grammar.json).");

optionsParser.helpful();

DEBUG = function (debugString) {};

function main()
{
    var options = optionsParser.parse(require("system").args);
    
    if (options.args.length < 1)
    {
        optionsParser.printUsage(options);
        return;
    }
    
    if (options.debug) {
        DEBUG = function(debugString)
        {
            print(debugString);
        }
    }
    
    var parser = new Parser(readGrammarFromFile(options.grammar));
    if (File.isDirectory(options.args[0])) {
        processDirectory(options.args[0], function(file) {
            var ast = parseFile(file, parser);
            
            var result = TypeChecker.typeCheck(ast);
            
            return result.env.errors.join("\n");
        });
    } else {
        var ast = parseFile(readFile(options.args[0]), parser);
        
        var result = TypeChecker.typeCheck(ast);
        
        print("TypeChecked AST:");
        print(result.ast + "\n\nErrors:\n" + result.env.errors.join("\n"));
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
    return "/" + lastPathComponent(file).split(".")[0] + ".out";
}

function lastPathComponent(file) {
    var result = file.split('/');
    return result[result.length - 1];
}

function parseFile(file, parser) {
    var result = "";
    
    var ast = parser.parse(file);
    
    result += ast.toString();
    
    return ast;
}

function readGrammarFromFile(filePath) {
    try
    {
        return JSON.parse(readFile(filePath));
    }
    catch (e)
    {
        print("Error reading grammar file: " + filePath);
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
        print("Error reading file: " + filePath);
        require("os").exit(-1);
    }
}


if (require.main === module)
    require("os").exit(main());