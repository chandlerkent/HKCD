var File = require("file");
var FileList = require("jake").FileList;
var Parser = require(File.absolute("lib/parser")).Parser;
var Driver = require(File.absolute("lib/driver")).Driver;
var ClassTypes = require(File.absolute("lib/classtypes"));
var FieldDecs = require(File.absolute("lib/fielddecs"));
var FieldShadow = require(File.absolute("lib/fieldshadow"));
var MethodOverload = require(File.absolute("lib/methodoverload"));
var MethodOverride = require(File.absolute("lib/methodoverride"));
var ParameterTypes = require(File.absolute("lib/parametertypes"));

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
            return parseFile(file, parser);
        });
    } else {
        var ast = parseFile(readFile(options.args[0]), parser);
        
        var env = require("./gathertypeinfo").process(ast).env;
        
        var driver = new Driver([ClassTypes, FieldDecs, FieldShadow, MethodOverload, MethodOverride, ParameterTypes]);
        
        var result = driver.process(ast, env);
        
        print("TypeChecked AST:");
        print(result.ast);
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
    
    if(ast.errors.length > 0) {
        print("Encountered error during parsing: " + ast.errors[0]);
    }
    
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