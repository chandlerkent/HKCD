var ASSERT = require("test/assert");
var classtypes = require("../lib/classtypes");
var Node = require("../lib/ast").Node;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildAST();
    var otherAST = classtypes.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoClassWithSameNameAreInvalid = function() {
    var ast = buildInvalidAST();
    ASSERT.throwsError(function() {classtypes.process(ast)});
};

function buildInvalidAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ]),
        new Node("ClassDeclList", [
            new Node("ClassDecl", [
                "Foo",
                new Node("Extension"),
                new Node("ClassVarDeclList"),
                new Node("MethodDeclList")
            ])
        ])
    ]);
}

function buildAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ]),
        new Node("ClassDeclList")
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));