var FileList = require("jake").FileList;
var File = require("file");

var readFile = exports.readFile = function(fileName) {
    try {
        var filePath = File.absolute(fileName);
        return File.read(filePath);
    } catch (e) {
        print("Error reading file: " + filePath);
        require("os").exit(-1);
    }
};

var readGrammarFile = exports.readGrammarFromFile = function(filePath) {
    try {
        return JSON.parse(exports.readFile(filePath));
    } catch (e) {
        print("Error reading grammar file: " + filePath);
        require("os").exit(-1);
    }
};

var processDirectory = exports.processDirectory = function(directory, processFunction) {
    print("Processing directory: " + directory);
    
    var outputDirectoryPath = outputPathForDirectory(directory);
    createDirectory(outputDirectoryPath);
    
    (new FileList(directory + "*.java").items()).forEach(function(file) {
        File.write(outputDirectoryPath + outputPathForFile(file), processFunction(readFile(file)));
    });
};

var createDirectory = exports.createDirectory = function(folder) {
    if (File.exists(folder))
        File.rmtree(folder);
    
    File.mkdir(folder);
};

var outputPathForDirectory = exports.outputPathForDirectory = function(dir) {
    return File.absolute(dir) + "Out";
};

var outputPathForFile = exports.outputPathForFile = function(file) {
    return "/" + lastPathComponent(file).split(".")[0] + ".out";
};

var lastPathComponent = exports.lastPathComponent = function(file) {
    var result = file.split('/');
    return result[result.length - 1];
};