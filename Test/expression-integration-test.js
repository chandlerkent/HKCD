var FileList = require("jake").FileList;
var TypeChecker = require("../lib/TypeChecker");
var Parser = require("../lib/parser").Parser;
var ASSERT = require("assert");

var files = [];
var expected = [];

// Early Samples
(new FileList("Test/Files/ExpressionTypeChecker/EarlySamples/*.java").items()).forEach(function(file) {
    files.push(file);
});
(new FileList("Test/Files/ExpressionTypeChecker/EarlySamples/*.out").items()).forEach(function(file) {
    var fileBytes = readFile(file);
    expected.push((fileBytes === "") ? fileBytes : fileBytes.split("\n"));
});

// Turn-In
(new FileList("Test/Files/ExpressionTypeChecker/Turn-In/*.java").items()).forEach(function(file) {
    files.push(file);
});
expected = expected.concat([
    "",
    [
        "Expected true to be int.",
        "The left side of an add operation was expected to be of type int but was boolean.",
        "An add expression does not return type boolean.",
        "The condition in a(n) If statement must be of type boolean.",
        "No variable named size in the current scope.",
        "Type of return expression does not match int.",        
    ],
    [
        "Expected true to be int.",
        "Type of return expression does not match int.",
    ],
    ""
]);

// Ours
(new FileList("Test/Files/ExpressionTypeChecker/Ours/*.java").items()).forEach(function(file) {
    files.push(file);
});
expected = expected.concat([
    [
        "An add expression does not return type boolean.",
        "The condition in a(n) If statement must be of type boolean.",
    ],
    [
        "Expected false to be int.",
        "System.out.println only takes an argument of type int.",
        "Expected variable b to be of type int, but was of type boolean.",
        "System.out.println only takes an argument of type int."
    ],
    [
        "The variable a is already declared in the current scope.",
        "The variable b is already declared in the current scope.",
        "The variable a is already declared in the current scope.",
        "The variable b is already declared in the current scope.",
        "The variable c is already declared in the current scope.",
        "The variable c is already declared in the current scope.",
        "The variable b is already declared in the current scope.",        
    ],
    [
        "Expected variable a to be of type boolean, but was of type int.",
        "The left side of an and operation was expected to be of type boolean but was int.",
        "Expected variable b to be of type boolean, but was of type int.",
        "The right side of an and operation was expected to be of type boolean but was int.",
        "The condition in a(n) If statement must be of type boolean.",
        "The variable a is not in the current scope.",
        "The variable c is not in the current scope.",
        "The variable d is not in the current scope.",
    ],
    [
        "Expected true to be int.",
        "The variable a was assigned with mismatched types.",
        "Expected an integer to be boolean.",
        "The variable e was assigned with mismatched types.",
    ],
    [
        "Expected an integer to be boolean.",
        "The type of the right hand side expression of the assignment to variable a does not match the expected type boolean.",
        "Expected an integer to be boolean.",
        "The type of the right hand side expression of the assignment to variable d does not match the expected type boolean.",
        "Expected true to be int.",
        "The type of the right hand side expression of the assignment to variable e does not match the expected type int."
    ]
]);

for (var i = 0; i < files.length; i++) {
    var fileParts = files[i].split("/");
    fileParts.shift();
    fileParts.shift();
    var fileNameThatMatters = fileParts.join("/");
    exports["testFile__/" + fileNameThatMatters] = buildTestFunctionForFile(files[i], expected[i]);
}

var parser = new Parser(readGrammarFromFile("src/grammar.json"));

function buildTestFunctionForFile(inFile, errors) {
    if (errors)
        errors = [].concat(errors);

    return function() {
        var ast = parser.parse(readFile(inFile));
        
        var env = TypeChecker.typeCheck(ast).env;
            
        var actualMessages = env.errors.map(function(err) {
            return err.message;
        });

        if (errors.length > 0) {
            var found = true;
            for (var i = 0; i < errors.length; i++) {
                if (actualMessages.indexOf(errors[i]) < 0) {
                    found = false;
                }
            }
        
            for (var i = 0; i < actualMessages.length; i++) {
                if (errors.indexOf(actualMessages[i]) < 0) {
                    found = false;
                }
            }
        
            ASSERT.equal(true, found, "Error message: <" + env.errors.join("\n") + ">\n\ndid not match\n\n<" + errors + ">");
        } else {
            ASSERT.equal(0, actualMessages.length, "Expected no errors but got " + env.errors.join("\n"));
        }
    };
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