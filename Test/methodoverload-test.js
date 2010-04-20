var ASSERT = require("test/assert");
var methodoverload = require("../lib/methodoverload");
var ASTNode = require("../lib/astnode").ASTNode;

exports.testThatValidASTReturnsSameAST = function() {
    var ast = buildValidAST();
    var otherAST = methodoverload.process(ast);
    
    ASSERT.eq(ast, otherAST);
};

exports.testThatTwoMethodsWithSameNameAreInvalid = function() {
    var ast = buildInvalidAST();
    ASSERT.throwsError(function() {methodoverload.process(ast)});
};

exports.testThatOverriddenMethodFromSuperclassMustHaveSameArgsAndType = function() {
    var ast = buildInvalidExtendsAST();
    ASSERT.throwsError(function() {methodoverload.process(ast)});
};

function buildInvalidExtendsAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'hasBar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new ASTNode('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'bar',})
        ], { 'class_decl': 'Baz', 'extension': 'Bar'})
    ]);
}

function buildInvalidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'bar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new ASTNode('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'})
        ], { 'class_decl': 'Baz', 'extension': null})
    ]);
}

function buildValidAST() {
    return new ASTNode('Program', [
        new ASTNode('MainClassDecl', [], { 'class_decl': 'Foo', 'param': 'args'}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [3], { 'return_type': 'int', 'method_name': 'bar'}),
            new ASTNode('MethodDecl', [false], { 'return_type': 'boolean', 'method_name': 'hasBar'})
        ], { 'class_decl': 'Bar', 'extension': null}),
        new ASTNode('ClassDecl', [
            new ASTNode('MethodDecl', [42], { 'return_type': 'int', 'method_name': 'baz'}),
            new ASTNode('MethodDecl', [true], { 'return_type': 'boolean', 'method_name': 'hasBaz'})
        ], { 'class_decl': 'Baz', 'extension': null})
    ]);
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));