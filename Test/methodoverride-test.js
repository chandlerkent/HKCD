var ASSERT = require("test/assert");
var methodoverride = require("../lib/methodoverride");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = methodoverride.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatOverriddenMethodWithDifferentReturnTypeIsInvalid = function() {
    var ast = buildInvalidExtendsAST();
    ASSERT.throwsError(function() {methodoverride.process(ast)});
};

function buildInvalidExtendsAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'anotherBar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new ASTNode('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'anotherBaz'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'bar',})
        ], { 'class_decl': 'Baz', 'extension': 'Bar'})
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'test'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'anotherBaz'})
        ], { 'class_decl': 'Baz', 'extension': 'Bar'})
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));