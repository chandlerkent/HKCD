var ASSERT = require("test/assert");
var classtypes = require("../lib/classtypes");
var Node = require("../lib/Node").Node;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = classtypes.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoClassWithSameNameAreInvalid = function() {
    var ast = buildSameClassesAST();

    ASSERT.throwsError(function() { classtypes.process(ast) });
};

exports.testThatExtendingAnUndefinedClassIsInvalid = function() {
    var ast = buildBadExtensionAST();
    
    ASSERT.throwsError(function() { classtypes.process(ast) });
};

function buildBadExtensionAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [], {"class_decl": "Foo"}),
        new Node("ClassDecl", [], {"class_decl": "Bar", "extension": "Baz"}),
    ]);
}

function buildSameClassesAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ], {"class_decl": "Foo"}),
        new Node("ClassDeclList", [
            new Node("ClassDecl", [
                "Foo",
                new Node("Extension"),
                new Node("ClassVarDeclList"),
                new Node("MethodDeclList")
            ], {"class_decl": "Foo"})
        ])
    ]);
}

function buildValidAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ], {"class_decl": "Foo"}),
        new Node("ClassDeclList", [
            new Node("ClassDecl", [
                "Bar",
                new Node("Extension"),
                new Node("ClassVarDeclList"),
                new Node("MethodDeclList")
            ], {"class_decl": "Bar"})
        ])
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));