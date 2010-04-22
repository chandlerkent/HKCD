// This is a test file for testing full-stack integration. We actually build ASTs for the unit testing portion
// of the project but we are required to submit functional test cases. Since we are writing them, we may as well
// leverage them. This is where they go.

var Parser = require("../lib/parser").Parser;
var Driver = require("../lib/driver").Driver;
var ClassDecl = require("../lib/ClassDecl");
var MethodOverload = require("../lib/MethodOverload");
// var MethodOverride = require("../lib/methodoverride");
var FieldDecl = require("../lib/FieldDecl");
var FieldShadow = require("../lib/FieldShadow");
var ASSERT = require("assert");
var FileList = require("jake").FileList;

exports.testThatDuplicateClassesGetTypeChecked = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_class_decls.java", "Multiple declarations found for class Foo.");
};

exports.testThatDuplicateMethodDeclarationsFails = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in the class Bar.");
};

exports.testThatOverridingSuperclassMethodDeclarationWithDifferentArgsOrTypeFails = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in the class Bar.");
};

exports.testThatLegalClassDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_class_decls.java");
};

exports.testThatLegalFieldDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_field_decls.java");
};

exports.testThatLegalMethodDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_method_decls.java");
};

exports.testThatDuplicateFieldDeclarationsFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_field_decls.java", "A field named x is defined more than once in Baz.");
};

exports.testThatTurnInFolderGoodsDontFail = function() {
    var files = new FileList("Test/Files/TypeChecker/Turn-In/good*.java").items();

    files.forEach(function(file) {
       compilingFileResultsInError(file); 
    });
}

exports.testThatTurnInFolderBadsFail = function() {
    var files = new FileList("Test/Files/TypeChecker/Turn-In/bad*.java").items();
    var expected = [
        "Multiple declarations found for class Foo.", 
        "Cannot extend the unknown superclass Baz.", 
        "The method size attempts to change the type from Rab:size:int to Baz:size:boolean", 
        "A field named x has already been defined in the superclass Bar.", 
        "A field named x has already been defined in this class.", 
        "A field named x has already been defined in the superclass Bar."
    ];
    
    files.forEach(function(file) {
       compilingFileResultsInError(file, expected[files.indexOf(file)]);
    });
}

exports.testThatEarlySamplesFail = function() {
    var files = new FileList("Test/Files/TypeChecker/EarlySamples/*.java").items();
    var expected = [
        "Multiple declarations found for class A.",
        "A field named c is initialized with an uninitialized type C.",
        "b",
        "c",
        "d",
        "e",
        "r",
        "g",
        "h",
    ];
    
    files.forEach(function(file) {
        compilingFileResultsInError(file, expected[files.indexOf(file)]);
    })
}

function compilingFileResultsInError(filename, error) {
    error = error || null;
    
    var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
    var ast = parser.parse(readFile(filename));
    
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var driver = new Driver([ClassDecl, MethodOverload, FieldDecl, FieldShadow]);
    
    driver.process(ast, env);

    if (error) {
        ASSERT.equal(true, (env.errors.indexOf(error) >= 0), "Error message: <" + env.errors.join("\n") + "> did not match <" + error + ">");
    } else {
        ASSERT.equal(0, env.errors.length);
    }
}

function readGrammarFromFile(filePath) {
    try
    {
        return JSON.parse(readFile(filePath));
    }
    catch (e)
    {
        print("Error reading grammar file: " + filePath);
    }
}

function readFile(fileName) {
    try
    {
        var filePath = require("file").absolute(fileName);
        return require("file").read(filePath);
    }
    catch (e)
    {
        require("os").exit(-1);
    }
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));