// This is a test file for testing full-stack integration. We actually build ASTs for the unit testing portion
// of the project but we are required to submit functional test cases. Since we are writing them, we may as well
// leverage them. This is where they go.

var Parser = require("../lib/parser").Parser;
var Driver = require("../lib/driver").Driver;
var TypeChecker = require("../lib/TypeChecker");

var ASSERT = require("assert");
var FileList = require("jake").FileList;

exports.testThatDuplicateClassesGetTypeChecked = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/bad_class_decls.java", "Multiple declarations found for class Foo.");
};

exports.testThatDuplicateMethodDeclarationsFails = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in the class Bar.");
};

exports.testThatOverridingSuperclassMethodDeclarationWithDifferentArgsOrTypeFails = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in the class Bar.");
};

exports.testThatLegalClassDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/good_class_decls.java");
};

exports.testThatLegalFieldDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/good_field_decls.java");
};

exports.testThatLegalMethodDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/good_method_decls.java");
};

exports.testThatDuplicateFieldDeclarationsFail = function() {
    compilingFileResultsInError("Test/Files/DeclTypeChecker/Ours/bad_field_decls.java", "A field named x is defined more than once in Baz.");
};

exports.testThatTurnInFolderGoodsDontFail = function() {
    var files = new FileList("Test/Files/DeclTypeChecker/Turn-In/good*.java").items();

    files.forEach(function(file) {
       compilingFileResultsInError(file); 
    });
};

exports.testThatTurnInFolderBadsFail = function() {
    var files = new FileList("Test/Files/DeclTypeChecker/Turn-In/bad*.java").items();
    var expected = [
        ["Multiple declarations found for class Foo.", "Cannot extend the unknown superclass Bar."], 
        "Cannot extend the unknown superclass Baz.", 
        "The method {name: <size>, returnType: <boolean>, parameters: <[]>} in Baz attempts to override the method {name: <size>, returnType: <int>, parameters: <[]>} in Bar.", 
        "A field named x has already been defined in the superclass Bar.", 
        "A field named x is defined more than once in Bar.", 
        "A field named x has already been defined in the superclass Bar."
    ];
    
    files.forEach(function(file) {
       compilingFileResultsInError(file, expected[files.indexOf(file)]);
    });
};

exports.testThatEarlySamplesFail = function() {
    var files = new FileList("Test/Files/DeclTypeChecker/EarlySamples/*.java").items();
    var expected = [
        "Multiple declarations found for class A.",
        "A field named c is initialized with an uninitialized type C.",
        "The parameter c is initialized with undefined type C.",
        "The method {name: <start>, returnType: <boolean>, parameters: <[]>} in B attempts to override the method {name: <start>, returnType: <int>, parameters: <[]>} in C.",
        "A field named a has already been defined in the superclass noPoint.",
        "A method named setB has already been defined in the class noPoint2.",
        "A field named a is defined more than once in noPoint.",
        "Cannot extend the unknown superclass Foo1.",
        "Cannot extend the unknown superclass Foo.",
    ];
    
    files.forEach(function(file) {
        compilingFileResultsInError(file, expected[files.indexOf(file)]);
    });
};

