var ASSERT = require("test/assert");
var methodoverload = require("../lib/methodoverload");
var Node = require("../lib/Node").Node;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildAST();
    var otherAST = methodoverload.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoMethodsWithSameNameAreInvalid = function() {
    var ast = buildInvalidAST();
    ASSERT.throwsError(function() {methodoverload.process(ast)});
};

function buildInvalidAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ], {"value": "Foo"}),
        new Node("ClassDeclList", [
            new Node("ClassDecl", [
                "Foo",
                new Node("Extension"),
                new Node("ClassVarDeclList"),
                buildInvalidMethodDeclList(),
            ], {"value": "Foo"})
        ])
    ]);
}

function buildInvalidMethodDeclList() {
    var result = new Node("MethodDeclList");
    
    result.addChild(new Node("MethodDecl", 
        ["test", new Node("FormalList"), new Node("StmtList"), new Node("Expr")], 
        { 'type' : "Foo" }));
    result.addChild(new Node("MethodDecl", 
        ["test", new Node("FormalList"), new Node("StmtList"), new Node("Expr")], 
        { 'type' : "int" }));
        
    return result;
}

function buildAST() {
    return new Node("Program", [
        new Node("MainClassDecl", [
            "Foo",
            "args",
            new Node("StmtList"),
        ], {"value": "Foo"}),
            new Node("ClassDeclList", [
                new Node("ClassDecl", [
                    "Foo",
                    new Node("Extension"),
                    new Node("ClassVarDeclList"),
                    buildValidMethodDeclList(),
                ], {"value": "Foo"})
            ])
    ]);
}

function buildValidMethodDeclList() {
    var result = new Node("MethodDeclList");

    result.addChild(new Node("MethodDecl", 
        ["test", new Node("FormalList"), new Node("StmtList"), new Node("Expr")], 
        { 'type' : "Foo" }));
    result.addChild(new Node("MethodDecl", 
        ["test2", new Node("FormalList"), new Node("StmtList"), new Node("Expr")], 
        { 'type' : "int" }));

    return result;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));