exports.testThatFullTestCasesGiveExpectedOutput = function() {
    var files = new FileList("Test/Files/DeclTypeChecker/FullTestCases/FullTests/*.java").items();
    var expected = [
        "Multiple declarations found for class A.",
        "A field named c is initialized with an uninitialized type C.",
        "The parameter c is initialized with undefined type C.",
        "The method {name: <start>, returnType: <boolean>, parameters: <[]>} in B attempts to override the method {name: <start>, returnType: <int>, parameters: <[]>} in C.",
        "",
        "",
        "A method named start has already been defined in the class B.",
        "A field named a has already been defined in the superclass noPoint.",
        "A method named setB has already been defined in the class noPoint2.",
        "A field named a is defined more than once in noPoint.",
        [
            "A method named equal has already been defined in the class otherFoo.",
            "The method {name: <equal>, returnType: <boolean>, parameters: <[{name: <x>, type: <int>}]>} in thisFoo attempts to override the method {name: <equal>, returnType: <boolean>, parameters: <[{name: <x>, type: <int>}, {name: <y>, type: <int>}, {name: <z>, type: <int>}]>} in otherFoo.",
        ],
        [
            "The method {name: <bad>, returnType: <bool>, parameters: <[]>} in badBar attempts to override the method {name: <bad>, returnType: <int>, parameters: <[]>} in otherBar.",
            "The return type bool of method named bad is undefined.",
        ],
        "Multiple declarations found for class start.",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Cannot extend the unknown superclass Foo1.",
        "The parameter Foo is declared more than once in Baz.",
        [
            "Cannot extend the unknown superclass Foo.",
            "Cannot extend the unknown superclass Foo.",
        ],
        "",
        "",
        "A field named x has already been defined in the superclass Bar.",
        "A field named x is initialized with an uninitialized type Baz.",
        "A method named self has already been defined in the class Bar.",
        "Cannot extend the unknown superclass Bar.",
        "The method {name: <self>, returnType: <Bar>, parameters: <[{name: <a>, type: <int>}]>} in Baz attempts to override the method {name: <self>, returnType: <Bar>, parameters: <[]>} in Bar.",
        [
            "Cannot extend the unknown superclass Bar.",
            "A method named self has already been defined in the class Baz.",
            "The return type Nonexistant of method named self2 is undefined.",
            "A field named x has already been defined in the superclass Bar.",
            "The method {name: <self>, returnType: <Bar>, parameters: <[{name: <a>, type: <int>}]>} in Baz attempts to override the method {name: <self>, returnType: <Bar>, parameters: <[]>} in Bar.",
        ],
        "A field named x is defined more than once in foo2.",
        "A field named x has already been defined in the superclass Foo2.",
        "Cannot extend the unknown superclass Foo3.",
        "",
        "A method named Foo2 has already been defined in the class Bar.",
        "",
        "",
        "",
        "",
        "",
        [
            "A field named x has already been defined in the superclass Test3a.",
            "A field named b has already been defined in the superclass Test3b.",
        ],
        "A field named x is defined more than once in Test4a.",
        "Cannot extend the unknown superclass Test5c.",
        "Multiple declarations found for class Test6b.",
        "Cannot extend the unknown superclass MissingClass.",
        [
            "The method {name: <test>, returnType: <int>, parameters: <[{name: <a>, type: <int>}, {name: <b>, type: <int>}, {name: <c>, type: <int>}]>} in Test8b attempts to override the method {name: <test>, returnType: <int>, parameters: <[{name: <a>, type: <int>}, {name: <b>, type: <int>}]>} in Test8a.",
            "The method {name: <test>, returnType: <boolean>, parameters: <[{name: <a>, type: <int>}, {name: <b>, type: <int>}]>} in Test8c attempts to override the method {name: <test>, returnType: <int>, parameters: <[{name: <a>, type: <int>}, {name: <b>, type: <int>}]>} in Test8a."
        ],
        "Multiple declarations found for class a.",
        [
            "The method {name: <getNum>, returnType: <boolean>, parameters: <[]>} in d attempts to override the method {name: <getNum>, returnType: <int>, parameters: <[]>} in c.",
            "The method {name: <getNum>, returnType: <boolean>, parameters: <[]>} in d attempts to override the method {name: <getNum>, returnType: <int>, parameters: <[]>} in b."
        ],
        "",
        "",
        "A field named soboring is initialized with an uninitialized type bool.",
        "The method {name: <tni>, returnType: <int>, parameters: <[{name: <cilbup>, type: <int>}]>} in um attempts to override the method {name: <tni>, returnType: <ssalc>, parameters: <[{name: <cilbup>, type: <int>}]>} in ssalc.",
        "Multiple declarations found for class foo.",
        [
            "There was a cycle detected.",
            "Cannot extend the unknown superclass baz."
        ],
        [
            "Cannot extend the unknown superclass baz.",
            "The method {name: <test>, returnType: <boolean>, parameters: <[]>} in bar attempts to override the method {name: <test>, returnType: <int>, parameters: <[]>} in baz."
        ],
        "",
        "A field named test is defined more than once in baz.",
        "",
        "",
        "",
        "",
        "",
        "A field named isOrange has already been defined in the superclass BallClass.",
        "Cannot extend the unknown superclass bird.",
        "The method {name: <returnsFive>, returnType: <boolean>, parameters: <[]>} in OneMethodDos attempts to override the method {name: <returnsFive>, returnType: <int>, parameters: <[]>} in OneMethod.",
        "Multiple declarations found for class KnightsWhoSayNi.",
        "A field named number is defined more than once in SecondClass.",
        "A method named dupe has already been defined in the class crazy.",
        "",
        "Multiple declarations found for class sample2.",
        "Cannot extend the unknown superclass mobily.",
        "Cannot extend the unknown superclass mobily.",
        [
            "The method {name: <setsms>, returnType: <int>, parameters: <[{name: <x>, type: <boolean>}]>} in zain attempts to override the method {name: <setsms>, returnType: <int>, parameters: <[{name: <x>, type: <int>}]>} in stc.",
            "The method {name: <setDSL>, returnType: <int>, parameters: <[{name: <x>, type: <boolean>}]>} in zain attempts to override the method {name: <setDSL>, returnType: <int>, parameters: <[{name: <x>, type: <int>}]>} in stc."
        ],
        [
            "The method {name: <setsms>, returnType: <int>, parameters: <[{name: <x>, type: <boolean>}]>} in mobily attempts to override the method {name: <setsms>, returnType: <int>, parameters: <[{name: <x>, type: <int>}]>} in stc.",
            "The method {name: <setDSL>, returnType: <int>, parameters: <[{name: <x>, type: <boolean>}]>} in mobily attempts to override the method {name: <setDSL>, returnType: <int>, parameters: <[{name: <x>, type: <int>}]>} in stc.",
            "A field named z is initialized with an uninitialized type Zain."
        ],
        "A field named DSL has already been defined in the superclass mobily.",
        "A method named getDSL has already been defined in the class mobily.",
        "",
        "A method named myMethod has already been defined in the class AnotherClass.",
        "",
        [
            "A field named a is defined more than once in SomeClass.",
            "A field named a is initialized with an uninitialized type Type."
        ],
        "Multiple declarations found for class MyClass.",
        [
            "A method named myMethod has already been defined in the class SomeClass.",
            "A method named myMethod has already been defined in the class SomeOtherClass.",
            "The method {name: <myMethod>, returnType: <boolean>, parameters: <[{name: <b>, type: <int>}]>} in SomeOtherClass attempts to override the method {name: <myMethod>, returnType: <int>, parameters: <[{name: <a>, type: <int>}]>} in SomeClass.",
        ],
        "A method named myMethod has already been defined in the class SomeClass.",
        [
            "A method named myMethod has already been defined in the class SomeClass.",
            "The method {name: <myMethod>, returnType: <boolean>, parameters: <[{name: <a>, type: <int>}]>} in AClass attempts to override the method {name: <myMethod>, returnType: <boolean>, parameters: <[{name: <b>, type: <boolean>}]>} in SomeClass."
        ],
        "The method {name: <estimateNumberOfZombies>, returnType: <int>, parameters: <[{name: <limbs>, type: <int>}, {name: <heads>, type: <int>}]>} in Cred attempts to override the method {name: <estimateNumberOfZombies>, returnType: <int>, parameters: <[{name: <limbs>, type: <int>}]>} in Ed.",
        "Cannot extend the unknown superclass Ced.",
        "A field named shells has already been defined in the superclass Ed.",
        [
            "Cannot extend the unknown superclass Zed.",
            "Cannot extend the unknown superclass Ced."
        ],
        "The return type Joe of method named estimateNumberOfZombies is undefined.",
        "Cannot extend the unknown superclass Object.",
        "",
        "",
        "A method named doCoke has already been defined in the class TryDrugs.",
        "The method {name: <program>, returnType: <Definition>, parameters: <[]>} in VerbDefinition attempts to override the method {name: <program>, returnType: <int>, parameters: <[]>} in Definition.",
        "A field named lethal is defined more than once in YourPrescription.",
        "The method {name: <attachedToTheEars>, returnType: <int>, parameters: <[]>} in CourtroomDog attempts to override the method {name: <attachedToTheEars>, returnType: <boolean>, parameters: <[]>} in WhereWasTheDog.",
        "Multiple declarations found for class StatueOfLiberty.",
        "The method {name: <doRubiksCube>, returnType: <int>, parameters: <[]>} in StevieWonder attempts to override the method {name: <doRubiksCube>, returnType: <boolean>, parameters: <[]>} in Dude.",
        "",
        "",
        "",
        "Multiple declarations found for class Test7a.",
        ""
    ];
    
    files.forEach(function(file) {
        compilingFileResultsInError(file, expected[files.indexOf(file)]);
    });
};

function compilingFileResultsInError(filename, error) {
    if (error)
        error = [].concat(error);
    
    var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
    var ast = parser.parse(readFile(filename));
    
    var env = TypeChecker.typeCheck(ast).env;
    
    var actualMessages = env.errors.map(function(err) {
        return err.message;
    });

    if (error) {
        var found = true;
        for (var i = 0; i < error.length; i++) {
            if (actualMessages.indexOf(error[i]) < 0) {
                found = false;
            }
        }
        
        for (var i = 0; i < actualMessages.length; i++) {
            if (error.indexOf(actualMessages[i]) < 0) {
                found = false;
            }
        }

        ASSERT.equal(true, found, "Error message: <" + env.errors.join("\n") + ">\n\ndid not match\n\n<" + error + ">");
    } else {
        ASSERT.equal(0, actualMessages.length);
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